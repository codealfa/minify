<?php

namespace CodeAlfa\Minify\Tests;

use CodeAlfa\Minify\Css;
use PHPUnit\Framework\TestCase;


/**
 */
class CssTest extends TestCase
{
    public function getCssOptimizeData(): array
    {
        return [
                [
                        'message' => 'comments'
                ],
                [
                        'message' => 'httpinurl'
                ],
                [
                        'message' => 'issue210'
                ],
                [
                        'message' => 'issue62'
                ],
                [
                        'message' => 'paths_prepend'
                ],
                [
                        'message' => 'selectors'
                ],
                [
                        'message' => 'styles'
                ],
                [
                        'message' => 'subsilver'
                ],
                [
                        'message' => 'unusual_strings'
                ],
                [
                        'message' => 'vladmirated'
                ],
                [
                        'message' => 'custom'
                ],

        ];
    }

    /**
     * @dataProvider getCssOptimizeData
     */
    public function testOptimize($name)
    {
        $css      = $this->getCss($name);
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
