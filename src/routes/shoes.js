const express = require('express');
const router = express.Router();

const shoesController = require('../app/controllers/ShoesController');
router.get('/list', shoesController.list);
router.post('/action-form',shoesController.handleActionForm);
router.get('/create', shoesController.create);
router.post('/store', shoesController.store);
router.get('/:id/update', shoesController.update);
router.patch('/:id/recover', shoesController.recover);
router.put('/:id', shoesController.put);
router.get('/restore', shoesController.restore);
router.delete('/:id', shoesController.destroy);
router.delete('/:id/force', shoesController.forceDel);
router.get('/:slug', shoesController.slug);
router.get('/', shoesController.index);

module.exports = router;
