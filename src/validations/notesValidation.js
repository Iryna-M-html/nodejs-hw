import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (isValidObjectId(value)) {
    return helpers.message(`ObjectId ${value} with invalid format`);
  }
  return value;
};
export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(30).required().message({
      'string.base': 'Title must be a string',
      'string.min': 'Title should have at least {#limit} characters',
      'string.max': 'Title should have at most {#limit} characters',
      'any.required': 'Title is required',
    }),
  }),
  content: Joi.string().trim().default(''),
  tag: Joi.string
    .valid(
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo',
    )
    .default('Todo'),
};

export const noteIdParamsSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.custom(objectIdValidator).required(),
  }),
};

export const updateNoteSchema = {
  ...noteIdParamsSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(3).max(30),
    content: Joi.string().trim().default(''),
    tag: Joi.string.valid(
      'Work',
      'Personal',
      'Meeting',
      'Shopping',
      'Ideas',
      'Travel',
      'Finance',
      'Health',
      'Important',
      'Todo',
    ),
  }),
};
