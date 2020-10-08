<?php

namespace CodeAlfa\Minify\Tests;

use PHPUnit\Framework\TestCase;
use CodeAlfa\Minify\Js;

/**
 *
 */
class Js_minTest extends TestCase
{

	public function testMinify_Angular()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/angular.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/angular.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_BetaPlatinumTrans()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/beta.platinumtrans.net.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/beta.platinumtrans.net.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Bootstrap()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/bootstrap.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/bootstrap.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Dojo()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/dojo.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/dojo.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Ext()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/ext.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/ext.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_jQuery()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/jquery.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/jquery.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_jQueryPrettyPhoto()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/jquery.prettyPhoto.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/jquery.prettyPhoto.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Mootools()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/mootools.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/mootools.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_PHP()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/php.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/php.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Prototype()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/prototype.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/prototype.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_UIZE()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/uize.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/uize.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_YUI()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/yui.min.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/yui.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_LineFeed()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/min/line-feed.min.js'));
		$expected = trim(file_get_contents(dirname(__FILE__) . '/javascript/min/line-feed.min.js'));
		$this->assertEquals($expected, $result);
	}
}
