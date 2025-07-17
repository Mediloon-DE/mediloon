import mongoose, { Schema, Document } from 'mongoose';

export interface IStore extends Document {
    userId: Schema.Types.ObjectId;
    name: string;
    location: string;
    createdAt: Date;
    updatedAt: Date;
}

const storeSchema = new Schema<IStore>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,

        },
        location: {
            type: String,
            required: true,
            trim: true,
            index: true,
        }
    },
    {
        timestamps: true
    });


const Store = mongoose.models.Store || mongoose.model<IStore>('Store', storeSchema);

export default Store;