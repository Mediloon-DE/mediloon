
export interface Translation {
    chatTitle: string;
    welcomeTitle: string;
    welcomeMessage: string;
    inputPlaceholder: string;
    suggestionsTitle: string;
    suggestions: string[];
}


export type StringTranslationKey = Omit<keyof Translation, 'suggestions'>;