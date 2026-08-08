// FILE: admin/src/Components/Shared/SEO.jsx
import { Helmet } from 'react-helmet-async';
import { SEO_DEFAULTS } from '../constants/seoDefaults';

export default function SEO({ title, description, path = '/', image, noindex = false }) {
  const fullTitle = title ? SEO_DEFAULTS.titleTemplate.replace('%s', title) : SEO_DEFAULTS.defaultTitle;
  const desc = description || SEO_DEFAULTS.description;
  const url = `${SEO_DEFAULTS.siteUrl}${path}`;
  const ogImage = image || `${SEO_DEFAULTS.siteUrl}${SEO_DEFAULTS.ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_DEFAULTS.twitterHandle} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}