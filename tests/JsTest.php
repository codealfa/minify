<?php

namespace CodeAlfa\Minify\Tests;

use PHPUnit\Framework\TestCase;
use CodeAlfa\Minify\Js;

/**
 *
 */
class JsTest extends TestCase
{
	public function testMinify_T3assets()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/t3-assets.js'));
		$expected = trim(file_get_contents(dirname(__FILE__) . '/javascript/min/t3-assets.min.js'));
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Angular()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/angular.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/angular.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_BetaPlatinumTrans()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/beta.platinumtrans.net.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/beta.platinumtrans.net.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Bootstrap()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/bootstrap.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/bootstrap.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Com_Community_Toolkit()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/com_community.toolkit.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/com_community.toolkit.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Com_Csslint()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/csslint.js'));
		$expected = trim(file_get_contents(dirname(__FILE__) . '/javascript/min/csslint.min.js'));
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Dojo()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/dojo.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/dojo.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_EasySocial()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/easysocial.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/easysocial.min.js');
		file_put_contents(dirname(__FILE__) . '/javascript/min/easysocial.result.js', $result);
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Ext()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/ext.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/ext.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_FreshchatWidget()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/freshchat-widget.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/freshchat-widget.min.js');
		$this->assertEquals(trim($expected), $result);
	}

	public function testMinify_Jomres_Datatables()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/jomres.datatables.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/jomres.datatables.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_jQuery()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/jquery.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/jquery.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_jQueryPrettyPhoto()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/jquery.prettyPhoto.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/jquery.prettyPhoto.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Kunena()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/kunena.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/kunena.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Mootools()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/mootools.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/mootools.min.js');
		$this->assertEquals($expected, $result);
	}

//        public function testMinify_Mootools_More()
//        {
//                $result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/mootools-more.js'));
//                $expected = file_get_contents(dirname(__FILE__) . '/javascript/min/mootools-more.min.js');
//                $this->assertEquals($expected, $result);
//        }


	public function testMinify_PHP()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/php.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/php.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Prototype()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/prototype.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/prototype.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Script()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/script.js'));
		$expected = trim(file_get_contents(dirname(__FILE__) . '/javascript/min/script.min.js'));
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Twitter()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/twitter-widgets.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/twitter-widgets.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_UIZE()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/uize.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/uize.min.js');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_YUI()
	{
		$result   = Js::optimize(file_get_contents(dirname(__FILE__) . '/javascript/yui.js'));
		$expected = file_get_contents(dirname(__FILE__) . '/javascript/min/yui.min.js');
		$this->assertEquals($expected, $result);
	}

}
