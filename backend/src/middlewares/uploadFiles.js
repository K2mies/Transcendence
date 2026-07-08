import multer from "multer";

/**
We use memory storage as we will save it now into buffer and then update it to the database.
We check the filetype as we only allow jpeg and PNG.
After this, the file then proceeds to the controller!
cb (callback) is a function used to whether accept or reject the file.
 */
const storage = multer.memoryStorage();

const upload = multer({
	storage,
	fileFilter: (req, file, cb) =>
	{
		if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
			cb (null, true);
		}
	}
	// 	else
	// 	{
	// 		cb(new Error('Only JPG or PNG images are allowed'), false);
	// 	}
	// }
})

export {upload};