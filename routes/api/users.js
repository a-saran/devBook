const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('./../../models/User'); //model

// @route     POST api/users
// @desc      Test route
// @access    Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'please enter a password with 6 or more characters').isLength({ min: 6 })
] ,async (req,res)=> {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const {name, email, password} = req.body;


  try {
    //users exits
    let user = await User.findOne({ email });
    if(user) {
      return res.status(400).json({ error: [ { msg: 'User already exists'} ] })
    }
  
    //get user gravatar
    const avatar = gravatar.url(email , {
      s: '200',
      r: 'pg',
      d: 'mm'
    })

    user = new User({
      name,
      email,
      avatar,
      password,
    });

    //encrpt password
    const salt = await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(password, salt);
    await user.save();

    //return jwt
    const payload = {
      user: {
        id: user.id,
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if(err) throw err;
        res.send({ token })
      }
    )

  }catch(err) {
    console.error(err);
    res.status(500).send('Server Error')
  }

})

module.exports = router;
