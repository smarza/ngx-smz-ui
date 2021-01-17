import { Store } from '@ngxs/store';

export interface FaqsRouterConfig {
    enabled: boolean;
    tag: string;
}

export interface FaqDetails {
    id: string;
    question: string;
    answer: string;
}


export interface FaqUpdate {
    id: string;
    tag: string;
    question: string;
    answer: string;
}

export interface FaqCreation {
    tag: string;
    question: string;
    answer: string;
}

export interface DbData<T>
{
    items: T;
    lastUpdated: Date | null;
}