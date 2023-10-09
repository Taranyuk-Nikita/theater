const btn_pay = document.querySelector('#btn_pay')

btn_pay.addEventListener('click', (event) => {
    event.preventDefault();

    console.log(alert('bonk!'));
})

function bonk() {
    // event.preventDefault();
    // const data = {
    //   username: document.forms.auth.elements.username.value,
    //   password: document.forms.auth.elements.password.value
    // }
    // fetch("/in", {
    //   method:"POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res => res.text())
    // .then(txt => {
    //   if (txt=="OK") { location.href = "/adminpanel"; }
    //   else { alert(txt); }
    // })
    // .catch(err => console.error(err));
    // return false;
    console.log(alert('bonk!'));
}

console.log(document.querySelectorAll('option[data-ets]'));
document.querySelectorAll('option[data-ets]').forEach(item => {
    item.addEventListener('click', bonk)
})

document.querySelector('#event_title').addEventListener('change', bonk)