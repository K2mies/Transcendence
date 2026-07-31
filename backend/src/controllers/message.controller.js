import * as messageService from "../services/message.service.js";

const getMessages = async (req, res) => {
  const me = req.user.id;
  const other = Number(req.params.userId);

  try {
    const messages = await messageService.getMessages(me, other);
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

const getConversations = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const userId = req.user.id;

  try {
    const conversations = await messageService.getConversations(userId);
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

const postRead = async (req, res) => {
  const me = req.user.id;
  const otherUserId = Number(req.params.userId);

  try {
    await messageService.postRead(me, otherUserId);
    res.status(200).json({ status: "success", message: "Messages marked as read successfully" });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  }
};

export { getMessages, getConversations, postRead };
