<?php

namespace CodeAlfa\Minify\Tests;

use PHPUnit\Framework\TestCase;
use CodeAlfa\Minify\Html;

/**
 *
 */
class HtmlTest extends TestCase
{
	public function getOptimizeHtmlData(): array
	{
		return [
			[
				'file'     => 'html_a',
				'expected' => 'html_a_basic',
				'options'  => [
					'minifyLevel' => 0
				],
				'message'  => 'HTML_a_basic'
			],
			[
				'file'     => 'html_a',
				'expected' => 'html_a_advanced',
				'options'  => [
					'minifyLevel' => 1
				],
				'message'  => 'HTML_a_advanced'
			],
			[
				'file'     => 'html_a',
				'expected' => 'html_a',
				'options'  => [
					'cssMinifier'  => [ 'CodeAlfa\Minify\Css', 'optimize' ],
					'jsMinifier'   => [ 'CodeAlfa\Minify\Js', 'optimize' ],
					'jsonMinifier' => [ 'CodeAlfa\Minify\Json', 'optimize' ],
					'isXhtml'      => false,
					'isHtml5'      => true,
					'minifyLevel'  => 2
				],
				'message'  => 'HTML_a'
			],
			[
				'file'     => 'html_b',
				'expected' => 'html_b',
				'options'  => [
					'cssMinifier'  => [ 'CodeAlfa\Minify\Css', 'optimize' ],
					'jsMinifier'   => [ 'CodeAlfa\Minify\Js', 'optimize' ],
					'jsonMinifier' => [ 'CodeAlfa\Minify\Json', 'optimize' ],
					'isXhtml'      => true,
					'isHtml5'      => false,
					'minifyLevel'  => 2
				],
				'message'  => 'HTML_b'
			],
			/*		[
						'file' => 'html_test',
						'expected' => 'html_test',
						'options' => [
							'isXhtml' => true,
							'isHtml5' => false,
							'minifyLevel' => 2
						],
						'message' => 'test'
					] */
		];
	}

	/**
	 * @dataProvider getOptimizeHtmlData
	 */
	public function testOptimize( $file, $expected, $options, $message )
	{
		$html     = $this->getHtml( $file );
		$expected = $this->getHtmlMin( $expected );
		$actual   = Html::optimize( $html, $options );

		$this->assertEquals( $expected, $actual, $message );
	}

	private function getHtml( $name )
	{
		return file_get_contents( dirname( __FILE__ ) . '/_data/html/' . $name . '.html' );
	}

	private function getHtmlMin( $name )
	{
		return file_get_contents( dirname( __FILE__ ) . '/_data/html/min/' . $name . '.min.html' );
	}
}
