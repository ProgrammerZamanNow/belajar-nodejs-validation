import Joi from "joi";

describe('Joi', function () {
    it('should return validation error', function () {
        const usernameSchema = Joi.string().min(5).email().required();

        const result = usernameSchema.validate("ups", {
            abortEarly: false
        });
        console.info(result);

        if(result.error){
            result.error.details.forEach(detail => {
                console.info(`${detail.path} = ${detail.message}`);
            });
        }
    });
});
