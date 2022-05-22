const router = require("express").Router();
const Room = require("../models/Room.model");
const User = require("../models/User.model");
const Review = require("../models/Review.model");
const mongoose = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");

// Display list of all rooms, no need to be logged in to view

router.get("/", async (req, res, next) => {
  try {
    const rooms = await Room.find();
    res.render("rooms/rooms-list", { rooms });
  } catch (err) {
    next(err);
  }
});

// Ceate new room (only for logged in users)

router.get("/create", isLoggedIn, (req, res, next) => {
  res.render("rooms/create-room");
});

router.post("/create", isLoggedIn, async (req, res, next) => {
  try {
    console.log(req.session);
    const { name, description, imageUrl } = req.body;
    await Room.create({
      name,
      description,
      imageUrl,
      owner: req.session.user._id,
    });

    res.redirect("/rooms");
  } catch (error) {
    next(error);
  }
});

// Edit room (only visible if logged in and owner of that room)

router.get("/:id/edit", isLoggedIn, async (req, res, next) => {
  try {
    const roomId = req.params.id;
    console.log(roomId, req.params);
    const currentUserId = req.session.user._id;
    console.log(currentUserId);
    const room = await Room.findById(roomId);
    const ownerId = room.owner._id.valueOf();
    console.log(room, ownerId);

    if (ownerId !== currentUserId || !ownerId) {
      res.redirect("/rooms"),
        {
          errorMessage:
            "You can't edit this room, because you are not the owner",
        };
    } else {
      res.render("rooms/edit-room", room);
    }
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", isLoggedIn, async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const { name, description, imageUrl } = req.body;

    await Room.findByIdAndUpdate(
      roomId,
      {
        name,
        description,
        imageUrl,
      },
      {
        new: true,
      }
    );

    res.redirect(`/rooms/${roomId}`);
  } catch (error) {
    next(error);
    res.render("rooms");
  }
});

// Delete room (only if logged in and owner of that room)

router.post("/:id/delete", isLoggedIn, async (req, res, next) => {
  try {
    const roomId = req.params.id;
    const currentUserId = req.session.user._id;
    const room = await Room.findById(roomId);
    const ownerId = room.owner._id.valueOf();

    if (ownerId !== currentUserId || !ownerId) {
      res.redirect("/rooms"),
        {
          errorMessage:
            "You can't delete this room, because you are not the owner",
        };
    } else {
      await Room.findByIdAndDelete(roomId);
      res.redirect("/rooms");
    }
  } catch (error) {
    next(error);
  }
});

// Display details of one room (visible to logged out as well)

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id).populate("owner");
    res.render("rooms/room-details", room);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
