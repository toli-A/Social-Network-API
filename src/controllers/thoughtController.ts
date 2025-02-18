import { Request, Response } from 'express';
import Thought from '../models/thought.js'
import User from '../models/user.js';

//GETS
export const getThought = async (_req: Request, res: Response) => {

    try {
        const thoughts = await Thought.find();
        return res.json(thoughts);
    } catch (err) {
        return res.status(500).json(err);
    };
};

export const getSingleThought = async (req: Request, res: Response) => {

    try {
        const thoughts = await Thought.findOne({ _id: req.params.thoughtId })

        if (!thoughts) {
            return res.status(404).json({ message: 'Thoughts Not Found' });
        }

        res.json(thoughts)
        return;
    } catch (err) {
        return res.status(500).json(err);
    };
};

export const createThought = async (req: Request, res: Response) => {

    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $push: { thoughts: thought._id } },
            { runValidators: true, new: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User Not Found' });
        }
        return res.json({ message: 'Thought Created' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    };
};

export const updateThought = async (req: Request, res: Response) => {

    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought Not Found' });
        }
        res.json(thought);
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    };
};

export const deleteThought = async (req: Request, res: Response) => {

    try {
        const thought = await Thought.findOneAndDelete(
            { _id: req.params.thoughtId },
            { new: true }
        );
        if (!thought) {
            return res.status(404).json({ message: 'Thought Not Found' });
        }
        const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { runValidators: true, new: true }
        );
        if (!user) {
            return res
                .status(404)
                .json({ message: 'User Not Found' });
        };
        return res.json({ message: 'Thought Deleted' });
    } catch (err) {
        return res.status(500).json(err);
    };
};
