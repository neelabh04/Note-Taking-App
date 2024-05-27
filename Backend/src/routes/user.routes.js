import {Router} from 'express'
import { loginUser, registerUser, logoutUser, refreshAccessToken } from '../controllers/user.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/refresh-token").post(refreshAccessToken)

// secured route
router.route("/logout").post(verifyJWT, logoutUser)


export default router;