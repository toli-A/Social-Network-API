import { Router } from 'express';
import {
    getSingleThought,
    getThought,
    createThought,
    updateThought,
    deleteThought,
} from '../../controllers/thoughtController.js';

const router = Router()

router.route('/').get(getThought).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

export { router as thoughtRouter };