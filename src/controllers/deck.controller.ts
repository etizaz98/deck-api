import { Response, Request, NextFunction } from 'express';

import { createCards } from '../services'
export async function createDeck(_req: Request, res: Response, _next: NextFunction) {
    try {
        const deckdata = await createCards();
        res.status(201).json({ data: deckdata, error: null, message: 'cards has been created successfully!' });
    } catch (err: any) {
        console.log(`err.code`);
        if ((err as any).code && (err as any).code === '23505') {
            res.status(409).json({ data: null, error: err.stack, message: "card already exist (cards must be unique)" });
        }  else {
            res.status(500).json({ data: null, error: err.stack, message: 'Error in creating a cards!' });
        }
    }
}
