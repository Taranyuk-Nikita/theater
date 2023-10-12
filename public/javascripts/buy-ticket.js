window.addEventListener("DOMContentLoaded", function () {
    [].forEach.call(document.querySelectorAll('#client_phone'), function (input) {
        var keyCode;
        function mask(event) {
            event.keyCode && (keyCode = event.keyCode);
            var pos = this.selectionStart;
            if (pos < 3) event.preventDefault();
            var matrix = "+7 (___) ___ __ __",
                i = 0,
                def = matrix.replace(/\D/g, ""),
                val = this.value.replace(/\D/g, ""),
                new_value = matrix.replace(/[_\d]/g, function (a) {
                    return i < val.length ? val.charAt(i++) : a
                });
            i = new_value.indexOf("_");
            if (i != -1) {
                i < 5 && (i = 3);
                new_value = new_value.slice(0, i)
            }
            var reg = matrix.substr(0, this.value.length).replace(/_+/g,
                function (a) {
                    return "\\d{1," + a.length + "}"
                }).replace(/[+()]/g, "\\$&");
            reg = new RegExp("^" + reg + "$");
            if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
                this.value = new_value;
            }
            if (event.type == "blur" && this.value.length < 5) {
                this.value = "";
            }
        }

        input.addEventListener("input", mask, false);
        input.addEventListener("focus", mask, false);
        input.addEventListener("blur", mask, false);
        input.addEventListener("keydown", mask, false);

    });

});


const params = new URLSearchParams(document.location.search);
const eventId = params.get("event");
const posterId = params.get("poster");
let once = true

let poster_tickets

function getposter() {
    fetch(`/buyticket/getposter/${document.querySelector('#event_title').value}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(result => {
            let event_poster_options = ``
            poster_tickets = []
            result.forEach(({ poster_id, poster_datetime, poster_price, poster_amount_tickets, poster_tickets_sold }) => {
                event_poster_options += `
                    <option value="${poster_id}">${new Date(poster_datetime).toLocaleString('ru-RU', { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric", weekday: "long" })}</option>
                `
                obj = {
                    poster_id: poster_id,
                    price: poster_price,
                    left: poster_amount_tickets - poster_tickets_sold
                }
                poster_tickets.push(obj)
            })
            document.querySelector('#event_poster').removeAttribute("disabled")
            document.querySelector('#event_poster').innerHTML = event_poster_options
            if (posterId && once) {
                document.querySelector('#event_poster').querySelector(`option[value="${posterId}"]`).setAttribute('selected', 'selected')
                once = false
            }
            if (document.querySelector('#event_poster').value != 0) insertTicket()
            
            if (document.querySelector('#event_title').querySelector(`option[value='${document.querySelector('#event_title').value}']`).getAttribute('data-pushka') == 'true') {
                document.querySelector('#order_payment').querySelector("option[value='2']").removeAttribute('hidden')
            } else {
                document.querySelector('#order_payment').querySelector("option[value='2']").setAttribute('hidden', '')
            }
            document.querySelector('#order_payment').value = 0
            
        })
        .catch(err => console.error(err));

}

function insertTicket() {
    active_poster = document.querySelector('#event_poster').value
    document.querySelector('#tickets_left').innerHTML = `<nobr>${poster_tickets.find(elem => elem.poster_id === active_poster).left} шт.</nobr>`
    document.querySelector('#tickets_left').removeAttribute('style')
    document.querySelector('#tickets_price').innerHTML = `<nobr>${poster_tickets.find(elem => elem.poster_id === active_poster).price} ₽</nobr>`
    document.querySelector('#tickets_price').removeAttribute('style')
}

if (eventId) {
    document.querySelector('#event_title').querySelector(`option[value="${eventId}"]`).setAttribute('selected', 'selected')
}
document.querySelector('#event_title').addEventListener('change', getposter)
if (document.querySelector('#event_title').value != 0) getposter()

document.querySelector('#event_poster').addEventListener('change', insertTicket)





const btn_pay = document.querySelector('#btn_pay')

btn_pay.addEventListener('click', (event) => {
    event.preventDefault();

    console.log(alert('bonk!'));
})




