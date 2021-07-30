const router = require('express').Router();
const imageService = require('../service/image');

router.use((req, res, next) => {
    console.log('image router');
    next();
});

router.get('/:id', (req, res, next) => imageService.getById(req, res));

router.get('/', (req, res, next) => imageService.getAll(req, res));

router.post('/', (req, res, next) => imageService.create(req, res, next));

router.delete('/:id', (req, res, next) => imageService.deleteById(req, res));
    
module.exports = router;