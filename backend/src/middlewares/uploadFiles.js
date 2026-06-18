import multer from "multer";

/**
Define storage using multer.diskStorage
Set the destination to the desired location.
Set the filename function to create unique filenames
I guess we need to store this in db as well????
 */
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads') //i guess we need to define where this really goes, are we saving it in uploads folder..
	},
	filename: function (req, file, cb) {
		cb(null, file.fieldname + '-' + Date.now())
	}
});

const upload = multer({ storage })

export {upload};
