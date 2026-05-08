import {prisma} from "../config/db.js";

const meUser = async (req, res) => {
	req.user = {
		name: req.user.name,
	};
	res.status(200).json(req.user);
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

export {meUser, deleteUser};