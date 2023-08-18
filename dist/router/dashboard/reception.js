const router = require("express").Router();
const { addReception, editReception, deleteReception, getReception, getSpecificReception, } = require("../../Controllers/Dashboard/receptionHandler");
router.get("/", getReception);
router.get('/:id', getSpecificReception);
router.post("/", addReception);
router.put("/", editReception);
router.delete("/:id", deleteReception);
module.exports = {
    receptionDashboardRouter: router,
};
//# sourceMappingURL=reception.js.map