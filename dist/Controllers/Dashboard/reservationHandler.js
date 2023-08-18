var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { capacityModel } = require('../../../models/capacity');
// Add capacity for a particular date, start time, end time, and number of slots
const addCapacity = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { date, startTime, endTime, slots } = req.body;
    try {
        // Check if the capacity for the given date, start time, and end time already exists
        const existingCapacity = yield capacityModel.findOne({
            where: {
                date,
                start_time: startTime,
                end_time: endTime,
            },
        });
        // If the capacity already exists, update the number of slots
        if (existingCapacity) {
            yield existingCapacity.update({ slots });
            return res.status(200).send({
                message: 'Capacity updated successfully.',
            });
        }
        // Otherwise, create a new capacity record
        const newCapacity = yield capacityModel.create({
            date,
            start_time: startTime,
            end_time: endTime,
            slots,
            reserved: 0,
        });
        return res.status(200).send({
            message: 'Capacity added successfully.',
        });
    }
    catch (err) {
        return res.status(500).send({
            message: 'Error adding capacity. Please try again later.',
        });
    }
});
module.exports = {
    addCapacity,
};
//# sourceMappingURL=reservationHandler.js.map