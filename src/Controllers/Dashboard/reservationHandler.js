const { capacityModel } = require('../../../models/capacity');

// Add capacity for a particular date, start time, end time, and number of slots
const addCapacity = async (req, res) => {
  const { date, startTime, endTime, slots } = req.body;

  try {
    // Check if the capacity for the given date, start time, and end time already exists
    const existingCapacity = await capacityModel.findOne({
      where: {
        date,
        start_time : startTime,
        end_time : endTime,
      },
    });

    // If the capacity already exists, update the number of slots
    if (existingCapacity) {
      await existingCapacity.update({ slots });
      return res.status(200).send({
        message: 'Capacity updated successfully.',
      });
    }

    // Otherwise, create a new capacity record
    const newCapacity = await capacityModel.create({
      date,
      start_time : startTime,
      end_time : endTime,
      slots,
      reserved: 0,
    });

    return res.status(200).send({
      message: 'Capacity added successfully.',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: 'Error adding capacity. Please try again later.',
    });
  }
};

module.exports = {
  addCapacity,
};
