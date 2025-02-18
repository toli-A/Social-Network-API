import { Schema, model } from "mongoose";
;
const userSchema = new Schema({
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
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    timestamps: true,
    id: false,
});
const User = model("User", userSchema);
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});
export default User;
