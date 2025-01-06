import * as mongoose from 'mongoose';
export interface User extends mongoose.Document {
    _id: String;
    username: string;
    password: string;
    email: string;
    created_at: Date;
    updated_at: Date;
}
export declare const UserModel: mongoose.Model<User, {}, {}, {}, mongoose.Document<unknown, {}, User> & User & Required<{
    _id: String;
}> & {
    __v: number;
}, any>;
