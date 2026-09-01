<?php

declare(strict_types=1);

/**
 * @package   codealfa/minify
 * @author    Samuel Marshall <sdmarshall73@gmail.com>
 * @copyright Copyright (c) 2026 Samuel Marshall
 * @license   GNU/GPLv3, or later. See LICENSE file
 *
 * If LICENSE file missing, see <http://www.gnu.org/licenses/>.
 */

namespace CodeAlfa\Minify;

use InvalidArgumentException;

final class JsOptions
{
    public function __construct(
        public readonly bool $prepareOnly = false
    ) {
    }

    public static function fromArray(array $options): self
    {
        $prepareOnly = array_key_exists('prepareOnly', $options) ? $options['prepareOnly'] : false;

        if (!is_bool($prepareOnly)) {
            throw new InvalidArgumentException('The prepareOnly option must be a boolean.');
        }

        return new self($prepareOnly);
    }
}
