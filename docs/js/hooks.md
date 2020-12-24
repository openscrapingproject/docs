The OpenScraping JS library is implemented with a Webpack-style "tap-able" plugin system for each appropriate Role (Requestor, Matcher, Extractor, Generator, Sink)

We copied somewhat liberally from the Auto by Intuit architecture, as they did that well in typescript. Specifically, we used (roughly in order from most parts used to least):

packages/core/src/validate-config.ts
packages/core/src/utils/load-plugins.ts
packages/core/src/auto.ts
