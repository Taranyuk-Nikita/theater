function logout() {
  fetch("/out", { method:"POST" })
  .then(res => res.text())
  .then(txt => {
    if (txt=="OK") { location.href = "/"; }
    else { alert(txt); }
  })
  .catch(err => console.error(err));
}