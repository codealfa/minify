# JCH Minify
An extremely fast PHP based minification library for Javascript, CSS, Html and Json scripts using Regex Parsing

## Installation
Run the following command to use the library in your projects:
```
composer require codealfa/minify
```

## Basic Usage
You can use any of the minifiers in the following way:

```php
use CodeAlfa\Minify\Js

$sMinifiedJs = Js::optimize($sOriginalJs);
```

## Html Options
The HTML minifier takes the following options:

* `cssMinifier` (default `null`): Callback function to minify the contents of in-page `<style>` elements.
* `jsMinifier` (default `null`): Callback function to minify the contents of in-page `<script>` elements.
* `jsonMinifier` (default `null`): Callback function to minify the contents of in-page json contents. The Html Minifer will inspect the `type` attribute of `script` contents to determine if it's javascript or json.
* `minifyLevel` (default `0`): Determine the minification level of the HTML. Possible values are:
  * `0`: Runs of whitespace outside elements are reduced to one whitespace, if a line feed is included it will be preserved. (HTML comments are not removed). In-page scripts and styles are minified if callback functions were provided.
  * `1`: HTML comments are removed, along with whitespaces around block elements. Unnecessary whitespaces inside elements and around attributes are removed.
  * `2`: Redundant attributes eg., `type="text/javascript"` are removed. Quotes are removed from selected attributes if the isHtml5 option is set to `true`.
* `isXhtml` (default `false`): HTML content treated as XHTML1.0. In-page javascript content with that contains characters that needs escaping in XML will be surrounded by `/*<![CDATA[*/` and `/*]]>*/`
* `isHtml5` (default `false`): If set to `true` then when `minifyLevel` is set to `2`, quotes are removed from attibutes if they don't contain characters that necessitates quoting.

**Example:**
```php
use CodeAlfa\Minify\Html

$aOptions = array(
    'cssMinifier' => array('CodeAlfa\Minify\Css', 'optimize'),
    'jsMinifier'  => array('CodeAlfa\Minify\Js', 'optimize'),
    'minifyLevel' => 2,
    'isHtml5'     => true
);

$sMinifiedHtml = Html::optimize($sOriginalHtml, $aOptions);
```

## License
GPL-3.0 or later
