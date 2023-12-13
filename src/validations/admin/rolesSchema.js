const Joi = require('joi');
const { objectId } = require('./customValidation');

const rolesSchema = Joi.object({
  role: Joi.string().valid("superAdmin","admin","transporter","sse","ose").required()
});

const userSchema = Joi.object({
  roleId: Joi.string().custom(objectId),
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  languageSettings: Joi.string().valid("english","hindi")
})
const refreshTokenBodySchema = Joi.object({
      refreshToken: Joi.string().required().label("Refresh Token"),
  });

const getUserByIdSchema = Joi.object({
  userId: Joi.string().custom(objectId)
})

const deleteUserByIdSchema = Joi.object({
  userId: Joi.string().custom(objectId)
})

const updateUserByIdSchema = Joi.object({
  userId: Joi.string().custom(objectId)
})
module.exports = {
  rolesSchema,refreshTokenBodySchema,userSchema,getUserByIdSchema,deleteUserByIdSchema,updateUserByIdSchema
};
