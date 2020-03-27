const express = require('express');
const router = express.Router();
const auth = require('./../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('./../../models/Profile');
const User = require('./../../models/User');

// @route     GET api/profile/me
// @desc      Get current user profile
// @access    private
router.get('/me', auth , async(req,res)=> {
  try {
    const profile = await Profile.findOne({user: req.user.id}).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({msg: 'There is no profile for this profile'})
    }

    res.json(profile);

  } catch(err) {
    console.error(err);
    res.status(500).send('Server Error')
  }
})

// @route     POST api/profile/
// @desc      create or update a user profile
// @access    private
router.post('/', [
  auth,
  [
    check('status', "Status is required").not().isEmpty(),
    check('skills', "Skills is required").not().isEmpty(),
  ]
], async (req,res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({error: errors.array()})
  }

  const {
    company,
    location,
    website,
    bio,
    skills,
    status,
    githubusername,
    youtube,
    twitter,
    instagram,
    linkedin,
    facebook
  } = req.body;

  //bulid profile obj
  const profileFields = {};
  profileFields.user = req.user.id;

  if(company) profileFields.company = company;
  if(website) profileFields.website = website;
  if(location) profileFields.location = location;
  if(bio) profileFields.bio = bio;
  if(status) profileFields.status = status;
  if(githubusername) profileFields.githubusername = githubusername;
  if(skills) {
    profileFields.skills = skills.split(',').map(skill => skill.trim());
  }

  //build social object
  profileFields.socials = {}
  if(youtube) profileFields.socials.youtube = youtube;
  if(twitter) profileFields.socials.twitter = twitter;
  if(instagram) profileFields.socials.instagram = instagram;
  if(linkedin) profileFields.socials.linkedin = linkedin;
  if(facebook) profileFields.socials.facebook = facebook;

  try {
    let profile = await Profile.findOne({ user: req.user.id })

    if(profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      )
      return res.json(profile);
    }

    //Create
    profile = new Profile(profileFields);
    await profile.save();
    return res.json(profile)

  } catch(err) {
    console.log(err);
    res.status(500).send('Server errror')
  }

})

// @route     GET api/profile/
// @desc      get all profiles
// @access    public
router.get('/', async (req,res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles)
  } catch(err) {
    console.log(err.message);
    res.status(500).send('Server Error')
  }
})

// @route     GET api/profile/user/:user_id
// @desc      get profile by user id
// @access    public
router.get('/user/:user_id', async (req,res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);

    if(!profile) {
      return res.status(400).json({ msg: 'Profile not found' })
    }

    res.json(profile)
  } catch(err) {
    console.log(err.message);
    if(err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' })
    }
    res.status(500).send('Server Error')
  }
})

module.exports = router;
