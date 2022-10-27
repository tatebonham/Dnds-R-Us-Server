// require mongoose ODM
const mongoose = require('mongoose')

const WeaponSchema = new mongoose.Schema({
    name: {
      type: String
    },
    damage: {
      type: String
    },
    type: {
      type: String
    },
    note: {
      type: String
    }
  }, {
    timestamps: true
  })

const SpellSchema = new mongoose.Schema({
  name: {
    type: String
  },
  level: {
    type: Number
  },
  note: {
    type: String
  }
}, {
  timestamps: true
})

const CharacterSchema = new mongoose.Schema({
  name: {
    type: String
  },
  race: {
    type: String
  },
  class: {
    type: String
  }, 
  subclass: {
    type: String
  },
  background: {
    type: String
  }, 
  alignment: {
    type: String
  }, 
  level: {
    type: Number
  }, 
  strength: {
    type: Number
  }, 
  dexterity: {
    type: Number
  }, 
  constitution: {
    type: Number
  }, 
  intelligence: {
    type: Number
  }, 
  wisdom: {
    type: Number
  }, 
  charisma: {
    type: Number
  }, 
  proficiencies: [],
  features: [],
  maxhealth: {
    type: Number
  }, 
  currenthealth: {
    type: Number
  }, 
  attacks: [], 
  skills: [],
  equipment: [], 
  totalhitdice: {
    type: String
  }, 
  currenthitdice: {
    type: Number
  }, 
  temporaryhealth: {
    type: Number
  }, 
  weapons: [WeaponSchema],
  spells: [SpellSchema],
  gold: {
    type: Number
  }, 
  silver: {
    type: Number
  }, 
  copper: {
    type: Number
  }, 
  onetotal: {
    type: Number
  }, 
  oneremaing: {
    type: Number
  }, 
  twototal: {
    type: Number
  }, 
  tworemaining: {
    type: Number
  }, 
  threetotal: {
    type: Number
  }, 
  threeremaining: {
    type: Number
  }, 
  fourtotal: {
    type: Number
  }, 
  fourremaining: {
    type: Number
  }, 
  fivetotal: {
    type: Number
  }, 
  fiveremaining: {
    type: Number
  }, 
  sixtotal: {
    type: Number
  }, 
  sixremaining: {
    type: Number
  }, 
  seventotal: {
    type: Number
  }, 
  sevenremaining: {
    type: Number
  }, 
  eighttotal: {
    type: Number
  }, 
  eightremaining: {
    type: Number
  }, 
  ninetotal: {
    type: Number
  }, 
  nineremaining: {
    type: Number
  }, 
  img_url:{
    type: String
  }
}, {timestamps: true})

const UserSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  characters: [CharacterSchema]
}, {
  timestamps: true
})

module.exports = mongoose.model('User', UserSchema)