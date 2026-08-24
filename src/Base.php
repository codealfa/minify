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

use CodeAlfa\RegexTokenizer\Debug\Profiler;
use Exception;

abstract class Base
{
    use \CodeAlfa\RegexTokenizer\Base;
    use Profiler;

    protected function __construct()
    {
        if (!defined('CODEALFA_MINIFY_CONFIGURED')) {
            ini_set('pcre.backtrack_limit', '1000000');
            ini_set('pcre.recursion_limit', '1000000');
            ini_set('pcre.jit', '0');

            define('CODEALFA_MINIFY_CONFIGURED', 1);
        }

        $this->profileRegex('', '');
    }

    /**
     * Apply a regular expression replacement and throw on PCRE errors.
     *
     * @throws Exception
     */
    protected function applyReplacement(
        string $regex,
        string $replacement,
        string $code,
        int|string $regexNum,
        ?callable $callback = null
    ): string
    {
        if ($callback === null) {
            $opCode = preg_replace($regex, $replacement, $code);
        } else {
            $opCode = preg_replace_callback($regex, $callback, $code);
        }

        $this->profileRegex($regex, $code, $regexNum);

        self::throwExceptionOnPregError();

        return $opCode ?? $code;
    }
}
