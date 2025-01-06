import * as mongoose from 'mongoose';
export interface Url extends mongoose.Document {
    _id: String;
    url: String;
    shortId: String;
    created_at: Date;
    updated_at: Date;
}
export declare const UrlModel: mongoose.Model<Url, {}, {}, {}, mongoose.Document<unknown, {}, Url> & Url & Required<{
    _id: String;
}> & {
    __v: number;
}, any>;
