const router = require('express').Router();
const furnitureService = require('../service/furniture');

router.use((req, res, next) => next());

router.get('/:id', (req, res) => furnitureService.getById(req, res));

router.get('/', (req, res) => furnitureService.getAll(req, res));

router.post('/', (req, res) => furnitureService.create(req, res));

router.delete('/:id', (req, res) => furnitureService.deleteById(req, res));

router.delete('/', (req, res) => furnitureService.deleteAll(req, res));

router.put('/:id', (req, res) => furnitureService.updateById(req, res));

module.exports = router;