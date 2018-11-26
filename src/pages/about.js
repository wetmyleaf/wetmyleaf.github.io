import React from 'react';
import { Helmet } from 'react-helmet';

// components
import Container from '../components/Container';

export default ({ data }) => {
  const pageTitle = 'About';

  return (
    <Container>
      <Helmet>
        <title>{pageTitle}</title>
      </Helmet>
      <div>
        <h1>{pageTitle}</h1>
      </div>
    </Container>
  );
};
