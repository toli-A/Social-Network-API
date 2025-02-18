import { User } from "../models/index.js";
export const getAllUsers = async (_req, res) => {
    try {
        const users = await User.find().populate('friends').populate('thoughts');
        res.json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const getOneUser = async (req, res) => {
    try {
        const users = await User.findOne({ _id: req.params.userId }).select('-_v').populate('friends').populate('thoughts');
        if (!users) {
            res.status(400).json({ message: 'No user found' });
        }
        else {
            res.json(users);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const createUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    }
    catch (err) {
        res.status(500).json(err);
    }
};
export const updateUser = async (req, res) => {
    try {
        const users = await User.findOneAndUpdate({ _id: req.params.userId }, { $set: req.body }, { runValidators: true, new: true });
        if (!users) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(users);
        return;
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
};
/*export const deleteUser = async (req:Response, res: Response) => {
    try {
        const users = await User.findOne({ _id: req.params.userId});
        const deleteUser = await User.findOneAndDelete({ _id: users?._id})

        if (!deleteUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted'});
    } catch (err) {
        res.status(500).json(err);
    }; return;
}*/
export const addFriend = async (req, res) => {
    try {
        const addFriend = await User.findOne({ _id: req.params.friendId });
        if (!addFriend) {
            return res.status(404).json({ message: 'No Friend Found' });
        }
        const addedFriend = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } });
        if (!addedFriend) {
            return res.status(404).json({ message: 'Invalid User' });
        }
        res.json({ message: 'Friend added' });
    }
    catch (err) {
        res.status(500).json(err);
        return;
    }
    return;
};
export const deleteFriend = async (req, res) => {
    try {
        const deleteFriend = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!deleteFriend) {
            return res.status(404).json({ message: 'No Friend Found' });
        }
        res.json({ message: 'Friend deleted' });
    }
    catch (err) {
        res.status(500).json(err);
    }
    ;
    return;
};
