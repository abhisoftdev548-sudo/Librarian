import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    refreshTokenHash: {
        type: String,
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    userAgent: {
        type: String,
        required: true
    },
    revoked: {
        type: Boolean,
        default: false
    },
    lastUsed: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
sessionSchema.index({lastUsed: 1}, {expireAfterSeconds: 7 * 24 * 60 * 60});
const sessionModel = mongoose.model("sessions", sessionSchema);
export default sessionModel;