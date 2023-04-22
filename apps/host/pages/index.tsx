import type { GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import { injectScript } from '@module-federation/utilities';
import { lazy } from 'react';
const isServer = typeof window === 'undefined';
const makeDynamicContainer = (url: string, global: string, componentName: string) => {
  return injectScript({
    global: global,
    url: `${url}/_next/static/${isServer ? 'ssr' : 'chunks'}/remoteEntry.js`,
  }).then((container: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    console.log(container);
    return container.get(componentName).then(factory => {
      return factory();
    });
  });
};

// const DynamicHeader = lazy(() =>
//   makeDynamicContainer('http://localhost:3002', 'header', './Header'),
// );

// const DynamicButton = lazy(() =>
//   makeDynamicContainer('http://localhost:3003', 'button', './Button'),
// );

const DynamicPlpProductsPage = lazy(() =>
  makeDynamicContainer('http://localhost:3001', 'remote', './Div'),
);

const StyledPage = styled.div`
  align-items: center;
  margin: 15px;
  padding: 15px;
  border: 4px dashed orangered;
  border-radius: 0.25rem;
`;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = DynamicPlpProductsPage;

  if (page.getServerSideProps) {
    return page.getServerSideProps(context);
  }

  return {
    props: {},
  };
}

export function Page() {
  return (
    <StyledPage>
      {/* <DynamicHeader> */}
      {/* <DynamicButton onClick={() => alert('You clicked on a header button')}> */}
      Hello Button
      {/* </DynamicButton> */}
      {/* </DynamicHeader> */}
      <DynamicPlpProductsPage />
    </StyledPage>
  );
}

export default Page;
