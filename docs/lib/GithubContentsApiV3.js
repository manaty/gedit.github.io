import githubconf from "./github_config.js";

export default class GithubContentsApiV3 {

    constructor(username, password){
        this.owner=githubconf.owner;
        this.repo=githubconf.repo;
        this.username=username;
        this.password=password;
    }


    getGetOptions(){
        return {
            method: 'GET',
            mode: 'cors',
            headers: {
                'User-Agent': this.username,
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': 'token ' + this.password
            }
        }
    }

    getUserInfo(){
        return new Promise((resolve, reject) => {
            fetch("https://api.github.com/user/", this.getGetOptions())
            .then(response => response.json()).then(resp => {
                    if (!resp.login) {
                        console.log("expected response is not a valid user, resp=" + JSON.stringify(resp));
                        reject("Error while accessing the user info on server, contact admin");
                    } else {
                        resolve(resp);
                    }
            })
            .catch((e) => {
                    console.log("Error while retrieving user info " + e);
                    reject("Error while retrieving user info");
            })
        });        
    }

    retrieveGithubFileSha(path) {
        return new Promise((resolve, reject) => {
            fetch("https://api.github.com/repos/" + this.owner + "/" + this.repo + "/contents/" + path, this.getGetOptions())
                .then(response => response.json()).then(resp => {
                    if (!resp.type == "file") {
                        console.log("expected response is not a file, resp=" + JSON.stringify(resp));
                        reject("Error while accessing the file on server, contact admin");
                    } else {
                        resolve(resp);
                    }
                })
                .catch((e) => {
                    console.log("Error while retrieving productList " + e);
                    reject("Error while retrieving productList");
                })
        });
    }
    
    updateGithubFile(path,content,sha) {
        return new Promise((resolve,reject)=>{
            fetch("https://api.github.com/repos/" + this.owner + "/" + this.repo + "/contents/" + path, {
                method: 'PUT',
                mode: 'cors',
                body: JSON.stringify({
                    'path': path,
                    'message': 'update product list',
                    'content': content,
                    'sha': sha
                }),
                headers: {
                    'User-Agent': this.username,
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': 'token ' + this.password
                }
            }).then(response => response.json()).then(resp => {
                resolve(resp);
            }).catch((e) => {
                reject("Error while updating file", e);
            })
        });
    }
}