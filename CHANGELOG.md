# Changelog

All notable changes to this project are documented here.

## [2.2.0] - 2026-08-22

### Added and improved

- Reworked CSS minification to handle comments, quoted strings, URLs, whitespace, selectors, declarations, and hexadecimal colors more reliably.
- Improved HTML comment handling, including conditional Internet Explorer comments and script/style content.
- Improved JavaScript minification behavior for empty input and final trimming.
- Enabled JSON comment removal while preserving quoted content.
- Improved error handling when a regular-expression operation fails.

### Changed

- Replaced the development-only `codealfa/regextokenizer` dependency with the stable `^2.1` constraint, resolved to `2.1.0`.
- Updated CSS, HTML, JavaScript, and JSON regression coverage and restored the complete fixture set used by the merged test suite.

### Upgrade notes

This release contains behavior changes in the minification algorithms. Applications should run their output comparisons against representative CSS, HTML, JavaScript, and JSON input before upgrading.

## [2.1.0] - Previous release

- Added CSS nesting support and related minification improvements.

[2.2.0]: https://github.com/codealfa/minify/releases/tag/2.2.0
[2.1.0]: https://github.com/codealfa/minify/releases/tag/2.1.0
