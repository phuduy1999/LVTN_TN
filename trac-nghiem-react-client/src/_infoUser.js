
function InfoUserLogin() {
  let user;

  if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
  }

  return user;
}

export default InfoUserLogin;
