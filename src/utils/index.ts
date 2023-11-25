import {TEMPLATE_PRODUCT} from '../constant';
import {IProduct} from '../types';

export function generateObjects(numObjects: number): IProduct[] {
  const objects: IProduct[] = [];
  for (let i = 1; i <= numObjects; i++) {
    const newObj: IProduct = {
      id: i,
      name: `${i}: ${TEMPLATE_PRODUCT.name}`,
      description: `${i}: ${TEMPLATE_PRODUCT.description}`,
      price: Math.floor(Math.random() * TEMPLATE_PRODUCT.price),
    };
    objects.push(newObj);
  }
  return objects;
}
