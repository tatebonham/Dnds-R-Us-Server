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
    const token = await jwt.sign(payload, process.env.JWT_SECRET)

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
  
          await oneUser.save()
          res.json(oneUser)
  
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// GET /users/characters/:charactersId -- display a character
router.get("/characters/:characterId", authLockedRoute, async(req,res) => {
  try {
      const oneUser = await db.User.findOne({
          _id: res.locals.user._id, "characters._id": req.params.characterId
      })
          const oneCharacter = oneUser.characters.id(req.params.characterId)
  
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
        "characters.$.alignment": req.body.alignment,
        "characters.$.background": req.body.background,
        "characters.$.level": req.body.level,
        "characters.$.strength": req.body.strength,
        "characters.$.dexterity": req.body.dexterity,
        "characters.$.constitution": req.body.constitution,
        "characters.$.intelligence": req.body.intelligence,
        "characters.$.wisdom": req.body.wisdom,
        "characters.$.charisma": req.body.charisma,
        "characters.$.img_url": req.body.img_url,
        "characters.$.speed": req.body.speed,
        "characters.$.armor": req.body.armor,
        "characters.$.initiative": req.body.initiative,
        "characters.$.inpiration": req.body.inpiration,
        "characters.$.maxhealth": req.body.maxhealth,
        "characters.$.temporaryhealth": req.body.temporaryhealth,
        "characters.$.currenthealth": req.body.currenthealth,
        "characters.$.totalhitdice": req.body.totalhitdice,
        "characters.$.currenthitdice": req.body.currenthitdice,
        "characters.$.gold": req.body.gold,
        "characters.$.silver": req.body.silver,
        "characters.$.copper": req.body.copper,
        "characters.$.proficiencies": req.body.proficiencies,
        "characters.$.features": req.body.features,
        "characters.$.skills": req.body.skills,
        "characters.$.equipment": req.body.equipment,
        "characters.$.acrobatics": req.body.acrobatics,
        "characters.$.animalhandling": req.body.animalhandling,
        "characters.$.arcana": req.body.arcana,
        "characters.$.athletics": req.body.athletics,
        "characters.$.deception": req.body.deception,
        "characters.$.history": req.body.history,
        "characters.$.insight": req.body.insight,
        "characters.$.intimidation": req.body.intimidation,
        "characters.$.investigation": req.body.investigation,
        "characters.$.medicine": req.body.medicine,
        "characters.$.nature": req.body.nature,
        "characters.$.perception": req.body.perception,
        "characters.$.performance": req.body.performance,
        "characters.$.persuasion": req.body.persuasion,
        "characters.$.religion": req.body.religion,
        "characters.$.sleight": req.body.sleight,
        "characters.$.stealth": req.body.stealth,
        "characters.$.survival": req.body.survival,
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
        const oneUser = await db.User.findOne({
            _id: res.locals.user._id, "characters._id": req.params.characterId
        })
        const oneCharacter = oneUser.characters.id(req.params.characterId)
        const newWeapon = {
            name: req.body.name,
            damage: req.body.damage,
            type: req.body.type,
            note: req.body.note,
        }
        oneCharacter.weapons.push(newWeapon)
      
        await oneUser.save()
        res.json(oneUser)
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Post -- create a new spell schema in character schema
router.post("/characters/:characterId/spells", authLockedRoute, async(req,res) => {
  try {
        const oneUser = await db.User.findOne({
            _id: res.locals.user._id, "characters._id": req.params.characterId
        })
        const oneCharacter = oneUser.characters.id(req.params.characterId)
        const newSpell = {
            name: req.body.name,
            level: req.body.level,
            note: req.body.note,
        }
        oneCharacter.spells.push(newSpell)
      
        await oneUser.save()
        res.json(oneUser)
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Post -- create a new attack schema in character schema
router.post("/characters/:characterId/attacks", authLockedRoute, async(req,res) => {
  try {
        const oneUser = await db.User.findOne({
            _id: res.locals.user._id, "characters._id": req.params.characterId
        })
        const oneCharacter = oneUser.characters.id(req.params.characterId)
        const newAttack = {
            note: req.body.note,
        }
        oneCharacter.attacks.push(newAttack)
      
        await oneUser.save()
        res.json(oneUser)
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Get -- get sepcific weapon
router.get("/characters/:characterId/weapons/:weaponId", authLockedRoute, async(req,res) => {
    try {
        const oneUser = await db.User.findOne({
        _id: res.locals.user._id, "characters._id": req.params.characterId
    })
        const oneCharacter = oneUser.characters.id(req.params.characterId)

        const oneWeapon = oneCharacter.weapons.id(req.params.weaponId)

        res.json(oneWeapon)


      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Get -- get sepcific spell
router.get("/characters/:characterId/spells/:spellId", authLockedRoute, async(req,res) => {
    try {
        const oneUser = await db.User.findOne({
        _id: res.locals.user._id, "characters._id": req.params.characterId
    })
        const oneCharacter = oneUser.characters.id(req.params.characterId)

        const oneSpell = oneCharacter.spells.id(req.params.spellId)

        res.json(oneSpell)

      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Get -- get sepcific attack
router.get("/characters/:characterId/attacks/:attackId", authLockedRoute, async(req,res) => {
    try {
        const oneUser = await db.User.findOne({
        _id: res.locals.user._id, "characters._id": req.params.characterId
    })
        const oneCharacter = oneUser.characters.id(req.params.characterId)

        const oneAttack = oneCharacter.attacks.id(req.params.attackId)

        res.json(oneAttack)
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Delete -- delete specific character
router.delete("/characters/:characterId", authLockedRoute, async(req,res) => {
    try {
        const oneUser = await db.User.findOne({
        _id: res.locals.user._id, "characters._id": req.params.characterId
    })
        const oneCharacter = oneUser.characters.id(req.params.characterId).remove()


        oneUser.save()
        res.json(oneCharacter)
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Delete -- delete specific weapon
router.delete("/characters/:characterId/weapons/:weaponId", authLockedRoute, async(req,res) => {
    try {
        const oneUser = await db.User.findOne({
        _id: res.locals.user._id, "characters._id": req.params.characterId
    })
        const oneCharacter = oneUser.characters.id(req.params.characterId)

        const deleteWeapon = oneCharacter.weapons.id(req.params.weaponId).remove()

        oneUser.save()
        res.json(deleteWeapon)
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Delete -- delete specific spell
router.delete("/characters/:characterId/spells/:spellId", authLockedRoute, async(req,res) => {
    try {
        const oneUser = await db.User.findOne({
        _id: res.locals.user._id, "characters._id": req.params.characterId
    })
        const oneCharacter = oneUser.characters.id(req.params.characterId)

        const deleteSpell = oneCharacter.spells.id(req.params.spellId).remove()

        oneUser.save()
        res.json(deleteSpell)
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Delete -- delete specific attack
router.delete("/characters/:characterId/attacks/:attackId", authLockedRoute, async(req,res) => {
    try {
        const oneUser = await db.User.findOne({
        _id: res.locals.user._id, "characters._id": req.params.characterId
    })
        const oneCharacter = oneUser.characters.id(req.params.characterId)

        const deleteAttack = oneCharacter.attacks.id(req.params.attackId).remove()

        oneUser.save()
        res.json(deleteAttack)
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
              "characters.$[outer].weapons.$[inner].damage": req.body.damage,
              "characters.$[outer].weapons.$[inner].type": req.body.type,
              "characters.$[outer].weapons.$[inner].note": req.body.note,            
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

// Put -- Edit a spell schema
router.put("/characters/:characterId/spells/:spellId", authLockedRoute, async(req,res) => {
  try {
        const oneUser = await db.User.updateOne({
            "_id": res.locals.user._id,
            "characters": {
              "$elemMatch": {
                "_id": req.params.characterId,
                "spells._id": req.params.spellId
              }
            }
        }, { $set: {
              "characters.$[outer].spells.$[inner].name": req.body.name,
              "characters.$[outer].spells.$[inner].level": req.body.level,
              "characters.$[outer].spells.$[inner].note": req.body.note,            
        }},{
          "arrayFilters": [
            {"outer._id": req.params.characterId},
            {"inner._id": req.params.spellId}
          ]
        })

        res.json(oneUser)
      } catch(err) {
      console.log(err)
      return res.status(500).json({error: "Server Error"})        
  }
})

// Put -- Edit a attack schema
router.put("/characters/:characterId/attacks/:attackId", authLockedRoute, async(req,res) => {
  try {
        const oneUser = await db.User.updateOne({
            "_id": res.locals.user._id,
            "characters": {
              "$elemMatch": {
                "_id": req.params.characterId,
                "attacks._id": req.params.attackId
              }
            }
        }, { $set: {
              "characters.$[outer].attacks.$[inner].note": req.body.note,            
        }},{
          "arrayFilters": [
            {"outer._id": req.params.characterId},
            {"inner._id": req.params.attackId}
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