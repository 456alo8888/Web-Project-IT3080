import mongoose, { mongo, Schema } from "mongoose";

const feeSchema = new Schema({
    name: { type: String, required: true, index: true},
    feeType: {
        type: String, 
        required: true, 
        enum: ['BAT_BUOC', 'HOA_DON', 'TU_NGUYEN'],
    },
    feepayInfo: {
        type: [{
            room: {
                type: String,
                required: true,  // Room is required in each cost entry
                index: true,
            },
            cost: {
                type: Number,
                required: true,
                min: 0,
            },
            payed: {
                type: Number,
                default: 0,
                min: 0,
            },
        }],
        required: true  // The cost array itself is required
    },
    deadline: { type: Date, default: Date.now },
}, { timestamps: true });

const feeModel = mongoose.models.fee || mongoose.model('fee', feeSchema);

export default feeModel