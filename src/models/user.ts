import { Schema, model, type Document } from "mongoose";

interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[];
    friends: Schema.Types.ObjectId[];
    createdAt: Date;
};

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            trim: true,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please input a valid email address']
        },
        createdAt: {
            type: Date,
            default: Date.now,
            },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        timestamps: true,
        id: false,
    }
);

const User = model<IUser>("User", userSchema);

userSchema.virtual('friendCount').get(function (this:any) {
    return this.friends.length;
});

export default User;