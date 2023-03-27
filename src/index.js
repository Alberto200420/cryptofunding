import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import tmisLogo from 'assets/img/tmis.ico'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>TMIS</title>
        <meta name="description" content="Raise capital without banks. decentralized application to invest with stable coins." />
        <meta name="keywords" content='Crowdfunding with crypto, investments to personal brands, raise capital without banks.' />
        <meta name="robots" content='all' />
        <link rel="canonical" href="https://www.tmis.io/" />
        <meta name="author" content='Tmis' />
        <meta name="publisher" content='Tmis' />
        {/* Social Media Tags */}
        <meta property="og:title" content='Tmis | investments to personal brands' />
        <meta property="og:description" content='Crowdfunding with crypto, investments to personal brands, raise capital without banks.' />
        <meta property="og:url" content="https://www.tmis.io/" />
        <meta property="og:image" content={tmisLogo} />
        <meta name="twitter:title" content='Tmis | investments to personal brands' />
        <meta
            name="twitter:description"
            content='Crowdfunding with crypto, investments to personal brands, raise capital without banks.'
        />
        <meta name="twitter:image" content={tmisLogo} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);
