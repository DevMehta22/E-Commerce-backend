const {Router} = require('express')
const {get_item,add_item,update_item,delete_item} = require('../controllers/itemControllers');
const router= Router();

router.get('/items',get_item);
router.post("/items",add_item);
router.put('/items/:id',update_item);
router.delete('/items/:id',delete_item);

module.exports = router;