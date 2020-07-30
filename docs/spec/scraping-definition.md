---
title: Scraping Definition
---

## Illustrative Specification

```json
{
  "definitions": {
    "@type": "JSON-LD type",
    "literal": "value",
    "other": {
      "nested": "value"
    },
    "<KEY>": {
      "@type": "openscraping.io/ElementData",
      "selector": "<SELECTOR>",
      "value": "<VALUE_TYPE>"
    },
    "something": {
      "<KEY>": {
        "selector": "<SELECTOR>",
        "value": "<VALUE_TYPE>"
      }
    }
  }
}
```

A Scraping Definition MAY contain any literal keys and values, including arrays, objects, etc, except for numbers and null.

<!-- TODO: is this useful at all? -->
We also define the Restricted Scraping Definition which may only contain literal keys which are used in the JSON-LD (or json-schema?) specification. For example: `@type`.

## Key

`<KEY>` is a string Key. It SHOULD, if possible, conform to the JSON-LD specification.

## Selector

`<SELECTOR>` is a Selector implemented by the specific Extractor plugin. Distinct Selector implementations are known as Selector Types

Implementations MUST implement the following selector specifications:

- CSS Selectors
- XPATH

:::caution
For now, each Scraping Definition (thus, each Extractor that gets run on a Page Set) MUST only use one type of Selector. In the future, the specification may be extended to allow for mixing and matching multiple Selector types in one Scraping Definition.
:::

Selectors MAY return zero or more HTML elements. The returned elements will all be treated the same.

If no elements are returned, OSP MUST return `"key": null`

If one element is returned, the extracted value(s) will be placed directly under the `<KEY>`.

If more than one are returned, each value will be returned as an item under an array.

## Value Type

`<VALUE_TYPE>` is a value expression. It is used to represent both the type/shape of values that the key will hold and also the value of that structure.

It can be of the shape:
String: `"VAL"`

Array `["<VAL>", "<VAL2>"]`

Or Object: `{ "literal": "VAL" }`

`<VAL>` is a value specifier, which is one of:

- `"HTML"`,
- `"InnerHTML"`,
- `"Text"`,
- `"ID"`,
- `{"Attr": "attr-id"}`

If a given value specifier is not able to be retrieved from the selected element, the implementation MUST warn the user.

It also MUST return `null` for that value.

<!-- TODO: think about: should we support null / $1B mistake? -->

## Full Example

Input:

```json
"definitions": {
    "text": {
        "selector": "#body-text",
        "val": "Text"
    },
    "text2": {
        "selector": ".css-698um9 a h2",
        "val": {
            "title": "Text",
            "id": "ID"
        }
    }
}
```

Output:

```json
"definitions": {
    "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, dolorum cumque harum repellat rem autem. Distinctio laborum sunt ea mollitia eligendi impedit, eius a voluptatum repudiandae? Voluptatem nulla nihil ipsa!",
    "text2": [
        {
            "title": "Alien Life Discovered",
            "id": null
        },
        {
            "title": "Zebras Escape the Zoo",
            "id": null
        }
    ]
}
```
