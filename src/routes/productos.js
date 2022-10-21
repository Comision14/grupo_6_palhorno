var express = require('express');
var router = express.Router();
const productValidactor = require('../validations/productValidactor');
const {productos, detalles, crear, modificar, actualizar, borrar, create} = require('../controllers/productosController');

router.get('/', productos);
router.get('/detalles/:id', detalles);
router.get('/crear', crear);
router.post('/crear', create);
router.get('/modificar/:id', modificar);
router.post('/actualizar/:id', actualizar);/*put*/
router.delete('/borrar/:id', borrar);

module.exports = router;