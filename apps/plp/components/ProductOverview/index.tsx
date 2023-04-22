import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { Product } from '@acme/domain';

const ProductOverviewStyled = styled.div`
  .products {
    display: flex;
    flex-wrap: wrap;
  }

  .product {
    display: flex;
    flex-direction: column;
    padding: 16px;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
  }

  .product + .product {
    border-left: none;
  }
`;

export const fetchProductById = async (productId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_PLP_URL}/api/products/${productId}`);
  const product = (await response.json()) as Product;
  return product;
};

export function ProductOverview() {
  const router = useRouter();
  const productId = router.query.productId as string;

  const product = {
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
  };
  return (
    <ProductOverviewStyled>
      {product && (
        <div className="product">
          <div className="images">
            {product?.images?.map(imageUrl => (
              <Image
                src={imageUrl}
                alt={product.title}
                width={200}
                height={100}
                style={{ objectFit: 'contain' }}
                key={imageUrl}
              />
            ))}
          </div>

          <h4>{product.title}</h4>
          <p>{product.brand}</p>

          <div>
            <span>price: {product.price}</span> <span>rating: {product.rating}</span>
          </div>
        </div>
      )}
    </ProductOverviewStyled>
  );
}
