const express = require("express");
const Mail = require("../controllers/mail-api");
const router = express.Router();

router.post('/mail-verify',Mail.sendMailVerify);
router.post('/password-reset',Mail.sendMailPassword);
router.post('/success',Mail.sendMailSuccess);

module.exports = router;