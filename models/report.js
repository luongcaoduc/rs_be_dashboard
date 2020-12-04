const { Schema, model } = require('mongoose');

const reportSchema = new Schema({
  Game: {
    type: String,
  },
  Date: {
    type: Date,
  },
  // Facebook Cost
  cost1: {
    type: Number,
    default: 0,
  },
  // Apple Search
  cost2: {
    type: Number,
    default: 0,
  },
  // Awords Cost
  cost3: {
    type: Number,
    default: 0,
  },
  // Q.C Unity Ads
  cost4: {
    type: Number,
    default: 0,
  },
  // Applovin Cost
  cost5: {
    type: Number,
    default: 0,
  },
  // Ironsrc
  cost6: {
    type: Number,
    default: 0,
  },
  // Apple Ads
  cost7: {
    type: Number,
    default: 0,
  },
  // Vungle
  cost8: {
    type: Number,
    default: 0,
  },
  // Liftoff
  cost9: {
    type: Number,
    default: 0,
  },
  // Mobvista
  cost10: {
    type: Number,
    default: 0,
  },
  // Yeahmobi
  cost11: {
    type: Number,
    default: 0,
  },
  // Youappi
  cost12: {
    type: Number,
    default: 0,
  },
  // Adcolony
  cost13: {
    type: Number,
    default: 0,
  },
  // Mintegral
  cost14: {
    type: Number,
    default: 0,
  },
  // Snapchat
  cost15: {
    type: Number,
    default: 0,
  },
  // Personaly
  cost16: {
    type: Number,
    default: 0,
  },
  // Tiktok
  cost17: {
    type: Number,
    default: 0,
  },
  // Optimise
  cost18: {
    type: Number,
    default: 0,
  },
  // Moloco
  cost19: {
    type: Number,
    default: 0,
  },
  // Other 7
  cost20: {
    type: Number,
    default: 0,
  },
  // Other 7
  cost21: {
    type: Number,
    default: 0,
  },
  // Other 8
  cost22: {
    type: Number,
    default: 0,
  },
  // Other 9
  cost23: {
    type: Number,
    default: 0,
  },
  // Mobwonder
  cost24: {
    type: Number,
    default: 0,
  },
  // Taptica
  cost25: {
    type: Number,
    default: 0,
  },
  // Unity Video
  rev1: {
    type: Number,
    default: 0,
  },
  // Vungle Video
  rev2: {
    type: Number,
    default: 0,
  },
  // Applovin Video
  rev3: {
    type: Number,
    default: 0,
  },
  // Admob Video
  rev4: {
    type: Number,
    default: 0,
  },
  // Ironsrc Video
  rev5: {
    type: Number,
    default: 0,
  },
  // FANs Video
  rev6: {
    type: Number,
    default: 0,
  },
  // Adcolony Video
  rev7: {
    type: Number,
    default: 0,
  },
  // Pokkt Video
  rev8: {
    type: Number,
    default: 0,
  },
  // Mintegral Video
  rev9: {
    type: Number,
    default: 0,
  },
  // Pangle
  rev10: {
    type: Number,
    default: 0,
  },
  // Other 4
  rev11: {
    type: Number,
    default: 0,
  },
  // Other 5
  rev12: {
    type: Number,
    default: 0,
  },
  // Unity Inter
  rev13: {
    type: Number,
    default: 0,
  },
  // Vungle Inter
  rev14: {
    type: Number,
    default: 0,
  },
  // Applovin Inter
  rev15: {
    type: Number,
    default: 0,
  },
  // Admob Inter
  rev16: {
    type: Number,
    default: 0,
  },
  // Ironsrc Inter
  rev17: {
    type: Number,
    default: 0,
  },
  // FANs Inter
  rev18: {
    type: Number,
    default: 0,
  },
  // Adcolony Inter
  rev19: {
    type: Number,
    default: 0,
  },
  // Mintegral Inter
  rev20: {
    type: Number,
    default: 0,
  },
  // Banner
  rev21: {
    type: Number,
    default: 0,
  },
  // Other 8
  rev22: {
    type: Number,
    default: 0,
  },
  // Other 8
  rev23: {
    type: Number,
    default: 0,
  },
  // Other 8
  rev24: {
    type: Number,
    default: 0,
  },
  // Inapp
  rev25: {
    type: Number,
    default: 0,
  },
});

const Report = model('Report', reportSchema);

module.exports = Report;
