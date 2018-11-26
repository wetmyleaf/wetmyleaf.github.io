import React from 'react';
import { Helmet } from 'react-helmet';

// components
import Container from '../components/Container';
import Charts from '../components/Charts';

// index.js
export default ({ data }) => {
  const pageTitle = 'Wet My Leaf';

  return (
    <Container>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <Charts />
    </Container>
  );
};
