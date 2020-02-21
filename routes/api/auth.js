const express = require('express');
const router = express.Router();
const auth = require('./../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./../../models/User');

// @route     GET api/auth
// @desc      Test route
// @access    Public
router.get('/', auth , async(req,res)=> {
  try {
    const user = await User.findById(req.user.id).select('-password')

    res.status(200).json(user)
  } catch(err) {
    console.log(err)
    res.status(500).send('Server error')
  }
})

// @route     POST api/auth
// @desc      Test route
// @access    Public
router.post('/', [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'password is required').exists(),
] ,async (req,res)=> {

  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if(!user) {//no user
      return res
        .status(400)
        .json({ error: [ { msg: 'invalid credentials'} ] })
    }
  
    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
      return res
        .status(400)
        .json({ error: [{ msg: 'Invalid Credentials' }] })
    }

    //return jwt
    const payload = {
      user: {
        id: user.id,
      }
    }

    jwt.sign(
      payload,
      config.get('jwtSecret'),
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
