const {Router} = require('express')
const {get_cartItems,add_cartItems,delete_cartItems} = require('../controllers/cartControllers');
const router= Router();
const auth = require("../middlewares/authMiddleware");

router.get('/cart/:id',auth,get_cartItems);
router.post('/cart/:id',auth,add_cartItems);
router.delete('/cart/:userId/:itemId',auth,delete_cartItems);

module.exports = router;