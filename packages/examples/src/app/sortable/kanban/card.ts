export interface Card {
    id: number;
    title: string;
    isCopy?: boolean;
}

export type Cards = ReadonlyArray<Card>;

export interface ScheduledCard {
    id: number;
    title: string;
}

export type ScheduledCards = ReadonlyArray<ScheduledCard>;
