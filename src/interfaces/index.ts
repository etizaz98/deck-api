export interface CardsData {
	// id: string
	value: string
	suit: string
	code: string
}
export interface CreateQuery {
	type: string,
	shuffled: boolean
}

export interface DrawCard {
	count: number,
	deck: string
}

export interface OpenDeck {
	deckId: string
}


export interface CardsToDeck {
	deckId: string,
	cardId: string,
	deckposition: number,
	seen: boolean
}
