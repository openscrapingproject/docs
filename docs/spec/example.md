---
title: Example Use-Case
---

A simple example of a common implmentation/use-case of the [logical definitions](./index.md) is as follows:

- Requestor
  - takes in an array of URLs, generates a basic GET request from them
  - e.g. `["/product/:ID1", "/product/:ID2" ...]`
- Matcher
  - Matches above URLs b/c they have the same page structure, and thus can use the same extractor
  - e.g. Regex: `/product/*/` or a more specific one
  - Requires the Response `Content-Type` header to be HTML to match the parser
- Parser
  - A builtin HTML parser
- Extractor
  - Uses a basic XPath Scraping Definition provided by the user to extract relevant data
- Data plugin
  - Goes into a database, in this case maybe just prints JSON to `stdout`

Thus, the above could all be contained in one simple command-line tool.

What does the user actually set?

You can read the JSON Serialization Specification [here.](/spec/json.md)
