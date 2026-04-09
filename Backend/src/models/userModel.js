import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
    type: String,
    // Agar googleId nahi hai, tabhi password required hoga
    required: function() {
      return !this.googleId;
    }
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Taaki null values unique constraint ko break na karein
  },
    description: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
        default: undefined
    },
    resetPasswordExpire: {
        type: Date,
        default: undefined
    }
}, { timestamps: true });

// userModel.js mein model define karne se pehle
// userModel.js mein model define karne se pehle
userSchema.pre('save', async function() {
    // 1. Agar password modify nahi hua ya password exist hi nahi karta (Google Login case)
    if (!this.isModified('password') || !this.password) {
        return; // next() ki jagah sirf return karein
    }

    // 2. Password ko hash karein
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
        throw new Error(error); // Mongoose async middleware mein error throw karne par wo automatically handle ho jata hai
    }
});

const userModel = mongoose.model('users', userSchema);

export default userModel;