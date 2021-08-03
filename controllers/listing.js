const router = require('express').Router();
const listingService = require('../service/listing');

router.use((req, res, next) => {
    console.log('listing router');
    next();
});

router.get('/createdDates', (req, res, next) => listingService.getByCreatedDateInOrder(req, res));

router.get('/types', (req, res, next) => listingService.getByType(req, res));

router.get('/:id', (req, res, next) => listingService.getById(req, res));

router.get('/', (req, res, next) => listingService.getAll(req, res));

router.post('/', (req, res, next) => listingService.create(req, res));

router.delete('/:id', (req, res, next) => listingService.deleteById(req, res));

router.put('/:id', (req, res, next) => listingService.updateById(req, res));

module.exports = router;