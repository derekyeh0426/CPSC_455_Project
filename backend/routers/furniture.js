let router = require('express').Router();

router.use((req, res, next) => {
    console.log('furniture router');
    next();
});

router.get('/:id', (req, res, next) => {

});

router.get('/', (req, res, next) => {

});

router.post('/', (req, res, next) => {

});

router.delete('/:id', (req, res, next) => {

});

router.delete('/', (req, res, next) => {

});

router.put('/:id', (req, res, next) => {

});

module.exports = router;