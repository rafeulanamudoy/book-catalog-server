import mongoose, { Model } from 'mongoose'

export type IUser = {
  name: {
    firsName: string
    lastName: string
  }
  profileImage?: string
  password: string
  email: string
  phoneNumber: string
  address: {
    street: string
    city: string
    district: string
    division: string
    postal: string
  }
}

export type IUserExistReturn = {
  _id: mongoose.Types.ObjectId
  email: string

  password: string
}
export type ILoginUser = {
  email: string
  password: string
}
export type ILoginUserResponse = {
  refreshToken?: string
  accessToken: string
  email: string
}
export type IRefreshTokenResponse = {
  accessToken: string
}

export type UserModel = {
  isUserExist(
    email: string
  ): Promise<Pick<IUserExistReturn, 'email' | 'password' | '_id'>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
} & Model<IUser>
