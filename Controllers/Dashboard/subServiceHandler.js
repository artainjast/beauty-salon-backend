const { subServiceModel } = require('../../models/index');
const { requestValidator } = require('../../utils/validators');

const getSubService = async (req, res) => {
  try {
    const { text, limit, offset } = req.query;

    // Build the query conditions
    const whereCondition = {
      DELETED_AT: 0,
    };
    if (text && text.length > 0) {
      whereCondition.NAME = {
        [Op.like]: `%${text}%`,
      };
    }

    // Parse limit and offset as integers
    const parsedLimit = limit ? parseInt(limit) : undefined;
    const parsedOffset = offset ? parseInt(offset) : undefined;

    // Query the sub-services using Sequelize
    const subServices = await subServiceModel.findAll({
      attributes: ["id", "NAME", "PRICE", "is_active"],
      where: whereCondition,
      limit: parsedLimit,
      offset: parsedOffset,
    });

    res.send({
      status: 1,
      message: "سرویس های مورد نظر یافت شد.",
      totalCount: subServices.length,
      data: subServices,
    });
  } catch (error) {
    res.send({ error });
  }
};

const getSubServiceById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the sub-service by its ID
    const subService = await subServiceModel.findByPk(id);

    if (!subService) {
      // Handle the case where the sub-service is not found
      return res.status(404).json({ error: "Sub-service not found" });
    }
    res.send({
      status: 1,
      message: "سرویس مورد نظر یافت شد.",
      data: subService,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get sub-service" });
  }
};

//it just has default mainService id as 1
const addSubService = async (req , res) => {
  try {
    const { price, name } = req.body
    const isParamValid = requestValidator(price, name);
    if (!isParamValid) {
      throw 'ورودی ها ناقص است';
    }
    const unixTime = Math.floor(Date.now() / 1000);
    await subServiceModel.create({
      NAME: name,
      MAIN_SERVICE_ID: 1 ,
      PRICE : price,
      is_active : 1,
      CREATED_AT: unixTime,
      UPDATE_AT: unixTime
    });
    res.send({
      status: 1,
      message:'سرویس فرعی افزوده شد.'
    })
  } catch (error) {
    res.send({
      status: 0,
      message: error ? error : 'سرویس فرعی افزوده نشد'
    });
  }
}

const updateSubService = async (req , res) => { 

  const subServiceId = req.params.id;
  const updatedData = req.body;

  try {
    // Update the sub-service
    // Find the sub-service record by ID
    const subService = await subServiceModel.findByPk(subServiceId);
    if (!subService) {
      // Handle the case where the sub-service is not found
      throw new Error("Sub-service not found");
    }
    // Update the sub-service record with the updated data
    await subService.update(updatedData);

    // Return the updated sub-service
    res.send({
      status: 1 , 
      message : 'با موفقیت انجام شد.'
    })
  } catch (error) {
    // Handle any errors that occur during the update process
    console.error("Error updating sub-service:", error.message);
    throw error;
  }

};
const deleteSubService = () => { };

module.exports = {
    getSubService,
    getSubServiceById,
    addSubService,
    updateSubService,
    deleteSubService
}