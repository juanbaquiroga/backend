/**
 * Products.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {type:"string", required: true},
    price: {type:"number", required: true},
    img: { type: "string", required: true },
    stock: { type: "number", required: true }
  },

};

