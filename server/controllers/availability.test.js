const mongoose = require('mongoose');
const { getAvailability, setAvailability } = require('./availability');
const AvailabilityModel = require('../models/availability');

describe('availability.js', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('getAvailability', () => {
    it('should return a list of availabilities', async () => {
      const availability = new AvailabilityModel({
        hwset: 'hw2',
        availability: 200,
      });
      await availability.save();

      const res = await getAvailability({}, {
        status(statusCode) {
          expect(statusCode).toBe(200);
          return this;
        },
        json(result) {
          expect(result).toEqual([{
            hwset: 'hw2',
            availability: 200,
            _id: availability._id.toString(),
            __v: 0,
          }]);
        },
      });
    });

    it('should return 404 error if there are no availabilities', async () => {
      await AvailabilityModel.deleteMany({});
      const res = await getAvailability({}, {
        status(statusCode) {
          expect(statusCode).toBe(404);
          return this;
        },
        json(result) {
          expect(result).toEqual({ message: 'No availability found' });
        },
      });
    });
  });

  describe('setAvailability', () => {
    it('should update the availability', async () => {
      const availability1 = new AvailabilityModel({
        hwset: 'hw2',
        availability: 200,
      });
      const availability2 = new AvailabilityModel({
        hwset: 'hw3',
        availability: 150,
      });
      await availability1.save();
      await availability2.save();

      const res = await setAvailability({}, {
        status(statusCode) {
          expect(statusCode).toBe(201);
          return this;
        },
        json(result) {
          expect(result).toEqual([{
            hwset: 'hw2',
            availability: 300,
            _id: availability1._id.toString(),
            __v: 0,
          }, {
            hwset: 'hw3',
            availability: 250,
            _id: availability2._id.toString(),
            __v: 0,
          }]);
        },
      });

      const updatedAvailability1 = await AvailabilityModel.findById(availability1._id);
      expect(updatedAvailability1.availability).toBe(300);
      const updatedAvailability2 = await AvailabilityModel.findById(availability2._id);
      expect(updatedAvailability2.availability).toBe(250);
    });

    it('should return 409 error if there is an error', async () => {
      const req = {
        body: [{
          _id: 'non-existing-id',
          hwset: 'hw2',
          availability: 200,
        }],
      };
      const res = await setAvailability(req, {
        status(statusCode) {
          expect(statusCode).toBe(409);
          return this;
        },
        json(result) {
          expect(result).toEqual({ message: 'Availability update failed' });
        },
      });
    });
  });
});