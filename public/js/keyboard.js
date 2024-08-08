const api_base = 'http://localhost:7788/api/';
const layout = [[]];
const keyboardCore = document.getElementById("keyboardCore");
const kbAddRow = document.getElementById("kbAddRow");
const lastRow = document.getElementById("lastRow");
const inpButtonLabel = document.getElementById("inpButtonLabel");
const selButtonColor = document.getElementById("selButtonColor");
const inpKeyboardClassName = document.getElementById("inpKeyboardClassName");
const btnGetCode = document.getElementById("btnGetCode");
const btnGetLayout = document.getElementById("btnGetLayout");

const btnOptGeneral = document.getElementById("btnOptGeneral");
const btnOptButton = document.getElementById("btnOptButton");

const optionsGeneral = document.getElementById("optionsGeneral");
const optionsButton = document.getElementById("optionsButton");

let currentButtonX = 0;
let currentButtonY = 0;

btnOptGeneral.onclick = () => {
    optionsGeneral.classList.remove('hidden');
    optionsButton.classList.add('hidden');
}

btnOptButton.onclick = () => {
    optionsGeneral.classList.add('hidden');
    optionsButton.classList.remove('hidden');
}

// Скачивает разметку
btnGetLayout.onclick = () => {
    const classTitle = inpKeyboardClassName.value;
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(layout));
    const a = document.createElement('a');
    a.href = dataStr;
    a.download = classTitle + '.json';
    a.click();
}

btnGetCode.onclick = () => {
    const classTitle = inpKeyboardClassName.value;
    
    fetch(api_base + 'getKeyboardClass.php', {
        method: 'post',
        body: JSON.stringify({
            'classTitle': classTitle,
            'layout': layout,
            'inline': false,
            'one_time': false
        })
    })
    .then(res => res.blob())
    .then(data => {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(data);
        a.download = classTitle + '.php';
        a.click();
    });
}

// Устанавливает свойства кнопки в боковой панели
// x - позиция кнопки в строке
// y - позиция строки кнопки в разметке
function sidebarButtonProperty(x, y) {
    currentButtonX = x;
    currentButtonY = y;
    
    const button = layout[y][x];
    inpButtonLabel.value = button.name;
}

function getHTMLFromObj(obj, x, y) {
    const button = document.createElement("button");
    button.textContent = obj.name;
    button.classList.add("kbBtn", obj.color);
    
    button.dataset.x = x;
    button.dataset.y = y;
    
    button.onclick = () => {
        sidebarButtonProperty(x, y);
    }
    
    return button;
}

$("#keyboardCore").on("click", ".kbAddBtn", function() {
    const newY = this.dataset.row;
    const newX = layout[newY].length;
    const row = keyboardCore.children[newY];
    
    const buttonObj = 
    {
        name: "Новая кнопка x:" + String(newX) + " y:" + String(newY),
        color: "kbColorPrimary"
    };
    layout[newY].push(buttonObj);
    const buttonHTML = getHTMLFromObj(buttonObj, newX, newY);
    
    row.insertBefore(buttonHTML, this);
});

$("#kbAddRow").on("click", function() {
    layout.push([]);
    
    const row = document.createElement("div");
    row.classList.add("kbBtnRow");
    
    const btnAdd = document.createElement("button");
    btnAdd.classList.add("kbBtn", "kbAdd", "kbAddBtn");
    btnAdd.textContent = "+ Добавить кнопку";
    btnAdd.dataset.row = layout.length - 1;
    
    row.append(btnAdd);
    keyboardCore.insertBefore(row, lastRow);
});

$("#btnUpdateButton").on("click", function() {
    const buttonObj = layout[currentButtonY][currentButtonX];
    const buttonHTML = keyboardCore.children[currentButtonY].children[currentButtonX];
    
    // Обновить название
    buttonObj.name = inpButtonLabel.value;
    buttonHTML.textContent = buttonObj.name;
    
    // Обновить цвет
    const colorId = selButtonColor.value;
    let colorClass;
    if (colorId == 0) {
        colorClass = 'kbColorPrimary';
    } else if (colorId == 1) {
        colorClass = 'kbColorSecondary';
    } else if (colorId == 2) {
        colorClass = 'kbColorPositive';
    } else if (colorId == 3) {
        colorClass = 'kbColorNegative';
    }
    buttonHTML.classList.replace(buttonObj.color, colorClass);
    buttonObj.color = colorClass;
});
