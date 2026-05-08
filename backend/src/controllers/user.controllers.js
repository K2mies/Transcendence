import {prisma} from "../config/db.js";

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

export {deleteUser};