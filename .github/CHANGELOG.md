# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

<!-- Types of changes & the order in which they ought to appear:
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
-->

## [Unreleased]

## [0.1.0]: 2024-03-22Z

### Added

- Basic [stylesheets](https://github.com/gimjb/pbdb.io/tree/v0.1.0/public/styles/) and other
  [assets](https://github.com/gimjb/pbdb.io/tree/v0.1.0/public/) for the website.
- Basic [index (/)](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/index.ts#L21-L23) page.
- [/admin](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/admin.ts#L18-L30) dashboard.
- Discord authentication manager:
  - [/auth/discord/callback?code=](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/auth.ts#L11-L60) endpoint.
  - [/auth/discord/logout](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/auth.ts#L62-L66) endpoint.
- [/definitions/](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/definitions/index.ts#L24-L31) page.
  - [/definitions/guidelines](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/definitions/guidelines.ts#L6-L8) document.
  - [/definitions/new](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/definitions/new.ts#L8-L33) form.
  - [/definitions/:id](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/definitions/preview.ts#L8-L18) submission preview.
- [/terms](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/terms.ts#L6-L8) document.
- [/privacy](https://github.com/gimjb/pbdb.io/blob/v0.1.0/src/routes/privacy.ts#L6-L8) document.

[unreleased]: https://github.com/gimjb/pbdb.io/compare/latest...develop
[0.1.0]: https://github.com/gimjb/pbdb.io/compare/v0.0.0...v0.1.0
