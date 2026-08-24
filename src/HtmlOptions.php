<?php

declare(strict_types=1);

namespace CodeAlfa\Minify;

use Closure;
use InvalidArgumentException;

final readonly class HtmlOptions
{
    public function __construct(
        public bool $isXhtml = false,
        public bool $isHtml5 = false,
        public int $minifyLevel = 0,
        public ?Closure $cssMinifier = null,
        public ?Closure $jsMinifier = null,
        public ?Closure $jsonMinifier = null
    ) {
    }

    public static function fromArray(array $options): self
    {
        return new self(
            isXhtml: self::boolOption($options, 'isXhtml'),
            isHtml5: self::boolOption($options, 'isHtml5'),
            minifyLevel: self::intOption($options, 'minifyLevel'),
            cssMinifier: self::callbackOption($options, 'cssMinifier'),
            jsMinifier: self::callbackOption($options, 'jsMinifier'),
            jsonMinifier: self::callbackOption($options, 'jsonMinifier')
        );
    }

    private static function boolOption(array $options, string $name): bool
    {
        $value = array_key_exists($name, $options) ? $options[$name] : false;

        if (!is_bool($value)) {
            throw new InvalidArgumentException("The {$name} option must be a boolean.");
        }

        return $value;
    }

    private static function intOption(array $options, string $name): int
    {
        $value = array_key_exists($name, $options) ? $options[$name] : 0;

        if (!is_int($value)) {
            throw new InvalidArgumentException("The {$name} option must be an integer.");
        }

        return $value;
    }

    private static function callbackOption(array $options, string $name): ?Closure
    {
        $value = $options[$name] ?? null;

        if ($value === null) {
            return null;
        }

        if (!is_callable($value)) {
            throw new InvalidArgumentException("The {$name} option must be callable or null.");
        }

        return Closure::fromCallable($value);
    }
}
