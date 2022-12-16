const express = require("express");
const { getNews } = require("../controllers/newsController");
const { isAuthenticatedUser } = require("../middlewares/Auth");
const router = express.Router();

router.route("/news").get(isAuthenticatedUser, getNews);

module.exports = router;
