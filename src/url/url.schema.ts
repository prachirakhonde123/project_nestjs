import * as mongoose from 'mongoose'

export interface Url extends mongoose.Document {
    _id : String,
    url : String,
    shortId : String,
    created_at : Date,
    updated_at : Date
}

const urlSchema = new mongoose.Schema({
    _id : String,
    url : {type : String, unique : true, required : true},
    shortId : {type : String, unique : true},
    created_at : {type : Date, default : Date.now()},
    updated_at : {type : Date, default : Date.now()}
})

export const UrlModel = mongoose.model<Url>('Url',urlSchema);