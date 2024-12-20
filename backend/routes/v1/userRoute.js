const express = require("express");
const asyncHandler = require("../../utils/asyncHandler.js");
const { insertHeaderTable, insertDetailTable, createItem, getHeaderTable, getDetailTable, getAllItems } = require("../../controllers/userController.js");
const { validateHeaderTable, validateDetailTable, validateItemMaster } = require("../../middlewares/authUser.js");

const router = express.Router();

router.get("/header_table", asyncHandler(getHeaderTable));
router.get("/detail_table", asyncHandler(getDetailTable));
router.get("/item_master", asyncHandler(getAllItems));
router.post("/header_table", asyncHandler(validateHeaderTable), asyncHandler(insertHeaderTable));
router.post("/detail_table", asyncHandler(validateDetailTable), asyncHandler(insertDetailTable));
router.post("/item_master", asyncHandler(validateItemMaster), asyncHandler(createItem));


module.exports = router;
