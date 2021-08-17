const controllers = require("../controllers/User.controllers");
const router = require("express").Router();

router.post("/signup", controllers.signup);

router.post("/login", controllers.login);

router.delete("/:username", controllers.deleteUser);

module.exports = router;
