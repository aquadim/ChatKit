<?php require_once "htmlStart.php" ?>
<link rel="stylesheet" href="/css/chat.css">
<?php require_once "bodyStart.php" ?>

<div id='chatWindow'>
  <div id='chatListSidebar' class='chatSidebar'>
    <button id='addChat'>Добавить чат</button>
    <div id='chatList'>
      <div class='chatEntry'>Вадим Королёв</div>
      <div class='chatEntry'>Виталий Романов</div>
    </div>
  </div>

  <div id='chatCore'>
    <div id="messagesList">
    </div>
    <div id="userInput">
      <input id="inpUserMessage" placeholder="Сообщение боту"/>
      <button id="btnSendMessage">Отправить</button>
    </div>
  </div>

  <div id='actionsSidebar' class='chatSidebar'>
    <select id='selStates'></select>
  </div>
</div>

<script src='/js/chat.js'></script>
<?php require_once "htmlEnd.php" ?>