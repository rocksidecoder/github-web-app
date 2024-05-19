import express from "express";
const router = express.Router();

import isAuth from "../middlewares/authentication.js";
import { loginUser, registerUser } from "../controllers/authController.js";
import { allUserRepos, userStarredRepos, starRepo, unstarRepo } from "../controllers/repoController.js";


// Auth routes 
router.post('/register', registerUser)
router.post('/login', loginUser)

// Github routes
router.get('/repo/starred', isAuth, userStarredRepos)
router.get('/repo/:username', isAuth, allUserRepos)
router.put('/repo/star', isAuth, starRepo)
router.delete('/repo/unstar', isAuth, unstarRepo)

export default router