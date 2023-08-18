var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { callStateModel } = require("../../../models/callState");
const getCallStates = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const callStates = yield callStateModel.findAll();
        res.send({
            status: 1,
            message: 'عملیات موفقیت أمیز بود.',
            totalCount: callStates.length,
            data: callStates
        });
    }
    catch (error) {
        res.status(500);
        res.send({
            status: 0,
            message: 'عملیات موفقیت أمیز نبود.',
        });
    }
});
module.exports = {
    getCallStates
};
//# sourceMappingURL=callStateHandler.js.map