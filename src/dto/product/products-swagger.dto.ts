import { ApiProperty } from '@nestjs/swagger';

export class CreateProductSwaggerDto {
  @ApiProperty({ example: 'Hoa hồng đỏ' })
  name: string;

  @ApiProperty({ example: 'Còn hàng', required: false })
  status?: string;

  @ApiProperty({ example: 'Hoa hồng đỏ tươi đẹp và thơm', required: false })
  description?: string;

  @ApiProperty({ example: '6656e01e8a85f5d3e82e2641', description: 'ID danh mục sản phẩm (MongoDB ObjectId)' })
  categories: string;

  @ApiProperty({ example: 50, required: false })
  stockQuantity?: number;

  @ApiProperty({ example: 100000, required: false })
  price?: number;

  @ApiProperty({ example: 10, required: false })
  sold?: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Ảnh đại diện sản phẩm',
  })
  thumbnail?: any;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
    description: 'Các ảnh chi tiết sản phẩm',
  })
  images?: any[];

  @ApiProperty({ example: 'SKU123456', required: false })
  sku?: string;

  @ApiProperty({ example: 'hoa-hong-do', required: false })
  slug?: string;
}

export class UpdateProductSwaggerDto {
  @ApiProperty({ example: 'Hoa hồng vàng', required: false })
  name?: string;

  @ApiProperty({ example: 'Hết hàng', required: false })
  status?: string;

  @ApiProperty({ example: 'Hoa hồng vàng tượng trưng cho tình bạn', required: false })
  description?: string;

  @ApiProperty({ example: '6656e01e8a85f5d3e82e2641', required: false })
  categories?: string;

  @ApiProperty({ example: 30, required: false })
  stockQuantity?: number;

  @ApiProperty({ example: 120000, required: false })
  price?: number;

  @ApiProperty({ example: 5, required: false })
  sold?: number;

  @ApiProperty({
    type: 'string',
    format: 'binary',
    required: false,
    description: 'Ảnh đại diện mới',
  })
  thumbnail?: any;

  @ApiProperty({
    type: 'array',
    items: { type: 'string', format: 'binary' },
    required: false,
    description: 'Các ảnh mới (nếu có)',
  })
  images?: any[];

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    required: false,
    description: 'Tên URL ảnh cần xóa khỏi sản phẩm',
    example: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  })
  deleteImages?: string[];

  @ApiProperty({
    type: 'array',
    items: { type: 'string' },
    required: false,
    description: 'URL các ảnh thêm vào bằng string (không upload)',
    example: ['https://example.com/new-image.jpg'],
  })
  imagesString?: string[];

  @ApiProperty({ example: 'hoa-hong-vang', required: false })
  slug?: string;

  @ApiProperty({ example: 'SKU654321', required: false })
  sku?: string;
}
