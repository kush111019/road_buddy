const express = require("express");
const router = express.Router();
const userController = require("../../controllers/admin/users");
const validateRequest = require("../../middlewares/validation");
const {rolesSchema,refreshTokenBodySchema,userSchema,getUserByIdSchema,deleteUserByIdSchema,updateUserByIdSchema} = require("../../validations/admin/rolesSchema")
const authMiddleware1 = require('../../middlewares/auth');



router.post('/role',validateRequest(rolesSchema),userController.createRole);

router.post('/signUp',validateRequest(userSchema),userController.signUp);

router.post("/signIn",userController.signIn)
router.get('/test',authMiddleware1.authMiddleware,userController.testMe)

router.get('/userById',authMiddleware1.authMiddleware,validateRequest(getUserByIdSchema),userController.getUserById)

router.put("/userById",authMiddleware1.authMiddleware,validateRequest(updateUserByIdSchema),userController.updateUserById);

router.delete("/userById",authMiddleware1.authMiddleware,validateRequest(deleteUserByIdSchema),userController.deleteUserById);

module.exports = router;