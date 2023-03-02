var arr = [];
var i;
window.addEventListener("load", function () {
  arr = JSON.parse(this.localStorage.getItem("users"));
  if (arr == null) {
    arr = [];
    i = 0;
  } else {
    i = arr.length;
  }
});

var Regbtn = document.getElementById("submit-btn");
Regbtn.addEventListener("click", SaveData);
function SaveData(event) {
  event.preventDefault();
  var UserName = document.getElementById("username");
  var Email = document.getElementById("email");
  var Phone = document.getElementById("phone");
  var Password = document.getElementById("pass");
  var ConfirmPassword = document.getElementById("confirmpass");

  if (
    UserName.value != "" &&
    Email.value != "" &&
    Phone.value != "" &&
    Password.value != "" &&
    ConfirmPassword.value != ""
  ) {
    if (Password.value == ConfirmPassword.value) {
      var flag = true;
      var regemail = /^[a-zA-Z0-9]+@[a-z]+(.com)$/;
      var regPhone = /^(01)(1|2|5|0)[0-9]{8}$/;
      var testPhone = regPhone.test(Phone.value);
      var testemail = regemail.test(Email.value);
      if (testemail == true) {
        if (testPhone == true) {
          arr.forEach((user) => {
            if (Email.value == user.email) {
              flag = false;
            }
          });
          if (flag == true) {
            var data = {
              id: i++,
              username: UserName.value,
              email: Email.value,
              phone: Phone.value,
              pass: Password.value,
            };
            UserName.value = "";
            Email.value = "";
            Phone.value = "";
            Password.value = "";
            ConfirmPassword.value = "";
            arr.push(data);
            store(arr);
            window.open("../html/Login.html");
          } else {
            alert("You have an account with this email, Enter another one");
          }
        } else {
          alert("Wrong Phone Number");
        }
      } else {
        alert("Enter An Email in format name@domain.com");
      }
    } else {
      alert("Password and Confirm Password should be one");
    }
  } else {
    alert("You Should Enter All Data");
  }
}
function store(userdata) {
  localStorage.setItem("users", JSON.stringify(userdata));
}
