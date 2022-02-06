import { DeckToCards ,connection } from '../config'
import { CardsData} from '../interfaces'
import { log } from '../log';

export const getDeck = async (data: any) => {
    const { deckId } = data

    console.log(deckId);
    
    // const CardsRepository = connection.getRepository(Cards);
    try {				
            const CardsData: CardsData[] = await connection.getRepository(DeckToCards).
            query(`with data as (  
                select c.* from deck_to_cards as dc 
                inner join cards as c on dc."cardId" = c.id 
                where
               "deckId" = '${deckId}' and seen=false
               order by deckposition ASC
               )
                 select json_agg(data.*) as cards from data`)	
                 
                 const DeckInfo = await connection.getRepository(DeckToCards).
                 query(`select * from deck where id = '${deckId}'`)	
                 const {cards} = CardsData[0] as any
                 console.log(DeckInfo);
                 const {type,shuffled} = DeckInfo[0] as any
        return {deckId,remaining: cards.length, type,shuffled, cards}
    } catch (err) {
        log.error('Error in creating a new Cards:', (err as any).stack);
        throw err;
    }
}