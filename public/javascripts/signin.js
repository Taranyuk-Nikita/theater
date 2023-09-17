function signin () {
  const data = {
    username: document.forms.auth.elements.username.value,
    password: document.forms.auth.elements.password.value
  }
  fetch("/in", {
    method:"POST",
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.text())
  .then(txt => {
    if (txt=="OK") { location.href = "/adminpanel"; }
    else { alert(txt); }
  })
  .catch(err => console.error(err));
  return false;
}