import mongoose, { mongo, Schema } from "mongoose";

const residentSchema = new Schema({
    room: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true, min: 18},
    phone: {type: String, required: true, unique: true},
    cccd: {type: String, required: true, unique: true},
    image: {type: String, required: true},
    numMember: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
});

const residentModel = mongoose.models.resident || mongoose.model('resident', residentSchema);

export default residentModel