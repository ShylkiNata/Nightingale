const express = require('express');
const router = express.Router();
const employeeService = require('./employee.service');

// routes
router.post('/create', create);
router.post('/search', search);
router.get('/', read);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function read(req, res, next) {
    employeeService.read()
        .then(employees => res.json(employees))
        .catch(err => next(err));
}
function search(req, res, next) {
    employeeService.search(req.body)
        .then(employees => res.json(employees))
        .catch(err => next(err));
}

function create(req, res, next) {
    employeeService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    employeeService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    employeeService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}