import { prisma } from "../config/db.js";

const canActOnTarget = (targetRole) => targetRole !== "SUPERUSER";
const ASSIGNABLE_ROLES = ["ADMIN", "USER"];

export async function listUsers(search) {
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

  return users;
}

export async function getUserById(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
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
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  return user;
}

export async function updateUser(userId, newBody) {
  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!target) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (!canActOnTarget(target.role)) {
    const error = new Error("Superuser accounts cannot be modified through the admin panel");
    error.status = 403;
    throw error;
  }

  const { name, email, bio } = newBody;

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { name, email, bio },
    select: { id: true, name: true, email: true, bio: true, role: true },
  });

  return updatedUser;
}

export async function deleteUserById(userId, ownUserId) {
  if (userId === ownUserId) {
    const error = new Error("You cannot delete your own account");
    error.status = 403;
    throw error;
  }

  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!target) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (!canActOnTarget(target.role)) {
    const error = new Error("Superuser accounts cannot be deleted through the admin panel");
    error.status = 403;
    throw error;
  }

  await prisma.user.delete({ where: { id: userId } });
}

export async function updateUserRole(userId, ownUserId, userRole) {
  if (userId === ownUserId) {
    const error = new Error("You cannot change your own role");
    error.status = 403;
    throw error;
  }

  if (!ASSIGNABLE_ROLES.includes(userRole)) {
    const error = new Error(`Role must be one of: ${ASSIGNABLE_ROLES.join(", ")}`);
    error.status = 400;
    throw error;
  }

  const target = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });

  if (!target) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }

  if (!canActOnTarget(target.role)) {
    const error = new Error("Superuser accounts cannot be modified through the admin panel");
    error.status = 403;
    throw error;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { role: userRole },
    select: { id: true, name: true, email: true, role: true },
  });

  return updatedUser;
}
