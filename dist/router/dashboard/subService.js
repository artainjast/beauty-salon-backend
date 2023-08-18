const { getSubService, getSubServiceById, addSubService, updateSubService } = require("../../Controllers/Dashboard/subServiceHandler");
const router = require("express").Router();
router.get('/', getSubService);
router.get('/:id', getSubServiceById);
router.post('/', addSubService);
router.put('/:id', updateSubService);
router.delete('/:id', updateSubService);
module.exports = { subServiceDashboardRouter: router };
//# sourceMappingURL=subService.js.map