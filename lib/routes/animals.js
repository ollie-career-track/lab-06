/* eslint-disable new-cap */ 
const router = require('express').Router();
const Animal = require('../lab-06/animal');

router
  .post('/', (req, res, next) => {
    Animal.create(req.body)
      .then(animal => res.json(animal))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Animal.findById(req.params.id)
      .then(animal => res.json(animal))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Animal.find()
      .then(animals => res.json(animals))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
      .then(animal => res.json(animal))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Animal.findByIdAndRemove(req.params.id)
      .then(animal => res.json(animal))
      .catch(next);
  });

module.exports = router;