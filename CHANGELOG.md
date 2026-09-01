# Changelog

All notable changes to this project are documented here.

## [3.0.1] - 2026-09-01

### Changed

- Lowered the minimum supported PHP version to 8.1.
- Replaced PHP 8.2 readonly-class syntax with PHP 8.1 readonly properties.
- Lowered the PHPUnit development dependency to the PHP 8.1-compatible 10.x series.

## [3.0.0] - 2026-08-24

### Added and improved

- Added typed `HtmlOptions` and `JsOptions` value objects for minifier configuration.
- Added `minify()` aliases for the existing `optimize()` methods.
- Added focused regression coverage for options validation and minifier aliases.
- Modernized the PHPUnit configuration and upgraded PHPUnit to 11.5.

### Changed

- Requires PHP 8.2 or newer.
- Applied strict typing and PSR-1 naming to the minifier implementation.
- Replaced the development dependency on `codealfa/regextokenizer` with the stable `^3.0` dependency.
- Modernized profiler initialization through `regextokenizer` 3.0.
- Reduced docblocks where native type declarations now provide the same information.

### Upgrade notes

This is a breaking release. HTML and JavaScript options are now represented by typed options objects. Use `HtmlOptions::fromArray()` or `JsOptions::fromArray()` as a migration aid for existing option arrays. Applications should also test representative CSS, HTML, JavaScript, and JSON input because minification behavior and internal names have changed.

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
[3.0.0]: https://github.com/codealfa/minify/releases/tag/3.0.0
[3.0.1]: https://github.com/codealfa/minify/releases/tag/3.0.1
