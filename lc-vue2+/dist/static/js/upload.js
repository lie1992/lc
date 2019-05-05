var upload = function (file, url, cb) {
    var xhr = createXhr()
    xhr.open('post', url)
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let resJson = xhr.responseText
                cb(resJson)
            }
        }
    }
    xhr.send(file)
}
function createXhr () {
    var xhr = null
    if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest()
    } else {
        xhr = new window.ActiveXObject('Microsoft.XMLHttpRequest')
    }
    return xhr
}

export default {
    upload
}
