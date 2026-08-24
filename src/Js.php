<?php

declare(strict_types=1);

/**
 * This is a regular-expression-based implementation of JavaScript minification in PHP.
 * It is based on JSMin by Douglas Crockford and was also informed by the PHP port
 * written by Ryan Grove <ryan@wonko.com>.
 *
 * The implementation is maintained as part of the CodeAlfa minify library and is intended
 * for use when JavaScript needs to be minified at runtime.
 *
 * The original JSMin notice and license are retained below for the JSMin-derived portions:
 *
 *  --
 * Copyright (c) 2002 Douglas Crockford  (www.crockford.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * The Software shall be used for Good, not Evil.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * --
 *
 * @package       codealfa/minify
 * @author        Samuel Marshall <sdmarshall73@gmail.com>
 * @copyright     Copyright (c) 2002 Douglas Crockford (jsmin.c)
 * @copyright     Copyright (c) 2020-2026 Samuel Marshall
 * @license       GPL-3.0-or-later; see LICENSE file
 */

namespace CodeAlfa\Minify;

use Exception;

class Js extends Base
{
    use \CodeAlfa\RegexTokenizer\Js;

    public string $js;
    protected JsOptions $options;


    /** Minify a JavaScript string. */
    public static function optimize(string $js, ?JsOptions $options = null): string
    {
        $minifier = new Js($js, $options ?? new JsOptions());

        try {
            return $minifier->minifyContent();
        } catch (Exception $e) {
            return $minifier->js;
        }
    }

    /** Alias of optimize(). */
    public static function minify(string $js, ?JsOptions $options = null): string
    {
        return self::optimize($js, $options);
    }

    protected function __construct(string $js, JsOptions $options)
    {
        $this->js = $js;
        $this->options = $options;

        parent::__construct();
    }

    /** @throws Exception */
    private function minifyContent(): string
    {
        if (trim($this->js) === '') {
            return $this->js;
        }

        //regex for double-quoted strings
        $s1 = self::doubleQuoteStringToken();

        //regex for single quoted string
        $s2 = self::singleQuoteStringToken();

        //regex for backtick quoted string
        $s3 = self::backTickStringToken();

        //regex for block comments
        $b = self::blockCommentToken();

        //regex for line comments
        $c = self::lineCommentToken();

        //regex for HTML comments in scripts
        $h = self::jsHtmlCommentToken();

        //We have to do some manipulating with regexp literals; Their pattern is a little 'irregular' but
        //they need to be escaped
        //
        //characters that can precede a regexp literal
        $x1 = '[(.<>%,=:[!&|?+\-~*{;\r\n^]';
        //keywords that can precede a regex literal
        $x2 = '\breturn|\bthrow|\btypeof|\bcase|\bdelete|\bdo|\belse|\bin|\binstanceof|\bnew|\bvoid';
        //actual regexp literal
        $x3 = '/(?![/*])(?>(?(?=\\\\)\\\\.|\[(?>(?:\\\\.)?[^\]\r\n]*+)+?\])?[^\\\\/\r\n\[]*+)+?/';
        //ambiguous characters
        $x4 = '[)}]';
        //methods and properties
        $x5 = 'compile|exec|test|toString|constructor|global|ignoreCase|lastIndex|multiline|source';

        //regex for complete regexp literal
        $x = "(?>(?=/)(?<={$x1}|$x2)(?<!\+\+|--){$x3}"
            . "|(?=/)(?<={$x4}){$x3}(?=\.(?>{$x5})))";

        //control characters excluding \r, \
        $ws = '\x00-\x09\x0B\x0C\x0E-\x1F\x7F';

        //Remove spaces before regexp literals
        $rx = "#(?>[$ws ]*+(?(?=[^'\"/`]*+(?<=[$ws ])/)[^'\"/`$ws ]*+(?(?=['\"/`])(?>$s1|$s2|$s3|$b|$c|$x|/)?)"
            . "|[^'\"/`]*+(?>$s1|$s2|$s3|$b|$c|$x|/)?))*?\K"
            . "(?>(?=[$ws ]++/)(?:(?<=$x1|$x2)(?>[$ws ]++($x3))|(?<=$x4)(?>[$ws ]++($x3))(?=\.(?>$x5)))|$)#siS";
        $this->js = $this->applyReplacement($rx, '$1$2', $this->js, 'js1');

        //remove HTML comments
        //language=RegExp
        $r1 = "(?>[<\]\-]?[^'\"`<\]\-/]*+(?>$s1|$s2|$s3|$b|$c|$x|/)?)";
        $rx = "#{$r1}*?\K(?>{$h}|$)#si";
        $this->js = $this->applyReplacement($rx, '', $this->js, 'js1B');

        if ($this->options->prepareOnly) {
            return $this->js;
        }

        //replace line comments with line feed
        $rx = "#(?>[^'\"/`]*+(?>{$s1}|{$s2}|{$s3}|{$x}|{$b}|/(?![*/]))?)*?\K(?>{$c}|$)#si";
        $this->js = $this->applyReplacement($rx, "\n", $this->js, 'js2');

        //replace block comments with single space
        $rx = "#(?>[^'\"/`]*+(?>{$s1}|{$s2}|{$s3}|{$x}|/(?![*/]))?)*?\K(?>{$b}|$)#si";
        $this->js = $this->applyReplacement($rx, ' ', $this->js, 'js3');

        //convert carriage returns to line feeds
        $rx = "#(?>[^'\"`/\\r]*+(?>$s1|$s2|$s3|$x|/)?)*?\K(?>\\r\\n?|$)#si";
        $this->js = $this->applyReplacement($rx, "\n", $this->js, 'js4');

        //convert all other control characters to space
        $rx = "#(?>[^'\"`/$ws]*+(?>$s1|$s2|$s3|$x|/)?)*?\K(?>[$ws]++|$)#si";
        $this->js = $this->applyReplacement($rx, ' ', $this->js, 'js5');

        //replace runs of whitespace with single space or linefeed
        $rx = "#(?>[^'\"`/\\n ]*+(?>{$s1}|{$s2}|{$s3}|{$x}|[ \\n](?![ \\n])|/)?)*?\K(?:[ ]++(?=\\n)|\\n\K\s++|[ ]\K[ ]++|$)#si";
        $this->js = $this->applyReplacement($rx, '', $this->js, 'js6');

        //if regex literal ends line (without modifiers) insert semicolon
        $rx = "#(?>[/]?[^'\"`/]*+(?>$s1|$s2|$s3|$x(?!\\n))?)*?(?:$x\K\\n(?![!\#%&`*./,:;<=>?@\^|~}\])\"'])|\K$)#si";
        $this->js = $this->applyReplacement($rx, ';', $this->js, 'js7');

        //clean up
        //                $rx = '#.+\K;$#s';
        $this->js = substr($this->js, 0, -1);

        //regex for removing spaces
        //remove space except when a space is preceded and followed by a non-ASCII character or by an ASCII letter
        // or digit, or by one of these characters \ $ _
        // (or follows a + and precedes a + or follows an - and precedes an -)
        // (Or space preceding a decimal number)

        //Non-ASCII characters
        $na = '[^\x00-\x7F]';

        //spaces to keep
        $k1 = "(?<=[\$_a-z0-9\\\\]|$na) (?=[\$_a-z0-9\\\\]|$na)|(?<=\+) (?=\+)|(?<=-) (?=-)| (?=\.[0-9])";

        //regex for removing linefeed
        //remove linefeed except if it precedes a non-ASCII character or an ASCII letter or digit or one of these
        //characters: ! \ $ _ [ ( { + -
        // and if it follows a non-ASCII character or an ASCII letter or digit or one of these
        //characters: \ $ _ ] ) } + - " ' `
        //(or if it follows one of these characters: ) } ] " ' ` and precedes a string)

        //linefeed to keep
        $k2 = "(?<=[\$_a-z0-9\\\\\])}+\-\"'`]|$na)\\n(?=[!\$_a-z0-9\\\\\[({+\-]|$na)|(?<=[\)}\]\"'`])\\n(?=[\"'`])";

        //A very specific use case
        $q = '(?<=`) (?:- )?(?=\$)';
        //remove unnecessary linefeed and spaces
        $rx = "#(?>[^'\"`/\\n ]++|$s1|$s2|$s3|$x|/|$k1|$k2|$q)*\K(?>[ \\n]|$)#si";
        $this->js = $this->applyReplacement($rx, '', $this->js, 'js9');

        return trim($this->js);
    }
}
