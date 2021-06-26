const router = require('express').Router();
const userService = require('../service/user');

router.use((req, res, next) => {
    console.log('user router');
    next();
});

router.get('/', (req, res, next) => userService.getAll(req, res));

router.post('/', (req, res, next) => userService.create(req, res));

router.delete('/', (req, res, next) => userService.deleteAll(req, res));

module.exports = router;