const router = require('express').Router();
const furnitureService = require('../service/furniture');

router.use((req, res, next) => {
    console.log('furniture router');
    next();
});

router.get('/:id', (req, res, next) => furnitureService.getById(req, res));

router.get('/', (req, res, next) => furnitureService.getAll(req, res));

router.post('/', (req, res, next) => furnitureService.create(req, res));

router.delete('/:id', (req, res, next) => furnitureService.deleteById(req, res));

router.delete('/', (req, res, next) => furnitureService.deleteAll(req, res));

router.put('/:id', (req, res, next) => furnitureService.updateById(req, res));

module.exports = router;