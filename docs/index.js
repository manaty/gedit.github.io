import Auth from "./lib/auth.js";

if(Auth.isLoggedIn()){
    let link = document.createElement("div");
    link.innerHTML = Auth.getUsername();
    document.body.appendChild(link);
    let avatarUrl=Auth.getAvatarUrl();
    console.log("avatar="+avatarUrl);
    if(avatarUrl){
        let img = document.createElement("img");
        img.src = avatarUrl;
        document.body.appendChild(img);
    }
} else {
    window.location.replace("signin.html");
}