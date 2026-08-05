import { prisma } from "../config/db.js";
import { sendUsernameUpdate } from "../utils/websocket.js";
import bcrypt from "bcryptjs";

export async function register(name, email, password) {
  // Check if user already exists
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { name }],
    },
  });
  if (userExists) {
    const error = new Error("Registration failed, user already exists");
    error.status = 400;
    throw error;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}

export async function login(email, password) {
  // Check if user email exists in the table
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  // OAuth user trying to use password login
  if (!user.password) {
    const error = new Error("This account uses Google sign-in");
    error.status = 401;
    throw error;
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.status = 401;
    throw error;
  }

  return user;
}

export async function updateUsername(name, userId) {
  const taken = await prisma.user.findFirst({
    where: { name, NOT: { id: userId } },
  });

  if (taken) {
    const error = new Error("Username already taken");
    error.status = 409;
    throw error;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { name },
    select: { id: true, name: true, email: true },
  });

  await sendUsernameUpdate(user.id, user.name);

  return user;
}
