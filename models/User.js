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
    type: Integer
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
    type: String
  }, 
  strength: {
    type: Integer
  }, 
  dexterity: {
    type: Integer
  }, 
  constitution: {
    type: Integer
  }, 
  intelligence: {
    type: Integer
  }, 
  wisdom: {
    type: Integer
  }, 
  charisma: {
    type: Integer
  }, 
  proficiencies: [],
  features: [],
  maxhealth: {
    type: Integer
  }, 
  currenthealth: {
    type: Integer
  }, 
  attacks: [], 
  skills: [],
  equipment: [], 
  totalhitdice: {
    type: String
  }, 
  currenthitdice: {
    type: Integer
  }, 
  temporaryhealth: {
    type: Integer
  }, 
  weapons: [WeaponSchema],
  spells: [SpellSchema],
  gold: {
    type: Integer
  }, 
  silver: {
    type: Integer
  }, 
  copper: {
    type: Integer
  }, 
  onetotal: {
    type: Integer
  }, 
  oneremaing: {
    type: Integer
  }, 
  twototal: {
    type: Integer
  }, 
  tworemaining: {
    type: Integer
  }, 
  threetotal: {
    type: Integer
  }, 
  threeremaining: {
    type: Integer
  }, 
  fourtotal: {
    type: Integer
  }, 
  fourremaining: {
    type: Integer
  }, 
  fivetotal: {
    type: Integer
  }, 
  fiveremaining: {
    type: Integer
  }, 
  sixtotal: {
    type: Integer
  }, 
  sixremaining: {
    type: Integer
  }, 
  seventotal: {
    type: Integer
  }, 
  sevenremaining: {
    type: Integer
  }, 
  eighttotal: {
    type: Integer
  }, 
  eightremaining: {
    type: Integer
  }, 
  ninetotal: {
    type: Integer
  }, 
  nineremaining: {
    type: Integer
  }, 
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