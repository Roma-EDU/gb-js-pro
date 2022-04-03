class Request {
    static makeGETRequestObsolete(url, callback) {
        var xhr;
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                callback(xhr.responseText);
            }
        }

        xhr.open('GET', url, true);
        xhr.send();
    }
    
    static makeGETRequestFetch(url){
        return fetch(url);
    }

    static makeGETRequestPromise(url){
        return new Promise((resolve, reject) => {

            var xhr;
            if (window.XMLHttpRequest) {
                xhr = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }

            xhr.timeout = 10000;
            xhr.ontimeout = function (e) {
                reject("timeout");
            };

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status == 200) {
                        resolve(xhr.responseText);
                    } else {
                        reject(xhr.status);
                    }
                }
            }
    
            xhr.open('GET', url, true);
            xhr.send();
        })
    }
}