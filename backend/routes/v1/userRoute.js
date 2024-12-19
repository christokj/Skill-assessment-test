const express = require("express");
const asyncHandler = require("../../utils/asyncHandler.js");
const { headerTableSchema } = require("../../validations/joiValidation.js");
// const { authUser } = require("../../middlewares/authUser.js");

const router = express.Router();

router.get("/header_table", asyncHandler(), asyncHandler());
router.get("/detail_table", asyncHandler(), asyncHandler());
router.get("/item_master", asyncHandler(), asyncHandler());
router.post("/header_table", asyncHandler(headerTableSchema), asyncHandler());
router.post("/detail_table", asyncHandler(), asyncHandler());


module.exports = router;
