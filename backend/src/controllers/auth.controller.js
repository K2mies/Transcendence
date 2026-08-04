import * as authService from "../services/auth.service.js";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  const { name, email, password } = req.validBody;

  try {
    const user = await authService.register(name, email, password);

    // Generate JWT token
    const token = generateToken(user.id, res);

    res.status(201).json({
      status: "success",
      data: {
        user: {
          id: user.id,
          name: user.name,
        },
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.validBody;

  try {
    const user = await authService.login(email, password);

    // Generate JWT token
    const token = generateToken(user.id, res);

    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
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
  const id = req.user.id;

  try {
    const user = authService.updateUsername(name, id);
    res.status(200).json({ status: "success", data: { user } });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export { register, login, logout, googleCallback, getMe, updateUsername };
