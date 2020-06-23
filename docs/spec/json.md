---
title: JSON Serialization
---

The specification only truly defines the components of the system, certain default components that are required, and the way in which configuration is provided to each component.

Thus, it could easily be serialized into any key-value or document-based storage/message format, such as Protobuf, msgpack, CapnProto, JSON, TOML, YAML, etc.

However, for the purposes of the specification, all examples will be given in JSON. Any implementation MAY implement more than one serialization format but it MUST support JSON.

```json
{
  "name": "collection_name",
  "initial_urls": [
    "/product/:ID1",
    "/product/:ID2",
    "each URL generates a new Job",
    "with an ID of collection_name_0 ... collection_name_N"
  ],
  "requestor": {
    "plugin": "builtin",
    "config": {
      "browser": ["Firefox", "random"],
      "template": "default"
    }
  },
  "pages": {
    "<page_set_ID>": {
      "matcher": {
        "plugin": "regex",
        "config": {
          "url": "/product/*/",
          "headers": {
            "Content-Type": "text/html"
          }
        }
      },
      "extractor": {
        "plugin": "extractorID",
        "config": {
          "extra": "config"
        },
        "definition": {
          "scraping": "definition",
          "can include": "hardcoded values",
          "or use of": "XPATH, css or similar"
        }
      }
    }
  },
  "data": {
    "plugin": "output",
    "config": {
      "serialize": "json",
      "out": "stdout"
    }
  }
}
```

## Metadata

`name` The name of the Job Collection. Used to generate each individual Job as `collection_name_<0...N>`

`initial_urls` A list of URLs for each initial Job to create in the Collection.

A collection is a non-standard container object for jobs, used by Osprey for testing. Usually, one would only create a single Job by passing JSON to the Job API.

## Components

In general, each component follows the same pattern.

- `plugin` - The ID of the specific Plugin to use that implements the component. It will be loaded from the registry. TODO: figure out registration of custom plugins.
- `config` - An object of the configuration to be sent to the Plugin. It will be merged with default config, if provided by the plugin. Additionally, the `config` object may contain the `template` key which specifies a template of configuration of which to merge into. TODO: Templates can also be composed

### `builtin` Requestor Plugin

- `browser` - provides guidance to the random user-agent generator?
- `headers` allow generic configuration of reqiest headers

### `output` Data Plugin

- `serialize` A string: the format to serialize to
- `out` stdout, stderr or a file location

## Matching and Extraction

This portion of the process is more complicated. Firstly, the spec allows multiple Page Sets, which are collections of related pages, usually with a similar or identical markup structure.

Each page set is defined by one Matcher. If the Matcher returns a match, then the Extractor and any other components are run in their respective order.

<!-- TODO: think about adding multiple matchers: would it be in sequence, would allow AND or OR operators, could use Bloom filter? -->

- `pages` - a map from the Page Set ID to the components that run on that Page Set

### `regex` Matcher Plugin

- `url` A regex string to match against the URL
- `headers` A map from an absolute string to a regex string to match against that header

### Multiple extraction

:::caution
Warning! The following is not being implemented right now b/c it is **Overcomplicated**
:::

Within a page set, the same data is always extracted from those pages. However, since sometimes pages contain data in different formats, we allow for the use of multiple extractors.

What's the use case: E.g. grab some info from HTML structure, and a few fields from an embedded JSON-LDappliction/ld+json script tag.
However, here, we'd probably need the HTML extractor to extract the location and content of the script tag first and then pass it to the next extractor. Theoretically, extractors can access any subset of input data, thus, we could extend this into a DAG of processing. Thus, overcomplicated.

This would be implemented as a simple additional map from `<data_layer_id>` to `plugin` and `config` within the `extractor`(s) key.
