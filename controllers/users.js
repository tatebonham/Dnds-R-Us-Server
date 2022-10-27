const router = require('express').Router()
const db = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')

// GET /users - test endpoint
router.get('/', authLockedRoute, async (req, res) => {
  try {
    // console.log(res.locals.user)
          const oneUser = await db.User.findOne({
              _id: res.locals.user._id
          })
  
          res.json(oneUser)
  
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// PUT /users/edit - udpate user profile
router.put('/edit', authLockedRoute, async (req, res) => {
  try {
    console.log(req.body.name)
          const oneUser = await db.User.findByIdAndUpdate({
              _id: res.locals.user._id
          }, {
            name: req.body.name,
            email: req.body.email
          }, {
            new: true
          })
          return res.status(200).json({oneUser})
  
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// POST /users/register - CREATE new user
router.post('/', async (req, res) => {
  try {
    // check if user exists already
    const findUser = await db.User.findOne({
      email: req.body.email
    })

    // don't allow emails to register twice
    if(findUser) return res.status(400).json({ msg: 'email exists already' })
  
    // hash password
    const password = req.body.password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds)
  
    // create new user
    const newUser = new db.User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
  
    await newUser.save()

    // create jwt payload
    const payload = {
      name: newUser.name,
      email: newUser.email, 
      id: newUser.id
    }

    // sign jwt and send back
    const token = await jwt.sign(payload, process.env.JWT_SECRET)
    res.json({ token })
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: 'server error'  })
  }
})

// POST /users/login -- validate login credentials
router.post('/login', async (req, res) => {
  try {
    // try to find user in the db
    const foundUser = await db.User.findOne({
      email: req.body.email
    })

    const noLoginMessage = 'Incorrect username or password'

    // if the user is not found in the db, return and sent a status of 400 with a message
    if(!foundUser) return res.status(400).json({ msg: noLoginMessage })
    
    // check the password from the req body against the password in the database
    const matchPasswords = await bcrypt.compare(req.body.password, foundUser.password)
    
    // if provided password does not match, return an send a status of 400 with a message
    if(!matchPasswords) return res.status(400).json({ msg: noLoginMessage })

    // create jwt payload
    const payload = {
      name: foundUser.name,
      email: foundUser.email, 
      id: foundUser.id
    }

    // sign jwt and send back
    const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 })

    res.json({ token })
  } catch(error) {
    console.log(error)
    res.status(500).json({ msg: 'server error'  })
  }
})

  // Get /users/characters -- view your characters
router.get("/characters", authLockedRoute, async (req, res) => {
  try {
    // res.json('hi')
    const oneUser = await db.User.findOne({
      _id: res.locals.user._id
  })
  // return oneUser
    res.json(oneUser.characters)

  }  catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})
  
// POST /users/characters -- create a new character
router.post("/characters", authLockedRoute, async(req,res) => {
  try {
    // console.log(res.locals.user)
          const oneUser = await db.User.findOne({
              _id: res.locals.user._id
          })
  
          const newCharacter = {
              name: req.body.name,
              race: req.body.race,
              class: req.body.class,
              subclass: req.body.subclass,
              level: req.body.level
          }
  
          oneUser.characters.push(newCharacter)
          res.json(oneUser)
  
          await oneUser.save()
  
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// GET /users/characters/:charactersId -- display a character
router.get("/characters/:characterId", authLockedRoute, async(req,res) => {
  try {
    const oneCharacter = await db.User.findOne({
          _id: res.locals.user._id, "characters._id": req.params.characterId
      })
  
          res.json(oneCharacter)
  
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// PUT /users/characters/:characterId -- update a character
router.put("/characters/:characterId", authLockedRoute, async(req,res) => {
  try {
    const oneUser = await db.User.findOneAndUpdate({
          _id: res.locals.user._id, "characters._id": req.params.characterId
      }, { $set: {
        "characters.$.name": req.body.name,
        "characters.$.race": req.body.race,
        "characters.$.class": req.body.class,
        "characters.$.subclass": req.body.subclass,
        "characters.$.level": req.body.level,

      }
      }, {
        new: true
      })
  
          res.json(oneUser)
  
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Post -- create a new weapon schema in character schema
router.post("/characters/:characterId/weapons", authLockedRoute, async(req,res) => {
  try {
        const oneUser = await db.User.findOneAndUpdate({
            _id: res.locals.user._id, "characters._id": req.params.characterId
        }, { $push: {
              "characters.$.weapons": req.body.weapons,
        }},{
          new: true
        })


        res.json(oneUser)

      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Put -- Edit a weapon schema
router.put("/characters/:characterId/weapons/:weaponId", authLockedRoute, async(req,res) => {
  try {
        const oneUser = await db.User.updateOne({
            "_id": res.locals.user._id,
            "characters": {
              "$elemMatch": {
                "_id": req.params.characterId,
                "weapons._id": req.params.weaponId
              }
            }
        }, { $set: {
              "characters.$[outer].weapons.$[inner].name": req.body.name,
              "weapons.$.damage": req.body.damage,
              "weapons.$.type": req.body.type,
              "weapons.$.note": req.body.note,
              
        }},{
          "arrayFilters": [
            {"outer._id": req.params.characterId},
            {"inner._id": req.params.weaponId}
          ]
        })


        res.json(oneUser)

      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})





// GET /auth-locked - will redirect if bad jwt token is found
router.get('/auth-locked', authLockedRoute, (req, res) => {
    console.log(res.locals)
    res.json( { msg: 'welcome to the private route!' })
  })
  
  
  
  
  module.exports = router