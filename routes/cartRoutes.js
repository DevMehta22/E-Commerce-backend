const {Router} = require('express')
const {get_cartItems,add_cartItems,delete_cartItems} = require('../controllers/cartControllers');
const router= Router();

router.get('/cart/:id',get_cartItems);
router.post('/cart/:id',add_cartItems);
router.delete('/cart/:userId/:itemId',delete_cartItems);

module.exports = router;