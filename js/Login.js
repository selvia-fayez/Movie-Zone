var arr = [];
window.addEventListener("load", function () {
  arr = JSON.parse(this.localStorage.getItem("users"));
});
var loginbtn = document.getElementById("submit-btn");
loginbtn.addEventListener("click", checkData);

function checkData(event) {
  event.preventDefault();
  if (arr == null) {
    alert("You Should create an account before login");
  } else {
    var flag = false;
    var UserName = document.getElementById("username");
    var Password = document.getElementById("password");
    if (UserName.value != "" && Password.value != "") {
      arr.forEach((user) => {
        if (UserName.value == user.username) {
          if (Password.value == user.pass) {
            flag = true;
            //enter home page
            location.replace("../html/Home.html");
          }
        }
      });
      if (flag == false) {
        alert("Wrong User Name or Password");
      }
    } else {
      alert("You Should Enter All Data");
    }

    UserName.value = "";
    Password.value = "";
  }
}
