import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoConfig } from '../seoConfig';

interface SEOHeadProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    type?: 'website' | 'article';
    schema?: object;
    noIndex?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
    title = seoConfig.defaultTitle,
    description = seoConfig.defaultDescription,
    keywords,
    image = seoConfig.defaultImage,
    type = 'website',
    schema,
    noIndex = false
}) => {
    const location = useLocation();
    const canonicalUrl = `${seoConfig.baseUrl}${location.pathname}`;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonicalUrl} />
            {noIndex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={seoConfig.siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            {seoConfig.twitterHandle && <meta name="twitter:site" content={seoConfig.twitterHandle} />}

            {/* Structured Data */}
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
};

export default SEOHead;
