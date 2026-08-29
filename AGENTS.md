# Agent Guidelines

## Documentation Policy

Before implementing or modifying code that depends on an
external library, framework, API, or platform:

1. Use Context7 to retrieve the latest official documentation.
2. Verify the API, props, methods, configuration, and behavior.
3. Do not rely solely on model memory for external library APIs.
4. Prefer the documented version used by this project.
5. If Context7 documentation conflicts with existing code,
   inspect package.json and the installed package version first.
6. Do not introduce an API that is not supported by the installed version.
