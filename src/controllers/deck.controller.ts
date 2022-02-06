import { Response, Request, NextFunction } from 'express';
import {validationSchema} from '../interfaces/validator'
import {DrawCard, CreateQuery} from '../interfaces'
import * as JOI from 'joi';
import {log} from '../log'

import { createCards,createDeck,getCards,getDeck } from '../services'
export async function createCardsController(_req: Request, res: Response, _next: NextFunction) {
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


export async function createDeckController(req: Request, res: Response, _next: NextFunction) {
    try {
        const validated = JOI.validate({ body: req.body }, validationSchema.createDeck);
        if (validated.error === null) {
            const data: CreateQuery = req.body
            console.log(data);
            
            const deckdata = await createDeck(data);
            res.status(201).json({ data: deckdata, error: null, message: 'deck has been created successfully!' });
        } else {
            log.warn({ message: validated.error.details[0].message, statusCode: 400, detail: `invalid request ${validated.error.details[0]}`, repo: 'deck-api', path: '/api/v1/deck-api/deck' });
            res.status(400).json({ data: null, error: true, message: `invalid request ${validated.error.details[0].message}` });
        }
    } catch (err: any) {
        log.error({ message: 'Error in creating a new deck!', statusCode: 500, detail: err, repo: 'deck-api', path: '/api/v1/deck-api/' });
        res.status(400).json({ data: null, error: true, message: `invalid request ${err}` });

    }
}


export async function getCardsController(req: Request, res: Response, _next: NextFunction) {
    try {
        const validated = JOI.validate({ query: req.query }, validationSchema.drawCard);
        if (validated.error === null) {
            const data: DrawCard = req.query as any
            const deckdata = await getCards(data);
            res.status(200).json({ deckdata, error: null, message: 'card has been get successfully!' });
        } else {
            log.warn({ message: validated.error.details[0].message, statusCode: 400, detail: `invalid request ${validated.error.details[0]}`, repo: 'deck-api', path: '/api/v1/deck-api/deck' });
            res.status(400).json({ data: null, error: true, message: `invalid request ${validated.error.details[0].message}` });
        }
    } catch (err) {
        log.error({ message: 'Error in getting the card!', statusCode: 500, detail: err, repo: 'deck-api', path: '/api/v1/deck-api/cards' });
    }
}

export async function getDeckController(req: Request, res: Response, _next: NextFunction) {
    try {
        const validated = JOI.validate({ query: req.query }, validationSchema.openDeck);
        if (validated.error === null) {
            const data: DrawCard = req.query as any
            const deckdata: any = await getDeck(data);
            res.status(200).json({ deckdata, error: null, message: 'deck has been get successfully!' });
        } else {
            log.warn({ message: validated.error.details[0].message, statusCode: 400, detail: `invalid request ${validated.error.details[0]}`, repo: 'deck-api', path: '/api/v1/deck-api/deck' });
            res.status(400).json({ data: null, error: true, message: `invalid request ${validated.error.details[0].message}` });
        }
    } catch (err) {
        log.error({ message: 'Error in getting a deck!', statusCode: 500, detail: err, repo: 'deck-api', path: '/api/v1/deck-api/deck' });
    }
}
