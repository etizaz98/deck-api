import { Cards,Deck,DeckToCards, connection } from '../config'
import {log} from '../log'

export const createDeck = async (data: any) => {
    const { type, shuffled } = data
    // const CardsRepository = connection.getRepository(Cards);
    try {
        const deck: any = {
            type,
            shuffled
        }
        const remaining: number = type === 'FULL' ? 52 : 36
        const { raw } = await connection
            .createQueryBuilder()
            .insert()
            .into(Deck)
            .values(deck)
            .execute();


        const CardsData: any[] = await connection.getRepository(Cards).find({ take :remaining})

        if (shuffled) {

            for (let i = 0; i < 500; i++) {
                let location1 = Math.floor((Math.random() * CardsData.length));
                let location2 = Math.floor((Math.random() * CardsData.length));
                let tmp = CardsData[location1];

                CardsData[location1] = CardsData[location2];
                CardsData[location2] = tmp;
            }
        }

        const cardsToDeck:any[] = CardsData.map((card: any, i: number) => ({ deckId: (raw[0].id as any), cardId: (card as any).id, deckposition: i + 1, seen: false }))

        // const { raw: inserted } = 
        await connection
            .createQueryBuilder()
            .insert()
            .into(DeckToCards)
            .values(cardsToDeck)
            .execute();
        return {
                "deckId": raw[0].id,
                type,
                shuffled,
                remaining
            // raw[0]
        };
    } catch (err) {
        log.error('Error in creating a new Cards:', (err as any).stack);
        throw err;
    }
}