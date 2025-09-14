import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';
import projects from '../../content/projects.json';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
  type?: string;
  datePublished?: string;
  dateModified?: string;
  children?: React.ReactNode;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  image,
  url,
  keywords = [],
  type = 'website',
  datePublished,
  dateModified,
  children
}) => {
  const data = useStaticQuery(graphql`
    query SEOConfigQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
          image
          keywords
          twitterUsername
          social {
            github
            linkedin
            email
          }
          organization {
            name
            url
            sameAs
          }
          lastUpdated
        }
      }
    }
  `);

  const meta = data.site.siteMetadata;
  const metaTitle = title ? `${title} | ${meta.title}` : meta.title;
  const metaDescription = description || meta.description;
  const metaImage = image ? `${meta.siteUrl}${image}` : (meta.image ? `${meta.siteUrl}${meta.image}` : undefined);
  const canonical = url ? `${meta.siteUrl}${url}` : meta.siteUrl;
  const mergedKeywords = Array.from(new Set([...(meta.keywords || []), ...keywords]));

  const jsonLd: any[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: meta.siteUrl,
      name: meta.title,
      description: metaDescription,
      inLanguage: 'en'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Jonathan Yudi Gunawan',
      url: meta.siteUrl,
      sameAs: [
        meta.social?.github,
        meta.social?.linkedin,
      ].filter(Boolean),
      jobTitle: 'Infrastructure / Platform Engineer'
    }
  ];

  // Breadcrumbs (Home only for now)
  jsonLd.push({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: meta.siteUrl
      }
    ]
  });

  // Featured projects (priority 0) ItemList
  try {
    const featured = (projects as any[]).filter(p => (typeof p.priority === 'number' ? p.priority : 0) === 0).slice(0, 8);
    if (featured.length > 0) {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Featured Software Projects',
        itemListElement: featured.map((p, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: p.url || `${meta.siteUrl}#projects`,
          name: p.name,
          description: p.description
        }))
      });
      // Add SoftwareSourceCode for the first featured (Tha-GPT if present)
      const primary = featured.find(f => /tha.?gpt/i.test(f.name)) || featured[0];
      if (primary) {
        jsonLd.push({
          '@context': 'https://schema.org',
          '@type': 'SoftwareSourceCode',
          name: primary.name,
          description: primary.description,
          codeRepository: primary.repo,
          programmingLanguage: Array.isArray(primary.tech) ? primary.tech.join(', ') : 'Software',
          url: primary.url || primary.repo,
          image: primary.image ? `${meta.siteUrl}${primary.image}` : undefined,
          author: {
            '@type': 'Person',
            name: 'Jonathan Yudi Gunawan'
          },
          license: 'https://opensource.org/licenses/MIT'
        });
      }
    }
  } catch {
    // silent
  }

  if (datePublished) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: metaTitle,
      datePublished,
      dateModified: dateModified || datePublished,
      author: { '@type': 'Person', name: 'Jonathan Yudi Gunawan' },
      publisher: {
        '@type': 'Organization',
        name: meta.organization?.name,
        url: meta.organization?.url
      },
      mainEntityOfPage: canonical,
      description: metaDescription
    });
  }

  return (
    <Helmet htmlAttributes={{ lang: 'en' }}>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      {mergedKeywords.length > 0 && (
        <meta name="keywords" content={mergedKeywords.join(', ')} />
      )}
      {metaImage && <meta name="image" content={metaImage} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      {metaImage && <meta property="og:image" content={metaImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {meta.twitterUsername && <meta name="twitter:site" content={meta.twitterUsername} />}
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {metaImage && <meta name="twitter:image" content={metaImage} />}

      {/* JSON-LD */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      {children}
    </Helmet>
  );
};

export default SEO;
