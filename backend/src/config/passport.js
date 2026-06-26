import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { OAuthProvider } from "@prisma/client";
import { prisma } from "./db.js";

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_CALLBACK_URL) {
	throw new Error(
		"Missing Google OAuth env vars: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL"
	);
}

// Generates a temporary unique username — will be replaced by the username picker
const generateUsername = async (displayName, email) => {
	const raw = displayName
		? displayName.toLowerCase().replace(/[^a-z0-9]/g, "_")
		: email.split("@")[0].toLowerCase().replace(/[^a-z0-9]/g, "_");

	// Strip leading/trailing underscores, cap at 17 chars (leaves room for _99 suffix → max 20)
	const cleaned = raw.replace(/^[_-]+|[_-]+$/g, "").slice(0, 17);
	const base = cleaned.length >= 3 ? cleaned : "user";

	const existing = await prisma.user.findUnique({ where: { name: base } });
	if (!existing) return base;

	let counter = 1;
	while (true) {
		const candidate = `${base}_${counter}`;
		const taken = await prisma.user.findUnique({ where: { name: candidate } });
		if (!taken) return candidate;
		counter++;
	}
};

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK_URL,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				const providerUserId = profile.id;
				const email = profile.emails?.[0]?.value;

				if (!email) {
					return done(null, false, { message: "No email returned from Google." });
				}

				// Case 1 — returning user: OAuthAccount already exists
				const existingAccount = await prisma.oAuthAccount.findUnique({
					where: {
						provider_providerUserId: {
							provider: OAuthProvider.GOOGLE,
							providerUserId,
						},
					},
					include: { user: true },
				});

				if (existingAccount) {
					return done(null, existingAccount.user);
				}

				// Case 2 — email match found: User exists but signed up with password earlier
				const existingUser = await prisma.user.findUnique({
					where: { email },
				});

				if (existingUser) {
					return done(null, false, {
						message: "An account with this email already exists. Sign in with your password.",
					});
				}

				// Case 3 — new user: create User + OAuthAccount in one transaction
				const username = await generateUsername(profile.displayName, email);

				const newUser = await prisma.$transaction(async (tx) => {
					const user = await tx.user.create({
						data: {
							name: username,
							email,
						},
					});

					await tx.oAuthAccount.create({
						data: {
							userId: user.id,
							provider: OAuthProvider.GOOGLE,
							providerUserId,
						},
					});

					return user;
				});

				newUser._isNew = true;
				return done(null, newUser);
			} catch (error) {
				return done(error);
			}
		}
	)
);

// Required by passport when sessions are enabled
// serializeUser: what to store in the session (just the user id)
passport.serializeUser((user, done) => {
	done(null, user.id);
});

// deserializeUser: how to retrieve the user from the session id
passport.deserializeUser(async (id, done) => {
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		done(null, user);
	} catch (error) {
		done(error);
	}
});

export default passport;
