
export interface ActiveIngredient {
    name: string;
    mass: number | null;
    unit: string | null;
}

export interface PriceHistory {
    value: number;
    validDate: number; // timestamp
}

export interface Identity {
    name: string;
    atc: string;
    pzn: string;
    activeIngredients: ActiveIngredient[];
    pharmformCode: string;
    atcName: string;
}

export interface Manufacturer {
    name: string;
    companyId: number;
    details: string | null;
}

export interface Pricing {
    referencePrice: number | null;
    pharmacySale: number;
    pharmacyBuy: number;
    patientPayment: number;
    priceHistory: PriceHistory[];
}

export interface Packaging {
    importFlag: number;
    unit: string;
    size: number;
    salesStatus: string;
}

export interface MMIProduct {
    id: string;
    identity: Identity;
    manufacturer: Manufacturer;
    packaging: Packaging;
    pricing: Pricing;
}
