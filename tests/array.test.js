import Joi from "joi";

describe('Joi', function () {
    it('should can validate array', function () {
        const hobbiesSchema = Joi.array().items(
            Joi.string().required().min(3).max(100)
        ).min(1).unique();

        const hobbies = ["A", "Reading", "Coding", "Coding"];

        const result = hobbiesSchema.validate(hobbies, {
            abortEarly: false
        });
        console.info(result);
    });

    it('should can validate array of object', function () {
        const addressesSchema = Joi.array().min(1).items(Joi.object({
            street: Joi.string().required().max(200),
            city: Joi.string().required().max(100),
            country: Joi.string().required().max(100),
            zipCode: Joi.string().required().max(10)
        }));

        const addresses = [
            {
                street: "Jalan belum ada"
            }
        ];

        const result = addressesSchema.validate(addresses, {
            abortEarly: false
        });
        console.info(result);
    });
});
