const {Router} = require('express')
const {get_orders,checkout} = require('../controllers/orderControllers');
const router= Router();
const auth = require("../middlewares/authMiddleware");


router.get('/order/:id',auth,get_orders);
router.post('/order/:id',auth,checkout);

module.exports = router;