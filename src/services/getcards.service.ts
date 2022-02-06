import { DeckToCards, connection } from '../config'
import {log} from '../log'

export const getCards = async (data: any) => {
    const { count, deck } = data
    // const CardsRepository = connection.getRepository(Cards);
    try {				
            const CardsData: any[] = await connection.getRepository(DeckToCards).
            query(`with data as (  
                select c.* from deck_to_cards as dc inner join cards as c on dc."cardId" = c.id where
               "deckId" = '${deck}' and seen=false
               order by deckposition desc limit ${count}
               )
                 select json_agg(data.*) as cards from data `)

                 await connection.getRepository(DeckToCards).
                 query(`
                 UPDATE deck_to_cards 
                 SET seen=true
               WHERE id in ( select id from deck_to_cards  where
               "deckId" = '${deck}' and seen=false
               order by deckposition desc limit ${count})
                     `)	 

        return CardsData
    } catch (err) {
        log.error('Error in creating a new Cards:', (err as any).stack);
        throw err;
    }
}