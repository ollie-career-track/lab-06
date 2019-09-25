const request = require('../request');
const db = require('../db');

describe('animals api', () => {
  beforeEach(() => {
    return db.dropCollection('animal');
  });

  const octopus = {
    name: 'octopus',
    limbs: 8,
    hasTail: false,
    traits: {
      isFurry: false,
      canFly: false,
      breathsWater: true
    },
    diet: ['food']
  };

  function postAnimal(animal) {
    return request
      .post('/api/animals')
      .send(animal)
      .expect(200)
      .then(({ body }) => body);
  }

  it('posts an animal', () => {
    return postAnimal(octopus)
      .then(animal => {
        expect(animal).toEqual({
          _id: expect.any(String),
          __v: 0,
          ...octopus
        });
      });
  });

  it('gets an animal by ID', () => {
    return postAnimal(octopus)
      .then(animal => {
        return request.get(`/api/animals/${animal._id}`)
          .expect(200)
          .then(({ body }) => {
            expect(body).toEqual(animal);
          });
      });
  });

  it('gets a list of animals', () => {
    return Promise.all([
      postAnimal({ name: 'octo 1', hasTail: false }),
      postAnimal({ name: 'octo 2', hasTail: false }),
      postAnimal({ name: 'octo 3', hasTail: false }),
    ])
      .then(() => {
        return request
          .get('/api/animals')
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
      });
  });

  it('updates an animal', () => {
    return postAnimal(octopus)
      .then(animal => {
        animal.hasTail = true;
        return request
          .put(`/api/animals/${animal._id}`)
          .send(animal)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.hasTail).toBe(true);
      });
  });

  it('deletes an animal', () => {
    return postAnimal(octopus)
      .then(animal => {
        return request
          .delete(`/api/animals/${animal._id}`)
          .expect(200);
      });
  });
});