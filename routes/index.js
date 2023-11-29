const express = require("express");
const Mail = require("../controllers/mail-api");
// const SMS = require("../controllers/sms-api")
const router = express.Router();

router.post('/mail-verify',Mail.sendMailVerify);
router.post('/password-reset',Mail.sendMailPassword);
router.post('/success',Mail.sendMailSuccess);
// router.post('/sms',SMS.sendSMSVerify);
router.post('/attendance',Mail.sendMailAttendance)


module.exports = router