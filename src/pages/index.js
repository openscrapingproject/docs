import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Declarative</>,
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        OpenScraping defines a simple declarative Scraping Definition format, which can be used by scraping clients (like web extensions or websites) or humans alike to define the parts of a web page to scrape. 
      </>
    ),
  },
  {
    title: <>Powerful</>,
    imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        Each component of OpenScraping is designed to be swappable with custom plugins. This allows for a custom requester, parser, data service, and more. 
      </>
    ),
  },
  {
    title: <>Scalable</>,
    imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        OpenScraping is designed to enable online (e.g. realtime, fetching new data from sites) or offline (batch processing of previously saved web pages/archives). It is also designed with horizontal scaling over distributed clusters in mind.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
