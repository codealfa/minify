<?php

namespace CodeAlfa\Minify\Tests;

use PHPUnit\Framework\TestCase;
use CodeAlfa\Minify\Html;

/**
 *
 */
class HtmlTest extends TestCase
{
	protected $options;

	protected function setup(): void
	{
		parent::setup();

		$aOptions = array();

		$aOptions['cssMinifier'] = array('CodeAlfa\Minify\Css', 'optimize');
		$aOptions['jsMinifier'] = array('CodeAlfa\Minify\Js', 'optimize');
		$aOptions['jsonMinifier'] = array('CodeAlfa\Minify\Json', 'optimize');
		$aOptions['minifyLevel'] = 2;

		$this->options = $aOptions;

	}

	public function testHTML_a_basic()
	{
		$options = array();
		$options['minifyLevel'] = 0;

		$result   = Html::optimize(file_get_contents(dirname(__FILE__) . '/html/html_a.html'), $options);
		$expected = file_get_contents(dirname(__FILE__) . '/html/min/html_a_basic.min.html');
		$this->assertEquals(trim($expected), $result);
	}

	public function testHTML_a_advanced()
	{
		$options = array();
		$options['minifyLevel'] = 1;

		$result   = Html::optimize(file_get_contents(dirname(__FILE__) . '/html/html_a.html'), $options);
		$expected = file_get_contents(dirname(__FILE__) . '/html/min/html_a_advanced.min.html');
		$this->assertEquals(trim($expected), $result);
	}

	public function testHTML_a()
	{
		$this->options['isXhtml'] = false;
		$this->options['isHtml5'] = true;

		$result   = Html::optimize(file_get_contents(dirname(__FILE__) . '/html/html_a.html'), $this->options);
		$expected = file_get_contents(dirname(__FILE__) . '/html/min/html_a.min.html');
		$this->assertEquals(trim($expected), $result);
	}

	public function testHTML_b()
	{
		$this->options['isXhtml'] = true;
		$this->options['isHtml5'] = false;

		$result   = Html::optimize(file_get_contents(dirname(__FILE__) . '/html/html_b.html'), $this->options);
		$expected = trim(file_get_contents(dirname(__FILE__) . '/html/min/html_b.min.html'));
		//	echo 'expected = ' . $expected;
		//	echo 'result = ' .  $result;
		//	exit;


		$this->assertEquals($expected, $result);
	}

//	public function testTest()
//        {
//                $this->options['isXhtml'] = false;
//                $this->options['isHtml5'] = true;
//
//               $result = Html::optimize(file_get_contents(dirname(__FILE__) . '/html/html_test.html'), $this->options);
//                return false;
//        }
}
