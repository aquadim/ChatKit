<?php
// Возвращает класс клавиатуры на основе разметки из keyboard.php

$raw_data = file_get_contents('php://input');
$data = json_decode($raw_data, true);
$layout = $data['layout'];

$php_start = [
'<?php',
'',
'namespace BotKit\\Keyboards;',
''
];

// USE выражения
$use_statements = ['use BotKit\\Enums\\ButtonColor;'];

// Какой класс расширяется
if (!$data['inline']) {
    $extends_class = 'TextKeyboard';
} else {
    $extends_class = 'InlineKeyboard';
}
$use_statements[] = 'use BotKit\\Models\\Keyboards\\'.$extends_class.';';

// Определение класса
$one_time_value = $data['one_time'] ? 'true' : 'false';
$class_definition = [
'',
'class '.$data['classTitle'].' extends '.$extends_class.' {',
'',
'    protected bool $cacheable = true;',
'    protected bool $one_time = ' . $one_time_value . ';',
'',
'    public function __construct() {',
'        $this->layout = ['
];
$layout_expr = [];
foreach ($layout as $row) {
    $layout_expr[] = "[";
    foreach ($row as $button) {
        $button_name = $button['name'];
        switch ($button['color']) {
            case 'kbColorPrimary':
                $button_color = 'ButtonColor::Primary';
                break;
            case 'kbColorSecondary':
                $button_color = 'ButtonColor::Secondary';
                break;
            case 'kbColorPositive':
                $button_color = 'ButtonColor::Positive';
                break;
            case 'kbColorNegative':
                $button_color = 'ButtonColor::Negative';
                break;
            default:
                $button_color = 'ButtonColor::Primary';
                break;
        }
        $layout_expr[] = 'new TextKeyboardButton("'.$button_name.'", '.$button_color.'),';
    }
    $layout_expr[] = "],";
}
$class_definition[] = implode("\n", $layout_expr);
$class_definition[] = '        ];';
$class_definition[] = '    }';
$class_definition[] = '}';

// Сборка
$php_file = array_merge($php_start, $use_statements, $class_definition);

header('Content-Type: application/download');
foreach ($php_file as $line) {
    echo $line;
    echo "\n";
}
