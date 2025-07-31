import mongoose, { Schema, Document } from 'mongoose';

export interface IProdect extends Document {
    storeId: Schema.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    imageUrl: string;
    createdAt: Date;
    updatedAt: Date;
}

const productSchema = new Schema<IProdect>(
    {
        storeId: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
            required: true,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0,
        },
        imageUrl: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true
    });


const Product = mongoose.models.Product || mongoose.model<IProdect>('Product', productSchema);

export default Product;