const express = require("express");
const router = express.Router();
const Leaves = require("../models/leaves");
const Interns = require("../models/interns");
const { body, validationResult } = require("express-validator");
const getIntern = require("../middleware/getIntern");
require("dotenv").config();
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const adminMails = process.env.ADMIN_SUB_ID.split(",");
// const mongoose = require('mongoose')

// TO caplitilize status
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


// function to send mail
const sendMail = async (name, sub_id, status, subject, admin_feedback) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.FROM_ID,
      pass: process.env.FROM_PASSWORD,
    },
  });
  capStatus = capitalizeFirstLetter(status)
  if (capStatus === "Rejected") {
    // send email
    await transporter.sendMail({
      from: process.env.FROM_ID,
      to: sub_id,
      subject: `Your application for leave has been ${capStatus}!`,
      html: `<div class="mail" style="font-family: 'Trebuchet MS';">
  <h3>Hello ${name},</h3>
  <h3>Meep Morp Zeep! The Application for your leave with subject: <span class="subject" style="color: red;">${subject}</span>, has been <span class="status" style="color: red;text-decoration: underline;">${capStatus}!</span> Please contact your mentor if you have any queries.</h3>
  <h3>Preksha says, <em>"${admin_feedback}"</em></h3>
<h3>Yours truly enslaved,</h3>
<h3>Substance Robot 🤖</h3>
</div>`,
    });
  } else {
    await transporter.sendMail({
      from: process.env.FROM_ID,
      to: sub_id,
      subject: `Your application for leave has been ${capStatus}!`,
      html: `<div class="mail" style="font-family: 'Trebuchet MS';">
  <h3>Hello ${name},</h3>
  <h3>Meep Morp Zeep! The Application for your leave with subject: <span class="subject" style="color: green;">${subject}</span>, has been <span class="status" style="color: green;text-decoration: underline;">${capStatus}!</span> Spend your day jovially!</h3>
  <h3>Preksha says, <em>"${admin_feedback}"</em></h3>
<h3>Yours truly enslaved,</h3>
<h3>Substance Robot 🤖</h3>
</div>`,
    });
  }
};

<<<<<<< HEAD
=======
const sendMailsToAdmin = (name, subject) => {
  adminMails.forEach(async (admin_id) => {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: process.env.FROM_ID,
        pass: process.env.FROM_PASSWORD,
      },
    });
    // send email
    await transporter.sendMail({
      from: process.env.FROM_ID,
      to: admin_id,
      subject: `${name} has applied for a new Leave!`,
      html: `<div class="mail" style="font-family: 'Trebuchet MS';">
      <h3>Beep Boop Beep!</h3>
      <h3>A new Leave awaits you. ${name} says, "<span style="color: orange;">${subject}</span>". Kindly check the website to reply.</h3>
      <h3><em>To approve, or not to approve</em></h3>
      <h3>Yours truly enslaved, </h3>
      <h3>Substance Robot 🤖</h3>
      </div>`,
    });
  });
}
>>>>>>> 7b1e19470617e56355526afa187a90d4a78073d9


// to schedule
// cron.schedule("0 19 * * 1,3,5",  function () {
//   adminMails.forEach(async () => {
//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       auth: {
//         user: process.env.FROM_ID,
//         pass: process.env.FROM_PASSWORD,
//       },
//     });
//     // send email
//     await transporter.sendMail({
//       from: process.env.FROM_ID,
//       to: "reindeers.santa@gmail.com",
//       subject: "You might have New Pending Leaves to reply to",
//       html: `<div class="mail" style="font-family: 'Georgia';">
//       <h3>Beep Boop Beep!</h3>
//       <h3>Just a benign reminder to check the website, new leaves might await you!</h3>
//       <h3>Yours truly enslaved, Substance Robot ;)</h3>
//       </div>`,
//     });
//   });
// });





// Route 1: To apply for a leave '/leaves/apply' Login required

router.post(
  "/apply",
  getIntern,
  [
    body("subject", "Subject should be atleast 5 characters long").isLength({
      min: 5,
    }),
    body("message", "Message should be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // express validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const internID = req.intern.id;
    const {name} = await Interns.findById(internID).select('-password')
    const { subject, message } = req.body;
    let sameLeaveBySameIntern = await Leaves.findOne({
      subject,
      message,
      intern: internID,
    });
    // if same leave submitted twice by same intern
    if (sameLeaveBySameIntern) {
      return res
        .status(400)
        .send({ error: "You already submiited this application for leave" });
    } else {
      await Interns.updateOne(
        { _id: internID },
        { $inc: { leaves: 1 } },
        { upsert: true }
      );
      let leave = await new Leaves({
        intern: internID,
        subject,
        message,
        created: Date.now()
      });
      const savedLeave = await leave.save();
      sendMailsToAdmin(name, savedLeave.subject);
      res.send({ leave: savedLeave });
    }
  }
);

// Route 2: Fetch all leaves '/leaves/all Admin login required

router.get("/all/:status", getIntern, async (req, res) => {
  try {
    const internID = req.intern.id;
    // Checking if its actually admin
    let isAdmin = await Interns.findById(internID).select("-password");
    if (!isAdmin) {
      return res.status(400).send({ error: "The account does not exist" });
    }
    if (isAdmin.role !== "admin") {
      return res
        .status(500)
        .send({ error: "You are not authorized to access this page" });
    }
    const status = req.params.status;
    const allLeaves = await Leaves.find({ status: status }).populate("intern");
    if (allLeaves.length === 0) {
      return res.send({ empty: `No ${status} Leaves currently` });
    }
    return res.send(allLeaves);
  } catch (e) {
    console.error(e.message);
    res.status(500).send({
      error: e.message,
    });
  }
});

// Route 3: Deal with  leaves '/leaves/:id/:status Admin login required
router.put("/:id", getIntern, async (req, res) => {
  try {
    const internID = req.intern.id;
    // Checking if its actually admin
    let isAdmin = await Interns.findById(internID).select("-password");
    if (!isAdmin) {
      return res.status(400).send({ error: "The account does not exist" });
    }
    if (isAdmin.role !== "admin") {
      return res
        .status(500)
        .send({ error: "You are not authorized to access this page" });
    }
    let leaveId = req.params.id;
    let { status, admin_feedback } = req.body;
    let leaveDealt;
    console.log(admin_feedback)
    if (admin_feedback) {
      leaveDealt = await Leaves.findByIdAndUpdate(
        { _id: leaveId },
        { $set: { "status": status, "admin_feedback": admin_feedback } },
        { new: true }
      ).populate("intern");
    } else {
      leaveDealt = await Leaves.findByIdAndUpdate(
        { _id: leaveId },
        { $set: { status: status } },
        { new: true }
      ).populate("intern");
    }
    if (!leaveDealt) {
      res.status(400).send({ error: "Leave application not found" });
    }
    res.send(leaveDealt);
    // substance id of the intern
    const { sub_id, name } = leaveDealt.intern;
    const { subject } = leaveDealt;
    sendMail(name, sub_id, status, subject, admin_feedback);
    // console.log(sub_id)
  } catch (e) {
    console.error(e.message);
    res.status(500).send({
      error: e.message,
    });
  }
});

// Route 4: Check leave status /leaves/status login required

router.get("/status", getIntern, async (req, res) => {
  try {
    const internID = req.intern.id;
    const allLeavesbyIntern = await Leaves.find({ intern: internID });
    if (allLeavesbyIntern.length === 0) {
      return res.send({ empty: "You have no leave applications active" });
    }
    return res.send(allLeavesbyIntern);
  } catch (e) {
    console.error(e.message);
    return res.status(500).send({
      error: e.message,
    });
  }
});

module.exports = router;
