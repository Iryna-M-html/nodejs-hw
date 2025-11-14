import { Router } from 'express';
import {
  getAllNotes,
  getNoteById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

import {
  createNoteSchema,
  noteIdParamsSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import { celebrate } from 'celebrate';

const router = Router();

router.get('/notes', getAllNotes);

router.get('/notes/:noteId', celebrate(noteIdParamsSchema), getNoteById);

router.post('/notes', celebrate(createNoteSchema), createNote);
router.delete('/notes/:noteId', celebrate(noteIdParamsSchema), deleteNote);
router.patch('/notes/:noteId', celebrate(updateNoteSchema), updateNote);
export default router;
