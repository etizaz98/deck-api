import { Router } from 'express';

import * as deckController from '../controllers';

export const deckRouter = Router();

deckRouter.post('/createcards', deckController.createDeck);

