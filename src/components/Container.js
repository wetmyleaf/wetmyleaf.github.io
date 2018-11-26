import React from 'react';
import { Helmet } from 'react-helmet';

// components
import Header from './Header';
import Footer from './Footer';

// global CSS
import '../css/utils/normalize.css';
import '../css/utils/base.css';
import '../css/utils/helpers.css';

// component CSS
import '../css/styles.css';

// images
import favicon from '../images/favicon.png';
import logo from '../images/logo.png';

var containerStyle = {
  backgroundImage: 'url(' + logo + ')'
};

export default ({ children }) => {
  return (
    <div className="container" style={containerStyle}>
      <div className="content">
        <Helmet defaultTitle={`MDEF Diary`} titleTemplate={`%s | MDEF Diary`}>
          <meta charSet="utf-8" />
          <link rel="shortcut icon" type="image/png" href={favicon} />
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="MDEF Diary" />
        </Helmet>
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
};
