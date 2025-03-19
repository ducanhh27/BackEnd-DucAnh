import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import slugify from 'slugify';
import { BaseModel } from 'src/core/model/base.model';

@Schema({
  timestamps: true,
  collection: 'products'
})
export class Product extends BaseModel {
    @Prop({type:Number, required: false})
    declare id:number;

    @Prop({type:String, required: false})
    name:string;

    @Prop({type:String, required: false})
    status:string;

    @Prop({type:String, required: false})
    description:string;

    @Prop({ type: Types.ObjectId, required: false, ref: 'Category' })
    categories:Types.ObjectId;

    @Prop({type:Number, required: false})
    stockQuantity:number;

    @Prop({type:String,unique: true, required: false})
    slug:string;

    @Prop({ type: Number, required: false })
    sold: number;

    @Prop({type: Number, required: false,})
    price: number;

    @Prop({type: String, required: false,})
    sku: string;

    @Prop({ required: false })
    thumbnail: string;

    @Prop({ required: false })
    images: string[];
    
    @Prop({ required: true })
    normalizedName: string;
   
}

export const ProductSchema = SchemaFactory.createForClass(Product);

const removeVietnameseTones = (str: string): string => {
  return str
    .normalize("NFD") // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
    .toLowerCase(); // Chuyển về chữ thường
};

ProductSchema.pre('save', function (next) {
  this.normalizedName = removeVietnameseTones(this.name);
  if (!this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});
