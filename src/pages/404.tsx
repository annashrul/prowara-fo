import React from 'react';
import styled from 'styled-components';

import Layout from 'Layouts';
import File64 from 'components/Common/File64'

const ErrorStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  small {
    margin-bottom: 3rem;
  }
  h1 {
    margin-bottom: 0.5rem;
  }
  a {
    max-width: 20rem;
  }
`;
export default function Error(): JSX.Element {
  return (
    <Layout title="404 Page Not Found">
          <ErrorStyle>
            <h1>404 Page Not Found</h1>
            <small>The page you were looking for doesn&apos;t exist</small>
              Take me home
        </ErrorStyle>
            <File64/>
    </Layout>
  );
}
