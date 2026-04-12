import { Types, Document } from "mongoose";

declare global {
  interface IUser {
    username: string;
    email: string;
    password?: string;
    googleId?: string;
    description?: string;
    verified: boolean;
    resetPasswordToken?: string;
    resetPasswordExpire?: Date;
  }

  interface IUserDocument extends IUser, Document {
    comparePassword(candidatePassword: string): Promise<boolean>;
    _id: Types.ObjectId;
  }

  interface MyTokenPayload {
    id: string;
    iat?: number;
    exp?: number;
  }
}

export {};
