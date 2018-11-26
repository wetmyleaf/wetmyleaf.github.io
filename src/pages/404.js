import React from 'react';

// components
import Container from '../components/Container';

// images
import notFound from '../images/not-found.gif';

export default ({ data }) => {
  var pageTitle = 'Page not found';

  return (
    <Container>
      <div className="wrap">
        <h1>{pageTitle}</h1>
        <div className="ta-center m-1">
          <img src={notFound} alt="confused John Travolta" />
        </div>
      </div>
    </Container>
  );
};
