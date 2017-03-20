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

$html.="<!DOCTYPE html><html><head><meta charset='UTF-8'>";
$html.="<title>$projectName</title>";
$html.="</head><body>";

if ($layoutType==1){
    $html.="<header>";
    foreach ($header as $widget){
        $html.= widget($widget['name'], $widget['settings']);
    }
    $html.="</header>";
}


$html.="</body></html>";
$fileName="created/html/".rand(1000000, 9999999).".html";
//  TODO: Тут заделать проверку, существует ли файл с таким именем
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
            $result.="<img src='$link' title='$title'/>";
            break;
    }
    return $result;
}