const generator = require('generate-password');

const generatePassword = () => generator.generate({
  length: 10,
  numbers: true,
});

const permissions = [
  'Bắn ruồi Android',
  'Bắn ruồi iOS',
  'Space X Android',
  'Space X iOS',
  'Mobile Kingdom',
  'Road Rampage',
  'Space Hunter',
  'Super Bow Android',
  'Bắn ruồi VIP Android',
  'Shadow Stickman Android',
  'Imba - Kawai Android',
  'Bottle Challenge 3D',
  'Heallios - Werewolf Android',
  'Imba - Kawai iOS',
  'Bắn ruồi VIP iOS',
  'Stickman Battle Android',
  'Hexagon Block Puzzle',
  'Space Hunter iOs',
  'Dragon Epic Android',
  'Castle Rush Android',
  'Dragon Shooter Android',
  'Space Hunter iOS',
  'Word Cross Android',
  'Dragon Epic iOs',
  'Zoombeast ',
  'Formular Car Stunt',
];

module.exports = {
  generatePassword,
  permissions,
};
