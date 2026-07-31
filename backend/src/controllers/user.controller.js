import * as userService from "../services/user.service.js";

const meUser = async (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

const deleteUser = async (req, res) => {
  const userId = req.user.id;

  try {
    await userService.deleteUser(userId);
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

const myFriends = async (req, res) => {
  const me = req.user.id;

  try {
    const friends = await userService.myFriends(me);
    res.status(200).json(friends);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

const allUsers = async (req, res) => {
  const search = typeof req.query.search === "string" ? req.query.search : "";

  try {
    const users = await userService.allUsers(search);
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

export { meUser, deleteUser, myFriends, allUsers };
