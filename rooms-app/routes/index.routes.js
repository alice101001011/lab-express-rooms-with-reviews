const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/auth", require("./auth.routes"));

router.use("/rooms", require("./rooms.routes"));

router.use("/reviews", require("./reviews.routes"))

module.exports = router;
