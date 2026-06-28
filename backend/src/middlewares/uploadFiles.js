import multer from "multer";

/**
Define storage using multer.diskStorage
Set the destination to the desired location.
Set the filename function to create unique filenames
I guess we need to store this in db as well????
previously it was in diskstorage but since we are storing it in postgres, we use memorystorage
so it keeps the file as a buffer in memory
CROP IMAGE or give warning about file size.
 */
const storage = multer.memoryStorage();

const upload = multer({
	storage,
	fileFilter: (req, file, cb) =>
	{
		if (file.mimetype === 'image/jpeg') {
			cb (null, true);
		}
		else
		{
			cb(new Error('Only JPG images are allowed'), false);
		}
	}	
})

export {upload};
