<?php

declare(strict_types=1);

namespace CodeAlfa\Minify\Tests;

use CodeAlfa\Minify\Css;
use CodeAlfa\Minify\HtmlOptions;
use InvalidArgumentException;
use PHPUnit\Framework\TestCase;

final class HtmlOptionsTest extends TestCase
{
    public function testFromArrayConvertsCallableOptions(): void
    {
        $options = HtmlOptions::fromArray([
            'cssMinifier' => [Css::class, 'optimize'],
        ]);

        self::assertNotNull($options->cssMinifier);
        self::assertSame('body{}', ($options->cssMinifier)('body {}'));
    }

    public function testFromArrayRejectsInvalidBooleanOption(): void
    {
        $this->expectException(InvalidArgumentException::class);

        HtmlOptions::fromArray(['isHtml5' => 1]);
    }

    public function testFromArrayRejectsInvalidIntegerOption(): void
    {
        $this->expectException(InvalidArgumentException::class);

        HtmlOptions::fromArray(['minifyLevel' => '2']);
    }

    public function testFromArrayRejectsInvalidCallbackOption(): void
    {
        $this->expectException(InvalidArgumentException::class);

        HtmlOptions::fromArray(['cssMinifier' => 'not-a-callable']);
    }
}
