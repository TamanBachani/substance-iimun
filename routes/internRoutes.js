const express = require('express')
const router = express.Router();
const Interns = require('../models/interns')
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const getIntern = require('../middleware/getIntern')

// Route 1: To create accouint '/auth/signUp' No Login required

router.post(
  "/signUp",
  [
    body("name", "Name should be atleast 3 characters long").isLength({ min: 3 }),
    body("sub_id", "Invalid Email").isEmail(),
    body("password", "Password should be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // express validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      let { name, sub_id, password } = req.body;
      name = name.toLowerCase();
      sub_id = sub_id.toLowerCase();
      const adminMails = process.env.ADMIN_SUB_ID.split(",");
      
      let intern = await Interns.findOne({ sub_id });
      // if same substance id is put to register
      if (intern) {
        return res
          .status(400)
          .send({ error: "You already registered using this email" });
      }
      if (adminMails.includes(sub_id)) {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        let intern = await new Interns({
          name,
          sub_id,
          password: hashedPass,
          role: "admin",
        });
        const savedintern = await intern.save();
        const data = {
          intern: {
            id: savedintern.id,
          },
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);
        return res.send({ authToken, intern: savedintern });
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        intern = await new Interns({
          name,
          sub_id,
          password: hashedPass,
        });
        const savedintern = await intern.save();
        const data = {
          intern: {
            id: savedintern.id,
          },
        };
        const authToken = jwt.sign(data, process.env.JWT_SECRET);

        res.send({ authToken, intern: savedintern });
      }
    } catch (e) {
        console.error(e.message);
        res.status(500).send({
        error: e.message,
      });
    }
    
  }
);

// Route 2: To login to accouint '/auth/login' No Login required

router.post(
  "/login",
  [
    body("name", "Name should be atleast 3 characters long").isLength({ min: 3 }),
    body("password", "Password should be atleast 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // express validator errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      let { name, password } = req.body;
      name = name.toLowerCase();
      let intern = await Interns.findOne({ name });
      // if same substance id is put to register
      if (!intern) {
        return res
          .status(400)
          .send({ error: "Account does not exist" });
      }
      const compare = await bcrypt.compare(password, intern.password)
      if (!compare) {
        return res.status(400).send({ error: "Password doesn't match" });
      }
        const data = {
          intern: {
            id: intern.id
          }
        }
        const authToken = jwt.sign(data, process.env.JWT_SECRET)

        res.send({ authToken, intern});
      
    } catch (e) {
        console.error(e.message);
        res.status(500).send({
        error: e.message,
      });
    }
    
  }
);


// Route 3: To Get intern details '/auth/internInfo' No Login required

router.post(
  "/internInfo",
  getIntern,
  async (req, res) => {
    try {
      // console.log(req.intern.id);
      const internID = req.intern.id
      const intern = await Interns.findById(internID).select("-password")
      if (intern === null) {
        return res.status(400).send({error: "No intern found"});
      }
      res.send(intern)
    } catch (e) {
        console.error(e.message);
        res.status(500).send({
        error: e.message,
      });
    }
    
  }
);


module.exports = router;