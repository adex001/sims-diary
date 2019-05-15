import express from 'express';
import EntriesController from '../controller/entries';
import TokenHandler from '../utilities/tokenhandler';
import trim from '../utilities/trim';
import Params from '../middlewares/params';

const entriesRouter = express.Router();

// Verify the user token
entriesRouter.use(TokenHandler.verifyToken);

// Trim data from white spaces
entriesRouter.use(trim);

// Create entry route
entriesRouter.post('/', EntriesController.createDiary);

// Modify entry route
entriesRouter.put('/:entryId', Params.paramValidator, EntriesController.updateDiary);

// Get all entries
entriesRouter.get('/', EntriesController.getEntries);

export default entriesRouter;