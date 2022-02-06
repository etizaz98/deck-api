import { Router } from 'express';

import * as deckController from '../controllers';

export const deckRouter = Router();

deckRouter.post('/createcards', deckController.createDeckController);


deckRouter.post('/', deckController.createDeckController);

deckRouter.get('/cards', deckController.getCardsController);


deckRouter.get('/opendeck', deckController.getDeckController);