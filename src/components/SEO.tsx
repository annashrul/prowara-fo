import React from 'react';
import Head from 'next/head';

const SEO: React.FC<SEOProps> = ({ description, keywords, title }) => (
  <Head>
    <title>{title} | Prowara</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords?.join(', ')} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={title} />
    <meta name="og:description" property="og:description" content={description} />
    <meta property="og:site_name" content="Prowara" />
    <meta property="og:url" content="https://prowara.com" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="" />
    <meta name="twitter:creator" content="@prowara" />
    <meta name="twitter:image" content="" />
    <meta property="og:image" content="" />
    {/* <meta httpEquiv="Content-Security-Policy"
      content="
      default-src     'self' https://*.prowara.com;
      script-src      'self' https://*.prowara.com;
      img-src         'self' https://*.prowara.com;
      font-src        'self' https://*.prowara.com;
      connect-src     'self' https://*.prowara.com;
      media-src       'self' https://*.prowara.com;
      object-src      'self' https://*.prowara.com;
      child-src       'self' https://*.prowara.com;
      frame-src       'self' https://*.prowara.com;
      worker-src      'self' https://*.prowara.com;
      form-action     'self' https://*.prowara.com;
      block-all-mixed-content;
      "/> */}
    <link rel="icon" type="image/png" href="/logo.png" />
    <link rel="apple-touch-icon" type="image/png" href="/logo.png" />
  </Head>
);

export interface SEOProps {
  description?: string;
  lang?: string;
  meta?: any[];
  keywords?: string[];
  title: string;
}

SEO.defaultProps = {
  description: 'ProWara (Program Waralaba Rakyat) adalah konsep yang bertujuan untuk membantu serta membangkitkan Ekonomi Kerakyatan di pasca Pandemi.',
  keywords: [
    'prowara',
    'Program Waralaba Rakyat'
  ],
};

export default SEO;
