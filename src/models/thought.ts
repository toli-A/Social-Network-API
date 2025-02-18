import { Schema, model, ObjectId, type Document, Types } from 'mongoose';

interface IReaction extends Document {
    reactionId: ObjectId;
    reactionText: string;
    username: string;
    createdAt: Date;
}

interface IThought extends Document {
    thoughtText: string;
    username: string;
    reactions: ObjectId[]
    createdAt: Date;
}

const reactionSchema = new Schema <IReaction> (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            }
        },
        {
            toJSON: {
                getters: true,
                virtuals: true
            },
            timestamps: true,
            _id: false
        }
        
);
const thoughtSchema = new Schema<IThought> (
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        },
        timestamps: true,
        _id: false
    }
);
const Thought = model('Thought', thoughtSchema);

thoughtSchema.virtual('reactionCount').get(function (this: any) {
    return this.reactions.length;
});
export default Thought;