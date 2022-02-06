import { Router } from 'express';

import * as deckController from '../controllers';

export const deckRouter = Router();

deckRouter.get('/', deckController.getDeck);

