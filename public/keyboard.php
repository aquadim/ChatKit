<?php require_once "htmlStart.php" ?>
<link rel="stylesheet" href="/css/keyboard.css">
<?php require_once "bodyStart.php" ?>

<main>
    <div id='optionsSidebar' class='sidebar'>
        
        <div>
            <button id='btnOptGeneral'>Общие опции</button>
            <button id='btnOptButton'>Свойства кнопки</button>
        </div>
        
        <div id='optionsGeneral'>
            <input id='inpKeyboardClassName' placeholder="Название класса"/>
            <button id='btnGetCode' class='btn'>Получить PHP файл</button>
            <button id='btnGetLayout' class='btn'>Сохранить разметку</button>
        </div>
        
        <div id='optionsButton' class='hidden'>
            <input 
            id='inpButtonLabel' 
            placeholder='Название кнопки'
            autocomplete="off"/>
            
            <select id='selButtonColor'>
                <option value='0'>primary</option>
                <option value='1'>secondary</option>
                <option value='2'>positive</option>
                <option value='3'>negative</option>
            </select>
            
            <button id='btnUpdateButton'>Сохранить кнопку</button>
        </div>
    </div>
    
    <div id='keyboardCore'>
        <div class="kbBtnRow">
            <button class="kbBtn kbAdd kbAddBtn" data-row="0">+ Добавить кнопку</button>
        </div>
        <div class="kbBtnRow" id="lastRow">
            <button id="kbAddRow" class="kbBtn kbAdd">+ Добавить строку</button>
        </div>
    </div>
</main>

<script src='/js/jquery-3.7.1.min.js.js'></script>
<script src='/js/keyboard.js'></script>
<?php require_once "htmlEnd.php" ?>
