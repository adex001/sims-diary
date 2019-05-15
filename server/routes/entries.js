import express from 'express';
import EntriesController from '../controller/entries';

const entriesRouter = express.Router();

entriesRouter.delete('/:entryId', EntriesController.deleteDiary);

export default entriesRouter; 