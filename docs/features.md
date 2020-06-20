---
title: Features
---

OpenScraping has some key features which separate it from other scraping libraries and tools.

- Declarative + Portable: the Scraping Definitions are easily serialized and editable in a declarative JSON document. This allows users to easily build and share extractors for many different pages.
- Scalable: The key architectural components and reccomendations provide a great starting point, but the system can easily be scaled in various deployment environments
- Extensible: Each component of OpenScraping is designed to be swappable with custom plugins that provide custom features and configuration
- Approachable: You don't have to use every configuration option in the specification. In fact, most users are happy with the defaults and only need to modify the scraping definition itself. Also, we work hard to build end-user tools like browser extensions that generate OSP definitions to send to a backend, but the user doesn't have to interact with unless they want to.

Don't spend your time writing a scraping tool using one library in one language that will be out-of-date in a year. 

Don't ever worry again about scaling up your scraping extractors to work at a production scale.

Easily build a scraping definition using a browser extension, test it on your machine, and then send it to a scraping cluster to deploy immediately.

This enables a new era of portability for scraping. Instead of writing a one-off script in python, curl, or other shell tools, you can write a scraper in a standardized format that can be interpreted by a variety of tools and services.

## Benefits of the community

Many of the above-mentioned features are can only be fully realized with a strong community. 

Take a look at our Contributing Guide.

## Additional Features

These are not a part of the immediate roadmap for our reference implementations but could be added later.

- A SaaS offering of our scraping service
  - CI/CD immediately deploying new scraping specifications from VCS
- E2E encryption: encrypt the main server
- Alternative API services: e.g. scraping on the blockhain, or in a P2P manner