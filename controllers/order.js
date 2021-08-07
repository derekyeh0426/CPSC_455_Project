const router = require('express').Router();
const orderService = require('../service/order');

router.use((req, res, next) => {
    console.log('order router');
    next();
});

router.get('/:id', (req, res, next) => orderService.getById(req, res));

router.get('/', (req, res, next) => orderService.getAll(req, res));

router.get('/user/:id', async (req, res, next) => orderService.getByUserId(req, res));

router.post('/', (req, res, next) => orderService.create(req, res));

router.delete('/:id', (req, res, next) => orderService.deleteById(req, res));


module.exports = router;