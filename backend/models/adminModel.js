import mongoose, { mongo, Schema } from "mongoose";

const adminSchema = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    updateFeeAuthority: {type: Boolean, required: true},
    createFeeAuthority: {type: Boolean, required: true},
    updateResidentAuthority: {type: Boolean, required: true},
    isRoot: {type: Boolean, default: false},
});

const adminModel = mongoose.models.admin || mongoose.model('admin', adminSchema);

export default adminModel