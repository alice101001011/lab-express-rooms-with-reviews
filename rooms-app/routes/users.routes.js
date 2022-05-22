const router = require("express").Router();
const Room = require("../models/Room.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

// Display user profile with their rooms and the ability to create new rooms

router.get("/", isLoggedIn, async (req, res, next) => {
  try {
    const currentUserId = req.session.user._id;
    const rooms = await Room.find({owner: currentUserId});
    res.render("users/user-profile", { rooms });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
