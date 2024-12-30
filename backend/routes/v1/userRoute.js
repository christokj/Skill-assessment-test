const express = require("express");
const asyncHandler = require("../../utils/asyncHandler.js");
const { getHeaderTable, getDetailTable, getAllItems, saveAllData } = require("../../controllers/userController.js");
const { validateAllTables } = require("../../middlewares/authUser.js");

const router = express.Router();

router.get("/header_table", asyncHandler(getHeaderTable));
router.get("/detail_table", asyncHandler(getDetailTable));
router.get("/item_master", asyncHandler(getAllItems));
router.post("/all_data", asyncHandler(validateAllTables), asyncHandler(saveAllData));



module.exports = router;
