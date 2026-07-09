import multer from "multer";

/*
Multer parses the incoming request, stores it into memory storage and attaches into the req.file.buffer
so we can access it in the controller function.
 */
const storage = multer.memoryStorage();

const upload = multer({
	storage,
})

export {upload};