function logout() {
  fetch("/out", { method:"POST" })
  .then(res => res.text())
  .then(txt => {
    if (txt=="OK") { location.href = "/"; }
    else { alert(txt); }
  })
  .catch(err => console.error(err));
}

function getPoster( tableName ) {
  fetch(`/table/${tableName}`, { method:"get" })
  .then(res => res.json())
  .then(result => {
    let thead = `
      <thead>
            <tr>
                <th>#</th>
                <th>Мероприятие</th>
                <th>Дата/Время</th>
                <th>Цена</th>
                <th colspan="2">Опции</th>
            </tr>
        </thead>
    `
    let tbody = ``
    let counter = 0
    result.forEach(element => {
      tbody += `
          <tr>
          <td>${++counter}</td>
          <td>${element.event_title}</td>
          <td>${new Date(element.poster_datetime).toLocaleString()}</td>
          <td>${element.poster_price} ₽</td>
          <td>Редактировать</td>
          <td>Удалить</td>
        </tr>
      `
    })
    
    document.querySelector('.workspace__title').innerHTML = `Расписание`
    document.querySelector('.workspace_btns').innerHTML = `
      <button type="button">Выгрузить отчёт</button>
      <button type="button">Добавить мероприятие</button>
    `
    document.querySelector('.workspase__table').innerHTML = `
      <table>
      ${thead}
      <tbody>
      ${tbody}
      </tbody>
      </table>
    `
  })
  .catch(err => console.error(err));
}
function getRepertoire( tableName ) {
  fetch(`/table/${tableName}`, { method:"get" })
  .then(res => res.json())
  .then(result => {
    let thead = `
      <thead>
            <tr>
                <th>#</th>
                <th>Заголовок</th>
                <th>Продолжительность (в мин.)</th>
                <th>Рейтинг</th>
                <th colspan="2">Опции</th>
            </tr>
        </thead>
    `
    let tbody = ``
    let counter = 0
    result.forEach(element => {
      tbody += `
          <tr>
          <td>${++counter}</td>
          <td>${element.event_title}</td>
          <td>${element.event_duration}</td>
          <td>${element.event_rating}+</td>
          <td>Редактировать</td>
          <td>Удалить</td>
        </tr>
      `
    })
    
    document.querySelector('.workspace__title').innerHTML = `Репертуар`
    document.querySelector('.workspace_btns').innerHTML = `
      <button type="button">Выгрузить отчёт</button>
      <button type="button">Добавить мероприятие</button>
    `
    document.querySelector('.workspase__table').innerHTML = `
      <table>
      ${thead}
      <tbody>
      ${tbody}
      </tbody>
      </table>
    `
  })
  .catch(err => console.error(err));
}