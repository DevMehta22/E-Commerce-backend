const {Router} = require('express')
const {get_item,add_item,update_item,delete_item} = require('../controllers/itemControllers');
const router= Router();
const auth = require("../middlewares/authMiddleware");

router.get('/items',get_item);
router.post("/items",auth,add_item);
router.put('/items/:id',auth,update_item);
router.delete('/items/:id',auth,delete_item);

module.exports = router;