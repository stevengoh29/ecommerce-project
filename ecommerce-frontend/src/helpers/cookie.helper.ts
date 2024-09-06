export function getCookies(name: any) {
    const pairs = document.cookie.split("; ");
    const cookies: any = {};
    for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i].split("=");
        cookies[(pair[0] + "").trim()] = decodeURI(pair.slice(1).join("='"));
    }
    return cookies[name];
}

export function setCookie(cname: any, cvalue: string, exdays: any) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=None;secure=true";
}

function get_cookie(name: any) {
    return document.cookie.split(";")?.some((c) => {
        return c.trim().startsWith(name + "=");
    });
}

export function deleteCookie(name: any, path?: any, domain?: any) {
    path = path || "/";
    if (get_cookie(name)) {
        document.cookie =
            name +
            "=" +
            (path ? ";path=" + path : "") +
            (domain ? ";domain=" + domain : "") +
            ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
    }
}