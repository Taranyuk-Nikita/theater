function logout() {
  fetch("/out", { method: "POST" })
    .then(res => res.text())
    .then(txt => {
      if (txt == "OK") { location.href = "/"; }
      else { alert(txt); }
    })
    .catch(err => console.error(err));
}

function getPosters(tableName) {
  fetch(`/table/${tableName}`, { method: "get" })
    .then(res => res.json())
    .then(result => {
      let thead = `
      <thead>
            <tr>
                <th>#</th>
                <th>Мероприятие</th>
                <th>Дата/Время</th>
                <th>Цена</th>
                <th>Всего билетов</th>
                <th>Билетов продано</th>
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
          <td>${element.poster_amount_tickets} шт.</td>
          <td>${element.poster_tickets_sold} шт.</td>
          <td><a href="#" onclick="return getPoster('${element.poster_id}')">Редактировать</a></td>
          <td><a href="#" onclick="return deletePoster('${element.poster_id}')">Удалить</a></td>
        </tr>
      `
      })

      document.querySelector('.workspace__title').innerHTML = `Афиша`
      document.querySelector('.workspace_btns').innerHTML = `
      <button type="button" id='addPoster'>Добавить мероприятие</button>
    `
      document.querySelector('.workspase__table').innerHTML = `
      <table>
      ${thead}
      <tbody>
      ${tbody}
      </tbody>
      </table>
    `
      getEventsForPoster()
      openModal = document.querySelector('#addPoster')
      openModal.addEventListener('click', () => {
        document.querySelector('.form').reset()
        document.querySelector('#modalPoster').querySelector('.form').setAttribute('data-function', 'create')
        modalPoster.classList.add('active')
      })
    })
    .catch(err => console.error(err));
}
function getRepertoire(tableName) {
  fetch(`/table/${tableName}`, { method: "get" })
    .then(res => res.json())
    .then(result => {
      let thead = `
      <thead>
            <tr>
                <th>#</th>
                <th>Заголовок</th>
                <th>Продолжительность (в мин.)</th>
                <th>Рейтинг</th>
                <th>Пушкинская карта</th>
                <th colspan="3">Опции</th>
            </tr>
        </thead>
    `
      let tbody = ``
      let counter = 0
      result.forEach(element => {
        if (element.event_pushka == true) element.event_pushka = 'Участвует'
        else element.event_pushka = 'Не участвует'
        tbody += `
          <tr>
          <td>${++counter}</td>
          <td>${element.event_title}</td>
          <td>${element.event_duration}</td>
          <td>${element.event_rating}+</td>
          <td>${element.event_pushka}</td>
          <td><a href="/event/${element.event_id}" target="_blank">Посмотреть</a></td>
          <td><a href="#" onclick="return getEvent('${element.event_id}')">Редактировать</a></td>
          <td><a href="#" onclick="return deleteEvent('${element.event_id}')">Удалить</a></td>
        </tr>
      `
      })

      document.querySelector('.workspace__title').innerHTML = `Репертуар`
      document.querySelector('.workspace_btns').innerHTML = `
      <button type="button" id='addEvent'>Добавить мероприятие</button>
    `
      document.querySelector('.workspase__table').innerHTML = `
      <table>
      ${thead}
      <tbody>
      ${tbody}
      </tbody>
      </table>
    `
      openModal = document.querySelector('#addEvent')
      openModal.addEventListener('click', () => {
        document.querySelector('.form').reset()
        document.querySelector('#modalEvent').querySelector('.form').setAttribute('data-function', 'create')
        modalEvent.classList.add('active')
      })
    })
    .catch(err => console.error(err));
}