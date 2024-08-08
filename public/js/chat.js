// Адрес прокси
const glProxyUrl = 'proxy.php';
// Текущий пользователь
let glCurrentUser = {'id': 0};

// DOM
const selStates = document.getElementById('selStates');

// Отправляет запрос в BotKit
// reqType - тип запроса
// reqDetails - детали запроса
// userObj - объект пользователя
function makeRequest(reqType, reqDetails, userObj) {
    return fetch(glProxyUrl, {
        method: "POST",
        body: JSON.stringify({
            type: reqType,
            details: reqDetails,
            user: userObj
        })
    });
}

// Обновляет список состояний
async function updateStatesList() {
    const response = await makeRequest('statesRequest', {}, glCurrentUser);
    const data = await response.json();
    const details = data[0].details;
    details.forEach((state) => {
        const opt = document.createElement('option');
        opt.textContent = state.name;
        opt.value = state.id;
        selStates.append(opt);
    });
}

// При загрузке страницы...
updateStatesList();