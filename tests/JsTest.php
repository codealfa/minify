<?php

namespace CodeAlfa\Minify\Tests;

use PHPUnit\Framework\TestCase;
use CodeAlfa\Minify\Js;

/**
 *
 */
class JsTest extends TestCase
{
	public function getOptimizeJsData(): array
	{
		return [
			[
				'name' => 't3-assets'
			],
			[
				'name' => 'angular'
			],
			[
				'name' => 'beta.platinumtrans.net'
			],
			[
				'name' => 'bootstrap'
			],
			[
				'name' => 'com_community.toolkit'
			],
			[
				'name' => 'csslint'
			],
			[
				'name' => 'dojo'
			],
			[
				'name' => 'easysocial'
			],
			[
				'name' => 'ext'
			],
			[
				'name' => 'freshchat-widget'
			],
			[
				'name' => 'jomres.datatables'
			],
			[
				'name' => 'jquery'
			],
			[
				'name' => 'jquery.prettyPhoto'
			],
			[
				'name' => 'kunena'
			],
			[
				'name' => 'mootools'
			],
			/*[
				'name' => 'mootools-more'
			],*/
			[
				'name' => 'php'
			],
			[
				'name' => 'prototype'
			],
			[
				'name' => 'script'
			],
			[
				'name' => 'twitter-widgets'
			],
			[
				'name' => 'uize'
			],
			[
				'name' => 'yui'
			]
		];
	}

	/**
	 * @dataProvider getOptimizeJsData
	 */
	public function testOptimize( $name )
	{
		$js    = $this->getJs( $name );
		$jsMin = $this->getJsMin( $name );

		$actual = Js::Optimize( $js );

		$this->assertEquals( $jsMin, $actual, $name );

		$actualMin = Js::Optimize( $jsMin );

		$this->assertEquals( $jsMin, $actualMin, $name . '_min' );

	}

	private function getJs( $name )
	{
		return file_get_contents( dirname( __FILE__ ) . '/_data/javascript/' . $name . '.js' );
	}

	private function getJsMin( $name )
	{
		return file_get_contents( dirname( __FILE__ ) . '/_data/javascript/min/' . $name . '.min.js' );
	}
}
