const express = require("express");
const asyncHandler = require("../../utils/asyncHandler.js");
// const { authUser } = require("../../middlewares/authUser.js");

const router = express.Router();

router.post("/create", asyncHandler());



module.exports = router;
