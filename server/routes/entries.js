import express from 'express';
import EntriesController from '../controller/entries';
import TokenHandler from '../utilities/tokenhandler';
import trim from '../utilities/trim';

const entriesRouter = express.Router();

// Verify the user token
entriesRouter.use(TokenHandler.verifyToken);

// Trim data from white spaces
entriesRouter.use(trim);

// Create entry route


// Modify entry route
entriesRouter.put('/:entryId', EntriesController.updateDiary);

export default entriesRouter;