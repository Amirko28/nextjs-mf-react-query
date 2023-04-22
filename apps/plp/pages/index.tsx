import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { ProductList, fetchProducts } from '../components/ProductList';

const StyledPage = styled.div`
  min-height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  padding: 15px;
  border: 4px dashed ${props => props.color || 'orangered'};
  border-radius: 0.25rem;
`;

export interface PageProps {
  color?: string;
}

// note that products data are not extracted from the page props
export function Page(props?: PageProps) {
  const router = useRouter();

  const limit = router.query.limit ? +router.query.limit : 10;
  const skip = router.query.skip ? +router.query.skip : 0;

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage color={props?.color}>
      <ProductList limit={limit} skip={skip} />
    </StyledPage>
  );
}

export default Page;
