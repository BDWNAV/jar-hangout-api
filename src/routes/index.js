const router = require("express").Router();
const auth = require("./auth");
const discord = require("./discord");

router.use('/auth', auth);
router.use('/auth/discord/redirect', auth)

module.exports = router;