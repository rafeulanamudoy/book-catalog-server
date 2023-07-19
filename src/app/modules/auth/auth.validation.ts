import { z } from 'zod'

const signUpZodSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: 'Password is Required',
    }),
    name: z.object({
      firstName: z.string({
        required_error: 'First Name is Required',
      }),
      lastName: z.string({
        required_error: 'Last  Name is Required',
      }),
    }),
    email: z
      .string({
        required_error: 'Email is Required',
      })
      .email('this is not a valid email'),
    address: z.object({
      street: z.string({
        required_error: 'Street is Required',
      }),
      city: z.string({
        required_error: 'City is Required',
      }),
      district: z.string({
        required_error: 'District is Required',
      }),
      division: z.string({
        required_error: 'Divistion is Required',
      }),
      postal: z.string({
        required_error: 'Postal is Required',
      }),
    }),
    phoneNumber: z.string({
      required_error: 'Phone Number is Required',
    }),
    profileImage: z.string().optional(),
  }),
})
const loginZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'email is required',
      })
      .email('this is not a valid email'),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})
export const AuthValidation = {
  signUpZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
}
