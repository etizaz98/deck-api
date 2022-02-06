import { Response, Request, NextFunction } from 'express';

import { log } from '../log';

export async function getDeck(_req: Request, res: Response, _next: NextFunction) {
    try {

            res.json({});
        
    } catch (err) {
        log.error({
            message: "Error in getting user profile!",
            statusCode: 500,
            detail: "Error in getting user!",
            repo: "deck-api",
            path: "/api/v1/deck",
        });
        res.status(500).json({
            data: null,
            error: (err as any).response.data,
            message: "Error in getting user profile!",
        });
    }
}
