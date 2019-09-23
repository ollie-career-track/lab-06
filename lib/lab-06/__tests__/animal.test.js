const Animal = require('../animal');
const mongoose = require('mongoose');

describe('Animal model', () => {
  it('valid model', () => {
    const data = {
      name: 'octopus',
      limbs: 8,
      hasTail: false,
      traits: {
        isFurry: false,
        canFly: false,
        breathsWater: true
      },
      diet: ['fish', 'sealife', 'idk']
    };

    const animal = new Animal(data);
    const errors = animal.validateSync();
    expect(errors).toBeUndefined();

    const json = animal.toJSON();

    expect(json).toEqual({
      ...data,
      _id: expect.any(Object),
    });
  });

  it('validates required properties', () => {
    const data = {};
    const animal = new Animal(data);

    // const errors = cat.validateSync().errors;
    const { errors } = animal.validateSync();

    expect(errors.name.kind).toBe('required');
    expect(errors.limbs.kind).toBe('required');
  });
  
  it('populates default properties', () => {
    const data = {
      name: 'octopus',
      limbs: 8,
      traits: {
        isFurry: false,
        canFly: false,
        breathsWater: true
      },
      diet: ['fish', 'sealife', 'idk']
    };

    const animal = new Animal(data);
    const err = animal.validateSync();

    expect(err).toBeUndefined();
    expect(animal.hasTail).toBe(false);
  });

  it('enforces min of 0 limbs', () => {
    const data = {
      limbs: -100
    };

    const animal = new Animal(data);
    const { errors } = animal.validateSync();
    
    expect(errors.limbs.kind).toBe('min');
  });

  it('enforces max of limbs 10', () => {
    const data = {
      limbs: 100
    };

    const animal = new Animal(data);
    const { errors } = animal.validateSync();
    
    expect(errors.limbs.kind).toBe('max');
  });

  it('enforces enum on diet', () => {
    const data = {
      diet: ['souls']
    };

    const animal = new Animal(data);
    const { errors } = animal.validateSync();
    // console.log(errors);

    expect(errors['diet.0'].kind).toBe('enum');
  });

});