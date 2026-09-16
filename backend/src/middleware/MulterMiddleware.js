import multer from "multer";
import Storage from "../config/multer.js";

const upload = multer({
  storage: Storage,
});

export default upload;
