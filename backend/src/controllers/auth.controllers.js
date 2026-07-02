import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, password } = req.validBody;
  // Check if user already exists
  const userExists = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { name }],
    },
  });
  if (userExists) {
    return res
      .status(400)
      .json({ error: "Registration failed, user already exists" });
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

  // Generate JWT token
  const token = generateToken(user.id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.validBody;

  // Check if user email exists in the table
  const user = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // OAuth user trying to use password login
  if (!user.password) {
    return res.status(401).json({ error: "This account uses Google sign-in" });
  }

  // Verify the password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Generate JWT token
  const token = generateToken(user.id, res);

  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: user.name,
        email: email,
      },
      token,
    },
  });
};

const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

const googleCallback = (res, user) => {
  generateToken(user.id, res);
  const destination = user._isNew
    ? "/oauth/username-picker"
    : "/oauth/callback";
  res.redirect(
    `${process.env.FRONTEND_URL ?? "http://localhost:5173"}${destination}`,
  );
};

const getMe = (req, res) => {
  res.status(200).json({ status: "success", data: { user: req.user } });
};

const updateUsername = async (req, res) => {
  const { name } = req.validBody;
  const taken = await prisma.user.findFirst({
    where: { name, NOT: { id: req.user.id } },
  });
  if (taken) return res.status(400).json({ error: "Username already taken" });
  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { name },
    select: { id: true, name: true, email: true },
  });
  res.status(200).json({ status: "success", data: { user } });
};

export { register, login, logout, googleCallback, getMe, updateUsername };
