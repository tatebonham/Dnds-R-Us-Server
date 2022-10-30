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
const AttackSchema = new mongoose.Schema({
  note: {
    type: String
  },
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
  proficiencies: {
    type: String
  },
  features: {
    type: String
  },
  maxhealth: {
    type: Number
  }, 
  currenthealth: {
    type: Number
  }, 
  attacks: [AttackSchema],
  skills: [],
  equipment: {
    type: String
  }, 
  totalhitdice: {
    type: String
  }, 
  armor: {
    type: Number
  }, 
  speed: {
    type: Number
  }, 
  initiative: {
    type: Number
  }, 
  inpiration: {
    type: Number
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
  },
  acrobatics: {
    type: Boolean
  },
  animalhandling: {
    type: Boolean
  },
  arcana: {
    type: Boolean
  },
  athletics: {
    type: Boolean
  },
  deception: {
    type: Boolean
  },
  history: {
    type: Boolean
  },
  insight: {
    type: Boolean
  },
  intimidation: {
    type: Boolean
  },
  investigation: {
    type: Boolean
  },
  medicine: {
    type: Boolean
  },
  nature: {
    type: Boolean
  },
  perception: {
    type: Boolean
  },
  performance: {
    type: Boolean
  },
  persuasion: {
    type: Boolean
  },
  religion: {
    type: Boolean
  },
  sleight: {
    type: Boolean
  },
  stealth: {
    type: Boolean
  },
  survival: {
    type: Boolean
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