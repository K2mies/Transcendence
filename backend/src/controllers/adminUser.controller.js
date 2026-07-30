import * as adminUserService from "../services/adminUser.service.js";

export const listUsers = async (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search : "";

  try {
    const users = await adminUserService.listUsers(search);
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const getUserById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const user = await adminUserService.getUserById(id);
    res.status(200).json({ status: "success", data: user });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const updatedUser = await adminUserService.updateUser(id, req.body);
    res.status(200).json({ status: "success", data: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const deleteUserById = async (req, res) => {
  const id = Number(req.params.id);

  try {
    await adminUserService.deleteUserById(id, req.user.id);
    res
      .status(200)
      .json({ status: "success", message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export const updateUserRole = async (req, res) => {
  const id = Number(req.params.id);
  const { role } = req.body;

  try {
    const updatedUser = await adminUserService.updateUserRole(
      id,
      req.user.id,
      role,
    );
    res.status(200).json({ status: "success", data: updatedUser });
  } catch (error) {
    console.error(error);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
