import joi from 'joi';

const validations = {
  // POST /api/link
  createLink: {
    body: {
      url: joi.string().required(),
      service: joi.string().regex(/^[1-9][0-9]{9}$/).required(),
    },
  },
};

export default validations;
