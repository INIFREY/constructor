<?php
/**
 * Created by PhpStorm.
 * User: Валерий
 * Date: 08.03.2017
 * Time: 23:44
 */

$html = "";
$projectName = $_POST['settings']['name'];
$layoutType = $_POST['settings']['layout'];
$header = $_POST['request']['header'];
$main = $_POST['request']['content'];
$footer = $_POST['request']['footer'];
$sidebar = $_POST['request']['sidebar'];
$sidebar2 = $_POST['request']['sidebar2'];


$html.="<!DOCTYPE html><html><head><meta charset='UTF-8'>";
$html.="<title>$projectName</title>";
$html.="<link rel='stylesheet' href='../../css/jquery-ui.min.css'>";
$html.="<link rel='stylesheet' href='../style.css'>";
$html.="<script src='../../js/jquery-1.9.1.min.js'></script>";
$html.="<script src='../../js/jquery-ui.min.js'></script>";
$html.="<script src='../main.js'></script>";
$html.="</head><body>";

if ($layoutType==1){
    $html.="<header>";
    foreach ($header as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</header><main>";
    foreach ($main as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</main><footer>";
    foreach ($footer as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</footer>";
}

elseif ($layoutType==2){
    $html.="<header>";
    foreach ($header as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</header><main class='left'>";
    foreach ($main as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</main><aside>";
    foreach ($sidebar as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</aside><footer>";
    foreach ($footer as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</footer>";
}

elseif ($layoutType==3){
    $html.="<header>";
    foreach ($header as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</header><aside>";
    foreach ($sidebar as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</aside> <main class='right'>";
    foreach ($main as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</main><footer>";
    foreach ($footer as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</footer>";
}
elseif ($layoutType==4){
    $html.="<header>";
    foreach ($header as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</header><aside>";
    foreach ($sidebar as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</aside> <main class='center'>";
    foreach ($main as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</main><aside>";
    foreach ($sidebar2 as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</aside><footer>";
    foreach ($footer as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</footer>";
} else {
    return ['status'=>'error', 'text'=>"Не выбран шаблон!"];
}


$html.="</body></html>";
$randName = rand(1000000, 9999999);
while (file_exists("created/html/$randName.html")) $randName = rand(10000000, 99999999);
$fileName="created/html/$randName.html";
$file = fopen($fileName, "w");
fwrite($file, $html);
fclose($file);
echo $fileName;


function widget($name, $settings){
    $result = "";
    switch ($name) {
        case "logo":
            $title = $settings['name'];
            $link = $settings['link'];
            $result.="<img class='logo' src='$link' title='$title'/>";
            break;
        case "topMenu":
            $result.="<ul class='topMenu'>";
            for($i=0; $i<count($settings['link']); $i++){
                $l = $settings['link'][$i];
                $t = $settings['text'][$i];
                $result.="<li><a href='$l'>$t</a></li>";
            }
            $result.="</ul>";
//
//            ob_start();
//            var_dump($settings);
//            $dump = ob_get_contents();
//            ob_end_clean();
//
//            $result.="<pre>$dump</pre>";
            break;
        case "text":
            $text = $settings['text'];
            $result.="<p class='textBlock'>$text</p>";
            break;
        case "copyright":
            $text = $settings['text'];
            $result.="<p class='copyright'>&copy; $text</p>";
            break;
        case "calendar":
            $result.="<div class='calendar'></div>";
            break;
        case "h1":
            $text = $settings['text'];
            $result.="<h1>$text</h1>";
            break;
        case "h2":
            $text = $settings['text'];
            $result.="<h2>$text</h2>";
            break;
        case "advBlock":
            $title = $settings['name'];
            $link = $settings['link'];
            $img = $settings['img'];
            $result.="<a class='advBlock' href='$link' target='_blank'><img src='$img' title='$title'></a>";
            break;
        case "sideMenu":
            $result.="<ul class='sideMenu'>";
            for($i=0; $i<count($settings['link']); $i++){
                $l = $settings['link'][$i];
                $t = $settings['text'][$i];
                $result.="<li><a href='$l'>$t</a></li>";
            }
            $result.="</ul>";
            break;
        case "list":
            $result.="<ul class='list'>";
            for($i=0; $i<count($settings['text']); $i++){
                $t = $settings['text'][$i];
                $result.="<li>$t</li>";
            }
            $result.="</ul>";
            break;
    }
    return $result;
}