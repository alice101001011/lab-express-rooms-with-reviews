const router = require("express").Router();
const Room = require("../models/Room.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const mongoose = require("mongoose");
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");











module.exports = router;