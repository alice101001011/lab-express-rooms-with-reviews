const router = require("express").Router();
const Room = require("../models/Room.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const isLoggedIn = require("../middleware/isLoggedIn");

// Create review (only for logged in user and NOT owner of room)

router.get("/:id/review", isLoggedIn, async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const currentUserId = req.session.user._id;
    const room = await Room.findById(roomId).populate("owner");
    const ownerId = room.owner._id.valueOf();

    if (ownerId === currentUserId) {
      res.redirect("/rooms"),
        {
          errorMessage:
            "You can't write a review for this room, because you are the owner",
        };
    } else {
      res.render("reviews/create-review", room);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:id/review", isLoggedIn, async (req, res, next) => {
  try {
    //console.log(req.params);
    // console.log(req.body);
    // console.log(req.session.user);
    const roomId = req.params.id;
    const currentUser = req.session.user._id;
    const { comment } = req.body;

    const createdReview = await Review.create({
      user: currentUser,
      comment,
    });

    const updateRoom = await Room.findByIdAndUpdate(roomId, {
      $push: { reviews: createdReview },
    });

    // console.log(createdReview);
    // console.log(updateRoom);
    res.redirect(`/rooms/${roomId}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
