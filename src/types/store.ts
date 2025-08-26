
export interface Store {
    id: string;
    name: string;
    name_lowercase: string;
    location: string;
    location_lowercase: string;
    userId: string;
    createdAt?: FirebaseFirestore.Timestamp;
    updatedAt?: FirebaseFirestore.Timestamp;
}
