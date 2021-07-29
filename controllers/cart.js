const router = require('express').Router();
const cartService = require('../service/cart');

router.use((req, res, next) => {
    console.log('cart router');
    next();
});

router.get('/:id', (req, res, next) => cartService.getById(req, res));

router.get('/', (req, res, next) => cartService.getAll(req, res));

router.post('/', (req, res, next) => cartService.create(req, res));

router.delete('/:id', (req, res, next) => cartService.deleteById(req, res));

router.put('/:id', (req, res, next) => cartService.updateById(req, res));

module.exports = router;