import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import type { NextFunction } from "express";



const userSchema = new mongoose.Schema<IUserDocument>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    password: {
    type: String,
    // Agar googleId nahi hai, tabhi password required hoga
    required: function(this: IUserDocument):boolean {
      return !this.googleId;
    },
    select: false
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
userSchema.pre<IUserDocument>('save', async function() {
    // Agar password change nahi hua hai, toh aage badh jao
    if (!this.isModified('password')) {
        return;
    }

    // Agar password field khali hai (Google User), toh bhi aage badh jao
    if (!this.password) {
        return;
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        ;
    } catch (error: any) {
        throw new Error(error);
    }
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {

    if (!this.password){
        console.log("this pass", this.password);
        console.log("candidate pass", candidatePassword);
        return false;
    }  // Agar password hi nahi hai (Google User), toh seedha false
    return await bcrypt.compare(candidatePassword, this.password)
}


const userModel: mongoose.Model<IUserDocument> = mongoose.models.user || mongoose.model<IUserDocument>('user', userSchema);

export default userModel;