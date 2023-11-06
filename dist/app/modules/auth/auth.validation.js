"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const signUpZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({
                required_error: 'First Name is Required',
            }),
            lastName: zod_1.z.string({
                required_error: 'Last  Name is Required',
            }),
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is Required',
        })
            .email('this is not a valid email'),
        address: zod_1.z.object({
            street: zod_1.z.string({
                required_error: 'Street is Required',
            }),
            city: zod_1.z.string({
                required_error: 'City is Required',
            }),
            district: zod_1.z.string({
                required_error: 'District is Required',
            }),
            division: zod_1.z.string({
                required_error: 'Divistion is Required',
            }),
            postal: zod_1.z.string({
                required_error: 'Postal is Required',
            }),
        }),
        phoneNumber: zod_1.z.string({
            required_error: 'Phone Number is Required',
        }),
        profileImage: zod_1.z.string().optional(),
    }),
});
const loginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'email is required',
        })
            .email('this is not a valid email'),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
exports.AuthValidation = {
    signUpZodSchema,
    loginZodSchema,
    refreshTokenZodSchema,
};
