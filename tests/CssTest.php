<?php

namespace CodeAlfa\Minify\Tests;

use PHPUnit\Framework\TestCase;
use CodeAlfa\Minify\Css;


/**
 * JsMin Unit Test
 */
class CssTest extends TestCase
{
//	public function testMinify_testcss()
//	{
//		$result = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/test.css'));
//	}
//
	public function testMinify_Comments()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/comments.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/comments.min.css');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_HttpInUrl()
	{
		$result = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/httpinurl.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/httpinurl.min.css');
		$this->assertEquals($expected, $result);
	}
	public function testMinify_Issue210()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/issue210.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/issue210.min.css');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Issue62()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/issue62.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/issue62.min.css');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_PathsPrepend()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/paths_prepend.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/paths_prepend.min.css');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Selectors()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/selectors.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/selectors.min.css');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Styles()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/styles.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/styles.min.css');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Subsilver()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/subsilver.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/subsilver.min.css');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_UnusualStrings()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/unusual_strings.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/unusual_strings.min.css');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Vladmirated()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/vladmirated.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/vladmirated.min.css');
		$this->assertEquals($expected, $result);
	}

	public function testMinify_Custom()
	{
		$result   = Css::optimize(file_get_contents(dirname(__FILE__) . '/css/custom.css'));
		$expected = file_get_contents(dirname(__FILE__) . '/css/min/custom.min.css');
		$this->assertEquals(trim($expected), $result);
	}
}
