<?php

$js = file_get_contents(dirname(__FILE__) . '/ext1.js');

header('Content-type: text/javascript; charset=UTF-8');

echo $js;