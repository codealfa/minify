<?php

declare(strict_types=1);

/**
 * @package   codealfa/minify
 * @author    Samuel Marshall <sdmarshall73@gmail.com>
 * @copyright Copyright (c) 2020 Samuel Marshall
 * @license   GNU/GPLv3, or later. See LICENSE file
 *
 * If LICENSE file missing, see <http://www.gnu.org/licenses/>.
 */

namespace CodeAlfa\Minify;

use Exception;

class Json extends Base
{
    use \CodeAlfa\RegexTokenizer\Js;

    public string $json;

    /** Minify a JSON string. */
    public static function optimize(string $json): string
    {
        $obj = new Json($json);

        try {
            return $obj->minifyContent();
        } catch (Exception $e) {
            return $obj->json;
        }
    }

    /** Alias of optimize(). */
    public static function minify(string $json): string
    {
        return self::optimize($json);
    }

    protected function __construct(string $json)
    {
        $this->json = $json;

        parent::__construct();
    }
    /** @throws Exception */
    private function minifyContent(): string
    {
        //regex for double-quoted strings
        $s1 = self::doubleQuoteStringToken();

        //regex for single quoted string
        $s2 = self::singleQuoteStringToken();

        //remove whitespaces around :,{}
        $rx          = "#(?>[^\"'\s]*+(?:{$s1}|{$s2})?)*?\K(?>\s++(?=[:,{}\[\]])|(?<=[:,{}\[\]])\s++|$)#s";
        $this->json = $this->applyReplacement($rx, '', $this->json, '2');

        return $this->json;
    }
}
