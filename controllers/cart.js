const router = require('express').Router();
const cartService = require('../service/cart');

router.use((req, res, next) => next());


router.get('/:id', (req, res) => cartService.getById(req, res));

router.get('/', (req, res) => cartService.getAll(req, res));

router.post('/', (req, res) => cartService.create(req, res));

router.delete('/:id', (req, res) => cartService.deleteById(req, res));

router.put('/:id', (req, res) => cartService.updateById(req, res));

module.exports = router;