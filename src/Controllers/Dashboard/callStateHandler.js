const { callStateModel } = require("../../../models/callState");

const getCallStates = async (req, res) => {
    try {
        const callStates = await callStateModel.findAll();
        res.send(
            {
                status: 1,
                message: 'عملیات موفقیت أمیز بود.',
                totalCount: callStates.length,
                data:callStates
            }
        )
        
    } catch (error) {
        res.status(500);
        res.send(
            {
                status:0,
                message: 'عملیات موفقیت أمیز نبود.',

            }
        )
    }
}

module.exports = {
    getCallStates
}