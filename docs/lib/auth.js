class Authentication{

    static signin(username,token){
        sessionStorage.setItem("username",username);
        sessionStorage.setItem("token",token);
        let isAdmin=(token.length==40);
        sessionStorage.setItem("isadmin",false);
        if(isAdmin){
            let githubApi=GithubContentsApiV3(username,"gedit",username,token);
            githubApi.getUserInfo().then(userInfo => {
                sessionStorage.setItem("isadmin",true);
                sessionStorage.setItem("username",userInfo.login); 
                if(userInfo.avatar_url && userInfo.avatar_url.length>0) {
                    sessionStorage.setItem("avatar_url",userInfo.avatar_url);
                }
            });
        }
        document.location = "index.html";
    }

    static signout(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        document.location = "signin.html";
    }

    static getUsername(){
        return sessionStorage.getItem("username");
    }

    static getToken(){
        return sessionStorage.getItem("token");
    }

    static isAdmin(){
        return sessionStorage.getItem("isadmin");
    }
}