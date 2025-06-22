const express= require("express");
const {addItems, getItems}=require("../controllers/itemController");
const router= express.Router();
const upload = require('../middleware/multer');

router.get("/get",getItems);
router.post("/add",upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'additionalImages', maxCount: 5 },
]),addItems)

module.exports=router;