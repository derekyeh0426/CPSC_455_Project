const router = require('express').Router();
const imageService = require('../service/image');

router.use((req, res, next) => next());

router.get('/:id', (req, res) => imageService.getById(req, res));

router.get('/', (req, res) => imageService.getAll(req, res));

router.post('/', (req, res) => imageService.create(req, res));

router.delete('/:id', (req, res) => imageService.deleteById(req, res));
    
module.exports = router;