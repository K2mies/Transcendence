import * as messageService from "../services/message.service.js";

const getMessages = async (req, res) => {
  try {
    const me = req.user.id;
    const other = Number(req.params.userId);

    if (!Number.isInteger(other) || other <= 0) {
      return res.status(400).json({ error: "Invalid userId" });
    }

    const friendship = await messageService.checkFriendship(me, other);

    if (!friendship) {
      return res.status(403).json({
        error: "You are not friends with this user",
      });
    }

    const messages = await messageService.getMessages(me, other);
    res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const getConversations = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;

    // 1. Get FRIENDS ONLY
    const relations = await messageService.getFriends(userId);

    // 2. Build friend set (FAST lookup)
    const friendIds = new Set(
      relations.map((r) => (r.senderId === userId ? r.receiverId : r.senderId)),
    );

    // 3. Get all messages involving user
    const messages = await messageService.getUserMessages(userId);

    const map = new Map();

    for (const msg of messages) {
      const otherUser = msg.senderId === userId ? msg.receiver : msg.sender;

      if (!map.has(otherUser.id)) {
        map.set(otherUser.id, {
          userId: otherUser.id,
          name: otherUser.name,
          lastMessage: msg.content,
          lastMessageAt: msg.createdAt,
          unreadCount: 0,
          canChat: friendIds.has(otherUser.id),
        });
      }

      // unread logic (only incoming messages)
      if (msg.receiverId === userId && msg.read === false) {
        map.get(otherUser.id).unreadCount += 1;
      }
    }

    return res.json(Array.from(map.values()));
  } catch (err) {
    console.error(err);
    return res.status(500).json({
        error: "Internal server error",
    });
  }
};

const postRead = async (req, res) => {
  const me = req.user.id;
  const otherUserId = Number(req.params.userId);

  try {
    const me = req.user.id;
    const otherUserId = Number(req.params.userId);

    if (!Number.isInteger(otherUserId) || otherUserId <= 0) {
      return res.status(400).json({ error: `Invalid userId` });
    }

    await messageService.markRead(otherUserId, me);

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: `Internal server error [${err}]` });
  }
};

export { getMessages, getConversations, postRead };
