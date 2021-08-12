const router = require('express').Router();
const listingService = require('../service/listing');

router.use((req, res, next) => next());

router.get('/users/:id', (req, res) => listingService.getByUserId(req, res));

router.get('/createdDates', (req, res) => listingService.getByCreatedDateInOrder(req, res));

router.get('/types', (req, res) => listingService.getByType(req, res));

router.get('/:id', (req, res) => listingService.getById(req, res));

router.get('/', (req, res) => listingService.getAll(req, res));

router.post('/', (req, res) => listingService.create(req, res));

router.delete('/:id', (req, res) => listingService.deleteById(req, res));

router.put('/:id', (req, res) => listingService.updateById(req, res));

module.exports = router;