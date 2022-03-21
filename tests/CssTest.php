<?php

namespace CodeAlfa\Minify\Tests;

use PHPUnit\Framework\TestCase;
use CodeAlfa\Minify\Css;


/**
 * JsMin Unit Test
 */
class CssTest extends TestCase
{
	public function getCssOptimizeData(): array
	{
		return [
			'comments'        => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/comments.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/comments.min.css' ),
				'message'  => 'comments'
			],
			'httpinurl'       => [

				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/httpinurl.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/httpinurl.min.css' ),
				'message'  => 'httpinurl'
			],
			'issue210' => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/issue210.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/issue210.min.css' ),
				'message'  => 'issue210'
			],
			'issue62'         => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/issue62.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/issue62.min.css' ),
				'message'  => 'issue62'
			],
			'paths_prepend'   => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/paths_prepend.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/paths_prepend.min.css' ),
				'message'  => 'paths_prepend'
			],
			'selectors'       => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/selectors.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/selectors.min.css' ),
				'message'  => 'selectors'
			],
			'styles'          => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/styles.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/styles.min.css' ),
				'message'  => 'styles'
			],
			'subsilver' => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/subsilver.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/subsilver.min.css' ),
				'message'  => 'subsilver'
			],
			'unusual_strings' => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/unusual_strings.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/unusual_strings.min.css' ),
				'message'  => 'unusual_strings'
			],
			'vladmirated'     => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/vladmirated.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/vladmirated.min.css' ),
				'message'  => 'vladmirated'
			],
			'custom'          => [
				'css'      => file_get_contents( dirname( __FILE__ ) . '/_data/css/custom.css' ),
				'expected' => file_get_contents( dirname( __FILE__ ) . '/_data/css/min/custom.min.css' ),
				'message'  => 'custom'
			],

		];
	}

	/**
	 * @dataProvider getCssOptimizeData
	 */
	public function testOptimize( $css, $expected, $message )
	{
		$actual = Css::optimize( $css );

		$this->assertEquals( $expected, $actual, $message );
	}
}
