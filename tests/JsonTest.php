<?php

declare(strict_types=1);

namespace CodeAlfa\Minify\Tests;

use CodeAlfa\Minify\Json;
use PHPUnit\Framework\TestCase;

final class JsonTest extends TestCase
{
    public function testMinifyIsOptimizeAlias(): void
    {
        $json = '{ "value" : 1 }';

        $this->assertSame(Json::optimize($json), Json::minify($json));
    }
}
