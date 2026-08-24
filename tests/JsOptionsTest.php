<?php

declare(strict_types=1);

namespace CodeAlfa\Minify\Tests;

use CodeAlfa\Minify\JsOptions;
use InvalidArgumentException;
use PHPUnit\Framework\TestCase;

final class JsOptionsTest extends TestCase
{
    public function testFromArrayCreatesOptions(): void
    {
        $options = JsOptions::fromArray(['prepareOnly' => true]);

        self::assertTrue($options->prepareOnly);
    }

    public function testFromArrayRejectsInvalidBooleanOption(): void
    {
        $this->expectException(InvalidArgumentException::class);

        JsOptions::fromArray(['prepareOnly' => 1]);
    }
}
