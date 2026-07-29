import { prisma } from "../config/db.js";

const canActOnTarget = (actorRole, targetRole) =>
	!(actorRole === "ADMIN" && targetRole === "SUPERUSER");

const ASSIGNABLE_ROLES = ["ADMIN", "USER"];

export const listUsers = async (req, res) => {
	const search = typeof req.query.search === "string" ? req.query.search : "";

	const users = await prisma.user.findMany({
		where: {
			name: { contains: search, mode: "insensitive" },
		},
		select: {
			id: true,
			name: true,
			email: true,
			role: true,
			createdAt: true,
		},
		orderBy: { createdAt: "asc" },
	});

	res.status(200).json({ status: "success", data: users });
};

export const getUserById = async (req, res) => {
	const id = Number(req.params.id);

	const user = await prisma.user.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
			email: true,
			bio: true,
			role: true,
			createdAt: true,
		},
	});

	if (!user) {
		return res.status(404).json({ error: "User not found" });
	}

	res.status(200).json({ status: "success", data: user });
};

export const updateUser = async (req, res) => {
	const id = Number(req.params.id);

	const target = await prisma.user.findUnique({
		where: { id },
		select: { role: true },
	});

	if (!target) {
		return res.status(404).json({ error: "User not found" });
	}

	if (!canActOnTarget(req.user.role, target.role)) {
		return res.status(403).json({ error: "Admins cannot modify superuser accounts" });
	}

	const { name, email, bio } = req.body;

	try {
		const updatedUser = await prisma.user.update({
			where: { id },
			data: { name, email, bio },
			select: { id: true, name: true, email: true, bio: true, role: true },
		});

		res.status(200).json({ status: "success", data: updatedUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to update user" });
	}
};

export const deleteUserById = async (req, res) => {
	const id = Number(req.params.id);

	if (id === req.user.id) {
		return res.status(403).json({ error: "You cannot delete your own account" });
	}

	const target = await prisma.user.findUnique({
		where: { id },
		select: { role: true },
	});

	if (!target) {
		return res.status(404).json({ error: "User not found" });
	}

	if (!canActOnTarget(req.user.role, target.role)) {
		return res.status(403).json({ error: "Admins cannot delete superuser accounts" });
	}

	try {
		await prisma.user.delete({ where: { id } });
		res.status(200).json({ status: "success", message: "User deleted successfully" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to delete user" });
	}
};

export const updateUserRole = async (req, res) => {
	const id = Number(req.params.id);
	const { role } = req.body;

	if (id === req.user.id) {
		return res.status(403).json({ error: "You cannot change your own role" });
	}

	if (!ASSIGNABLE_ROLES.includes(role)) {
		return res.status(400).json({ error: `Role must be one of: ${ASSIGNABLE_ROLES.join(", ")}` });
	}

	const target = await prisma.user.findUnique({
		where: { id },
		select: { role: true },
	});

	if (!target) {
		return res.status(404).json({ error: "User not found" });
	}

	try {
		const updatedUser = await prisma.user.update({
			where: { id },
			data: { role },
			select: { id: true, name: true, email: true, role: true },
		});

		res.status(200).json({ status: "success", data: updatedUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to update user role" });
	}
};
