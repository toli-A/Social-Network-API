import { Router } from 'express';
import { getAllUsers, getOneUser, createUser, updateUser, 
//deleteUser, 
addFriend, deleteFriend } from '../../controllers/userController.js';
const router = Router();
router.route('/').get(getAllUsers).post(createUser);
router.route('/:userId').get(getOneUser).put(updateUser); //delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
export { router as userRouter };
