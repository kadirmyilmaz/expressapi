var Joi = require('joi');
 
module.exports = {
  body: {
    URL: Joi.string().uri().required()
  }
};