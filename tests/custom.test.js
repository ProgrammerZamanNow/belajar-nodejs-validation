import Joi from "joi";

describe('Joi', function () {
    it('should can create custom validation', function () {
        const registerSchema = Joi.object({
            username: Joi.string().required().min(3).max(100).email(),
            password: Joi.string().required().min(6).max(100).custom((value, helpers) => {
                if(value.startsWith('eko')){
                    return helpers.error('password.wrong');
                }
                return value;
            }).messages({
                'password.wrong' : 'password can not start with "eko"'
            }),
            confirmPassword: Joi.string().required().min(6).max(100),
        }).custom((value, helpers) => {
            if(value.password !== value.confirmPassword){
                return helpers.error('register.password.different');
            }
            return value;
        }).messages({
            'register.password.different' : 'password and confirmPassword is different'
        });

        const request = {
            username: "eko@pzn.com",
            password: "12345eko",
            confirmPassword: "salah12345"
        };
        const result = registerSchema.validate(request, {
            abortEarly: false
        });
        console.info(result);
    });
});
