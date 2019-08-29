import * as mongoose from "mongoose";
import db from "../lib/maindb";
const Schema = mongoose.Schema;

const rolesSchema = new Schema({
    roleName: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    roleNumber: {
        type: Number,
        required: true,
        unique: true
    },
    active: {
        type: Boolean,
        default: true,
    },
    timestamp: {type: Date, default: Date.now},
});

const model = db.model("Roles", rolesSchema);

export default model;
