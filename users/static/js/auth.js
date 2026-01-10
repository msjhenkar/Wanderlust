export function getToken() {
    return localStorage.getItem("access");
}

export function isLoggedIn(){
    return !!getToken();
}

export function LogOut(){
    localStorage.removeItem("access");
    window.location.href = "login.html";
}