const router = require('express').Router();
const userService = require('../service/user');

router.use((req, res, next) => {
    console.log('user router');
    next();
});

router.get('/emails', (req, res, next) => userService.getByEmail(req, res));

router.get('/locations', (req, res, next) => userService.getByLocation(req, res));

router.get('/:id', (req, res, next) => userService.getById(req, res));

router.get('/', (req, res, next) => userService.getAll(req, res));

router.post('/', (req, res, next) => userService.create(req, res));

router.delete('/:id', (req, res, next) => userService.deleteById(req, res));

router.delete('/', (req, res, next) => userService.deleteAll(req, res));

router.put('/:id', (req, res, next) => userService.updateById(req, res));

module.exports = router;