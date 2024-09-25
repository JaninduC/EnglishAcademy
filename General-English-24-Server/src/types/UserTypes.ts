import { Document } from "mongoose";

export default interface UserType extends Document {
  name: string;
  email: string;
  password: string;
  nic: string;
  mobileNumber: string;
  district: string;
}
