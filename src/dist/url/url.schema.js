"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModel = void 0;
const mongoose = require("mongoose");
const urlSchema = new mongoose.Schema({
    _id: String,
    url: { type: String, unique: true, required: true },
    shortId: { type: String, unique: true },
    created_at: { type: Date, default: Date.now() },
    updated_at: { type: Date, default: Date.now() }
});
exports.UrlModel = mongoose.model('Url', urlSchema);
//# sourceMappingURL=url.schema.js.map