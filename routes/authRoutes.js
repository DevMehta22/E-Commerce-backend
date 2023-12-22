const {Router} = require('express');
const {login,signup,get_user}= require('../controllers/userControllers')
const router = Router();
const auth = require('../middlewares/authMiddleware');

router.post('/register',signup);
router.post("/login", login);
router.get("/user",auth,get_user);

module.exports = router


