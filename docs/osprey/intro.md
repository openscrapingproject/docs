---
title: Osprey CLI
---

Osprey CLI Documentation:

```
osprey 0.1.0
The OpenScraping CLI. A simple, declarative, scalable scraping tool.

This is the reference implementation of the OpenScraping Specification. Right now, it only works on one machine, but
eventually it will be easily be scaled up to a cluster.

You can pass the input specification to the agent via stdin or by passing a filename argument.

USAGE:
    osprey [OPTIONS] [SUBCOMMAND]

FLAGS:
    -h, --help       Prints help information
    -V, --version    Prints version information

OPTIONS:
    -v <verbose>...        Sets the level of verbosity

SUBCOMMANDS:
    executor    Starts the Osprey Executor which starts running Jobs from the Jobs API
    help        Prints this message or the help of the given subcommand(s)
    run         Runs a Job Collection from the input specification. This should be for testing purposes and will be
                depracated.
    submit      Takes a Job Collection and sends it as Config and Jobs to the Jobs API
    validate    Validates a Job Collection input specification file
```
