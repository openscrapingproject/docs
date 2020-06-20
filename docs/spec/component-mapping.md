---
title: Distributed Component Mapping Requirements
---

Each component SHOULD be defined as a software interface where each function accepts one serializable object and returns a different serializable object. An implementation may be standalone, where the Agent contains all components in one binary, or distributed, where the Agent only drives the processing of various distributed and remote components.

This document outlines requirements for mapping distributed components to specific transport mechanisms.

There is a great benefit to separating the components. This allows them to be uniformly utilized in a real-time or batch manner, and allows for individual load-balancing and autoscaling by component.

## HTTP

If the components communicate over HTTP, they must follow the following generally guidelines:

A component may be mounted on an HTTP route.

E.g. `localhost:4845/components/parser/`

The component must be accessible using ALL of the HTTP(S) specification features, including, ports, username and password, etc.

The client should also support the HTTP_PROXY environment variable.

It should also support customizable client and server certificates, including rotating certificates.

The following guidelines map language interface features to the component.

A component is defined as an interface of multiple functions. Each function should be mapped to a route.

e.g. `localhost:4845/components/parser/configure` and `localhost:4845/components/parser/parse`

It should be accessible via a POST request, which should accept the input serialized as JSON.

It should also synchronously return the return type serialized as JSON.

Optionally, if the component calls for an asynchronous operation to be performed (usually defined in language features as a Promise or Future), there should be a standard response that tracks the progress of that action.

The implementation may require polling by the client to check for updates, or it may provide a system for notifying the client (e.g. over webhooks, SSE, WebSockets, etc)

## gRPC or other

For now, no implementations use other transport mechanisms.