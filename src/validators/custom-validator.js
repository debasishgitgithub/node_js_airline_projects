const checkExists = (Model, fieldName, label, where = {}) => {
    return async (value) => {
        const data = await Model.findOne({
            where: {
                [fieldName]: value,
                 ...where
            }
        });

        if (!data) {
            throw new Error(`${label} not found`);
        }
        return true;
    };
};

module.exports = { checkExists };