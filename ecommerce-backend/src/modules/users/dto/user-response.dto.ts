import { ObjectId } from "mongoose";
import { Gender } from "../enum/gender.enum";
import { UserStatus } from "../enum/user-status.enum";
import { UserType } from "../enum/user-type.enum";

export class UserResponseDto {
    _id: any;
    username: string;
    email: string;
    phoneNumber: string;
    phoneCode: string;
    name: string;
    gender: Gender;
    image: string;
    personalKey: string;
    userType: UserType;
    status: UserStatus;
}