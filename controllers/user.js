const router = require('express').Router();
const userService = require('../service/user');

router.use((req, res, next) => next());


router.get('/emails', (req, res) => userService.getByEmail(req, res));

router.get('/locations', (req, res) => userService.getByLocation(req, res));

router.get('/:id/ratings', (req, res) => userService.getAllRatingsByUserId(req, res));

router.get('/:id/comments', (req, res) => userService.getAllCommentsByUserId(req, res));

router.get('/:id', (req, res) => userService.getById(req, res));

router.get('/', (req, res) => userService.getAll(req, res));

router.post('/', (req, res) => userService.create(req, res));

router.delete('/:id', (req, res) => userService.deleteById(req, res));

router.delete('/', (req, res) => userService.deleteAll(req, res));

router.put('/:buyer/rates', (req, res) => userService.rateUserById(req, res));

router.put('/:buyer/comments', (req, res) => userService.commentUserById(req, res));

router.put('/:id', (req, res) => userService.updateById(req, res));

module.exports = router;