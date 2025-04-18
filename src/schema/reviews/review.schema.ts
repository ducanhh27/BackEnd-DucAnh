import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { BaseModel } from 'src/core/model/base.model';
import { Users } from '../users/users.schema';
import { Product } from '../products/products.schema';
import { Orders } from '../order/orders.schema';

@Schema({ timestamps: true })
export class Reviews extends BaseModel {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
    user: Users;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true })
     product: Product;

     @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'orders', required: true })
     order: Orders;
    
     @Prop({ enum: ['initial', 'additional'], default: 'initial' })
     type: 'initial' | 'additional';

     @Prop({ required: true, min: 1, max: 5 })
     rating: number;
     
     @Prop()
     comment: string;

}

export const ReviewSchema = SchemaFactory.createForClass(Reviews);