
import { faker } from '@faker-js/faker';
import { Product } from './product.model';


export const mockProduct = (): Product => ({
  id: faker.datatype.uuid(),
  title: faker.commerce.productName(),
  price: parseInt(faker.commerce.price(), 10),
  description: faker.commerce.productDescription(),
  category: {
    id: faker.datatype.number(),
    name: faker.commerce.department(),
  },
  images: [
    faker.image.imageUrl(),
    faker.image.imageUrl(),
  ],
});

export const mockProducts = (size: number = 10): Product[] => {
  const products: Product[] = [];
  for (let i = 0; i < size; i++) {
    products.push(mockProduct());
  }
  return [...products];
}
