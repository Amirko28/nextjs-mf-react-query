import type { GetStaticPropsContext } from 'next';
import styled from 'styled-components';

import { ProductOverview, fetchProductById } from '../../components/ProductOverview';

const StyledPage = styled.div`
  min-height: calc(100vh - 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px;
  padding: 5px;
  border: 4px dashed orangered;
  border-radius: 0.25rem;
`;

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  };
}

export function Index() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.styled-components file.
   */
  return (
    <StyledPage>
      <ProductOverview />
    </StyledPage>
  );
}

export default Index;
