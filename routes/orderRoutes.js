const {Router} = require('express')
const {get_orders,checkout} = require('../controllers/orderControllers');
const router= Router();


router.get('/order/:id',get_orders);
router.post('/order/:id',checkout);

module.exports = router;