---
title: Definitions
---

Version 0.1.0

OSP refers to the OpenScraping Project.

The OpenScraping Specification allows for pluggable, configurable, and extensible scraping systems to present a consistent API surface to scraping consumers.

There are several logical objects in the specification, called components, which allow for this behind-the-scenes configuration to work easily. However, a normal user will usually only need to use a few of these objects

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL
NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and
"OPTIONAL" in this document and all OpenScraping Specification documents are to be interpreted as described in
[RFC 2119](https://tools.ietf.org/html/rfc2119).

## General Terms

### Agent

An agent is one logical scraping node. A common setup for a distributed scraping system distributes a given scraping task across many agents running in a cluster.

Usually, agents will simply pull their next Job from a queuing system. However, later, the specification may introduce Browsing Modes, which are designed to imitate human interaction with the web to fool automated traffic prevention systems.

### Configuration

Configuration is the sum total of all information needed to configure each component for a job. It only applies to that job.
It includes some default configuration about how the components interact within the agent, along with custom configuration for each component. For 3rd-party components, they should provide their own descriptions of their configuration.

It also includes the Scraping Definition, namely the configuration passed to an extractor.

### Job

A job is any task associated with the scraping framework. This includes making a request, storing the response, or parsing the stored data.

Jobs MUST be either online (e.g. happening in realtime in response to new requests) or offline (e.g. running parsers on stored requests).

A job MUST be associated with configuration for that job. This could be through a reference, allowing the same configs to be reused.

A job MUST provide all the intial information to start a request. This includes configuration, but also initial URLs

The system MUST provide an interface for fetching new jobs. A simple way to start the system is to enter in some jobs with basic default configurations but with a set of URLs to run.

### State

A state is the driving force of an agent. It consists of a Starting state, but then tracks the processing of requests and parsing. State contains all requests and responses, along with extracted relevant data.

The following are external resources, and are usually managed outside the scope of the OpenScraping framework:

### Data Store

The location where the data service stores the data

Example: MongoDB, FoundationDB

### Job Store

A system that stores a queue of OSP jobs.

Example: Kafka, Redis

## What are Components?

### Component

A component in OpenScraping are the key logical objects that make up the system. They are defined by the specification and interact with each other in the Agent runtime or over the network.

<!-- Components MAY have be provided by the implementation of OpenScraping, for example a specialized component. -->

Components MUST be placeholders that Plugins may fill.

An implementation of OSP Spec MAY provide its' own built-in Plugins.

The inputs and outputs of each component are well-defined in this specification.

In every implementation, the inputs and outputs of each component MUST be serialized as key-value or structured data (e.g. JSON).

A component may not call or utilize any other components on its own. Its sole function is to be called and managed in lifecycle completely by the agent.

TODO: think about components that are separated across agents or time (e.g. delayed parsing)

Agent implementations SHOULD CONSIDER using a runtime dependency injection framework to manage their components:

- if they support 3rd party plugins
- or if there is significant complexity to manual switching/resolving the appropriate plugin to use (e.g. which Parser and Generator to use based on Matcher's output)

### Plugin

A plugin is an implementation of a component. A 3rd-party plugin is one that is not provided by the OSP implementation.

## Components

### Job Service

The job service is a component of the agent that retrieves and pushes new jobs into the Job Store.

Example: the Redis client library

### Requestor

A requestor makes all of the requests from the agent. It SHOULD use one network connection, which can be configured to be through a proxy/VPN.

It can be as simple as making an HTTP request or as complicated as running a headless browser like Selenium.

For the purposes of this version of the specification, it MUST simply take in a Job and output the retrieved HTTP response

Example: cURL or a native HTTP library in a language

### Matcher

A matcher takes in a Request object and a Response object (headers only) and matches the request to an appropriate Parser and Extractor.

Example: uses Regex to match a URL

### Parser

A parser parses the given response from whatever format it is in. It creates an in-memory representation.

Example: deserializes JSON or HTML and creates a representation

### Extractor

An extractor takes in a Scraping Definition and extracts the Relevant Data (RD) from a given page.

Example: uses XPath selectors to extract data from an HTML representation

### Generator

The Generator takes Relevant Data from the extractor and possibly generates new Jobs. The Agent MUST then pass those generated jobs to the job service to be fulfilled.

Example: A probabilistic sampler of all the links on the page

### Data Service

The Data Service is utilized whenever the Agent needs to store persistent data. Depending on the configuration, this could be after a response is received, or after relevant data is extracted
