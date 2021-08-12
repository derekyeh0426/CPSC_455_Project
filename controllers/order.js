const router = require('express').Router();
const orderService = require('../service/order');

router.use((req, res, next) => next());


router.get('/:id', (req, res) => orderService.getById(req, res));

router.get('/', (req, res) => orderService.getAll(req, res));

router.get('/user/:id', (req, res) => orderService.getByUserId(req, res));

router.post('/', (req, res) => orderService.create(req, res));

router.delete('/:id', (req, res) => orderService.deleteById(req, res));


module.exports = router;