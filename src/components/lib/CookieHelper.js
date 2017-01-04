

export default {
    getCookie: function (cookieName) {
        var index = -1;
        if (document.cookie)
            index = document.cookie.indexOf(cookieName);

        if (index === -1) {
            return "";
        } else {
            var iBegin = (document.cookie.indexOf("=", index) + 1);
            var iEnd = document.cookie.indexOf(";", index);
            if (iEnd === -1) {
                iEnd = document.cookie.length;
            }
            return document.cookie.substring(iBegin, iEnd);
        }
    },

    setCookie: function (cookieName, cvalue, expiredays, path) {

        var expireDate = new Date();
        var expireStr = "";
        if (expiredays !== undefined) {
            expireDate.setTime(expireDate.getTime() + (expiredays * 24 * 3600 * 1000));
            expireStr = "; expires=" + expireDate.toGMTString();
        }
        var pathStr = (path === undefined) ? "; path=/" : "; path=" + path;
        document.cookie = cookieName + '=' + escape(cvalue) + expireStr + pathStr;
    },

    clearCookie: function (cookieName) {
        this.setCookie(cookieName, "", -1);
    } 
}