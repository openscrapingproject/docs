---
title: JSON Serialization
---

The specification only truly defines the components of the system, certain default components that are required, and the way in which configuration is provided to each component.

Thus, it could easily be serialized into any key-value or document-based storage/message format, such as Protobuf, msgpack, CapnProto, JSON, TOML, YAML, etc.

However, for the purposes of the specification, all examples will be given in JSON. Any implementation MAY implement more than one serialization format but it MUST support JSON.

```json
// In this version the matcher specification is embedded with the components
{
  "initial_urls": ["/product/:ID1", "/product/:ID2"],
  "requestor": {
    "plugin": "builtin",
    "config": {
      "browser": ["Firefox", "random"], //sets User-Agent
      "template": "default"
      // or no template then sets the default settings
    }
  },
  "pages": {
    "productPage": {
      "matcher": {
        "url": "/product/*/"
      },
      "data": {
        "key": {
          "plugin": "extractorID",
          "config": "eConf"
        }
      }
    }
  },
  "parsers": {
    //this could be unecessary
    "html": {
      "plugin": "builtin/html",
      "headers": {
        "Content-Type": "text/html"
      }
    }
  },
  "data": {
    //could be default
    "plugin": "output",
    "config": {
      "serialize": "json",
      "out": "stdout"
    }
  }
}

```
MWISL - means what it sounds like
## Initial portions

`jobID` MWISL

`initial_urls` creates an initial set of jobs with random IDs for testing

## various components

### `requestor`
`name` - specifies the requestor service to use from the registry. this allows for custom code to slot in
`config` - any serializeable config to be sent to the service

`browser` - provides guidance to the random user-agent generator
`headers` allow generic configuration of req headers

### parsers
Allows for custom registration of a parser matcher. Follows the generic matcher format

`matcher`
allows matching the following values based on strings or regexes
`headers` -response headers
`url`
<!-- `body` -->

### data
`plugin` specifies the service to use
`config` 

`serialize` the format to serialize to
`out` stdout, stderr or a file location

## Extraction

`pages`

`pageName`
`matcher` - the standard matching format

`data` the format of the extracted data
`layerKey` layer name
`plugin`
`config`