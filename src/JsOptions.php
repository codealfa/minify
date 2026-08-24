<?php

declare(strict_types=1);

namespace CodeAlfa\Minify;

use InvalidArgumentException;

final readonly class JsOptions
{
    public function __construct(
        public bool $prepareOnly = false
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
