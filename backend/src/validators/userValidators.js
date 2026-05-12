import {z} from "zod";

const registerToUserSchema = z.object({
	name: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(20, "Username must be max 20 characters")
		.regex(/^[A-Za-z0-9_-]+$/, "Only letters, numbers, _ and -")
		.refine((value) => !/^[_-]/.test(value), {
			message: "Username cannot start with _ or -",
		})
		.refine((value) => !/[_-]$/.test(value), {
			message: "Username cannot end with _ or -",
		}),
	email: z
		.string()
		.email("Please enter a valid email"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Must include uppercase letter")
		.regex(/[a-z]/, "Must include lowercase letter")
		.regex(/[0-9]/, "Must include a number")
		.regex(/^\S+$/, "Password cannot contain spaces"),
})

const loginUserSchema = z.object({
	email: z
		.string()
		.email("Please enter a valid email"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(/[A-Z]/, "Must include uppercase letter")
		.regex(/[a-z]/, "Must include lowercase letter")
		.regex(/[0-9]/, "Must include a number")
		.regex(/^\S+$/, "Password cannot contain spaces")
})

export {registerToUserSchema, loginUserSchema};
