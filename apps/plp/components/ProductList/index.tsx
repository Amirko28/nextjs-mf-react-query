import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { Cursor, PaginatedReponse, Product } from '@acme/domain';

const ProductListGrid = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, 200px);
`;

const ProductCard = dynamic(() => import('../ProductCard').then(mod => mod.ProductCard), {
  ssr: true,
});

export const fetchProducts = async ({
  limit = 10,
  skip = 0,
}: Partial<Cursor>): Promise<Product[]> => {
  const endpoint = `${process.env.NEXT_PUBLIC_PLP_URL}/api/products?limit=${limit}&skip=${skip}`;
  const response = await fetch(endpoint);
  const { products } = (await response.json()) as PaginatedReponse<Product, 'products'>;
  return products;
};

export function ProductList({ limit = 10, skip = 0 }: Partial<Cursor>) {
  const products: Product[] = [
    {
      brand: 'ahmad',
      category: 'test',
      description: 'very good',
      discountPercentage: 13,
      id: 1,
      images: [],
      price: 20,
      rating: 4,
      stock: 2,
      thumbnail: '',
      title: 'YES',
    },
  ];

  return (
    <ProductListGrid>
      {products.map(product => (
        <ProductCard
          href={`${process.env.NEXT_PUBLIC_PLP_URL}/products/${product.id}`}
          product={product}
          key={product.id}
        />
      ))}
    </ProductListGrid>
  );
}
