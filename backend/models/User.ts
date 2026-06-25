import { Request } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUserRequest extends Request {
    user?: any
}

export interface IUser extends mongoose.Document {

    name: string,
    email: string,
    password: string,
    avatar?: string,
    isAdmin: boolean,
    token?: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(entredPassword: string): Promise<boolean> 
}

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    }

}, {
    timestamps: true
});

UserSchema.pre("save", async function(next) {
    const user = this as IUser;

    if(!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    next();
})

UserSchema.methods.comparePassword = async function(entredPassword: string) {
    const user = this as IUser;
    return await bcrypt.compareSync(entredPassword, user.password);
}

const User = mongoose.model<IUser>("User", UserSchema);

export default User;