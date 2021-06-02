<?php

/**
 * @package   codealfa/minify
 * @author    Samuel Marshall <sdmarshall73@gmail.com>
 * @copyright Copyright (c) 2020 Samuel Marshall
 * @license   GNU/GPLv3, or later. See LICENSE file
 *
 * If LICENSE file missing, see <http://www.gnu.org/licenses/>.
 */

namespace CodeAlfa\Minify;

use CodeAlfa\RegexTokenizer\Debug\Debug;

abstract class Base
{
        use Debug;

	protected function __construct($options)
	{
		foreach ($options as $key => $value)
		{
			$this->{'_' . $key} = $value;
		}

		if (!defined('CODEALFA_MINIFY_CONFIGURED'))
		{
			ini_set('pcre.backtrack_limit', 1000000);
			ini_set('pcre.recursion_limit', 100000);
			ini_set('pcre.jit', 0);

			define('CODEALFA_MINIFY_CONFIGURED', 1);
		}
	}

	/**
	 *
	 * @staticvar bool $tm
	 *
	 * @param   string    $regex
	 * @param   string    $replacement
	 * @param   string    $code
	 * @param   mixed     $regex_num
	 * @param   callable  $callback
	 *
	 * @return string
	 * @throws \Exception
	 */
	protected function _replace($regex, $replacement, $code, $regex_num, $callback = null)
	{
		static $tm = false;

		if ($tm === false)
		{
			$this->_debug('', '');
			$tm = true;
		}

		if (empty($callback))
		{
			$op_code = preg_replace($regex, $replacement, $code);
		}
		else
		{
			$op_code = preg_replace_callback($regex, $callback, $code);
		}

		$this->_debug($regex, $code, $regex_num);

		$error = array_flip(array_filter(get_defined_constants(true)['pcre'], function ($value) {
			return substr($value, -6) === '_ERROR';
		}, ARRAY_FILTER_USE_KEY))[preg_last_error()];

		if (preg_last_error() != PREG_NO_ERROR)
		{
			throw new \Exception($error);
		}

		return $op_code;
	}

}
