import * as mongoose from "mongoose";
import db from "../lib/maindb";
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    roleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles',
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    gender: {
        type: String,
    },
    timestamp: {type: Date, default: Date.now},
});

const model = db.model("Users", usersSchema);

export default model;
