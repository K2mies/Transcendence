import {prisma} from "../config/db.js";

const meUser = async (req, res) => {
	res.status(200).json({
		user: req.user},
	);
}

const deleteUser = async (req, res) => {
	await prisma.user.delete({
		where: {
			id: req.user.id,
		},
	});

	res.cookie("jwt", "", {
		httpOnly: true,
		expires: new Date(0),
	});

	res.status(200).json({
		status: "success",
		message: "User deleted successfully",
	});
}

const myFriends = async (req, res) => {
	const me = req.user.id;

	const relations = await prisma.userUserRelation.findMany({
		where: {
			friendStatus: "FRIENDS",
			OR: [{ senderId: me }, { receiverId: me }],
		},
		include: {
			sender: {
				select: {
					id: true,
					name: true,
				},
			},
			receiver: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});

	const friends = relations.map(relation =>
		relation.senderId === me ? relation.receiver : relation.sender
	);

	res.json(friends);
};


export {meUser, deleteUser, myFriends};