<?php

namespace CodeAlfa\Minify\Tests;

use CodeAlfa\Minify\Css;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class CssTest extends TestCase
{
    public static function getCssOptimizeData(): array
    {
        return [
            ['name' => 'bootstrap5'],
            ['name' => 'comments'],
            ['name' => 'httpinurl'],
            ['name' => 'issue210'],
            ['name' => 'issue62'],
            ['name' => 'paths_prepend'],
            ['name' => 'selectors'],
            ['name' => 'styles'],
            ['name' => 'subsilver'],
            ['name' => 'template'],
            ['name' => 'test'],
            ['name' => 'test2'],
            ['name' => 'unusual_strings'],
            ['name' => 'vladmirated'],
            ['name' => 'custom'],

        ];
    }

    #[DataProvider('getCssOptimizeData')]
    public function testOptimize($name)
    {
        $css = $this->getCss($name);
        $expected = $this->getCssMin($name);

        $actual = Css::optimize($css);

        $this->assertEquals($expected, $actual, $name);
    }

    private function getCss($name)
    {
        return file_get_contents(dirname(__FILE__) . '/_data/css/' . $name . '.css');
    }

    private function getCssMin($name)
    {
        return file_get_contents(dirname(__FILE__) . '/_data/css/min/' . $name . '.min.css');
    }
}
