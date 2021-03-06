const user = require("../controllers/User.controllers");
const router = require("express").Router();

router.post("/signup", user.signup);

router.post("/login", user.login);

router.delete("/:username", user.deleteUser);

router.get("/:username", user.getUser);

module.exports = router;
