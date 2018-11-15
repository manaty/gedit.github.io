import Auth from "./lib/auth.js";

console.log("register event");
document.getElementById("loginForm").addEventListener("submit",
    (event) => {
        event.preventDefault();
        var username = document.getElementById("pos_signin_username").value;
        var password = document.getElementById("pos_signin_password").value;
        if ((!username) || username.length < 4 || (!password) || password.length <= 4) {
            alert("username or password too short");
        } else {
            Auth.signin(username, password);
        }
    }
)
