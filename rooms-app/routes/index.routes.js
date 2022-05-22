const router = require("express").Router();
const exposeUser = require("../middleware/exposeUserToViews");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use("/auth", require("./auth.routes"));

router.use("/rooms", exposeUser, require("./rooms.routes"));

router.use("/reviews", require("./reviews.routes"));

router.use("/profile", require("./users.routes"));

module.exports = router;
