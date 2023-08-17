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
        
    }
}

module.exports = {
    getCallStates
}