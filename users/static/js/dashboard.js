// console.log("dashboard.js loaded");


// import { isLoggedIn } from "./auth.js";

//     if (!isLoggedIn()) {
//         window.location.href = "login.html";
//     }

const token = localStorage.getItem("access");

console.log("Token from localStorage:", token);


// 1️⃣ If token missing → redirect to login
if(!token) {
    console.log("No token found → redirecting to login");
    window.location.href = "/login/";
}

// [2️] fetch protected profile API
fetch("http://127.0.0.1:8000/api/users/profile/",{
    method : "GET",
    headers: {
        "Authorization":`Bearer ${token}`,
        "content-Type":"application/json"
    }
    
})
.then(response => {
    if(response.status === 401){
        localStorage.clear();
        window.location.href="/login/";
    }
    return response.json();
})

.then(data=>{
    console.log("Profile data:", data);
    document.getElementById("user-info").innerHTML = `Logged in as: ${data.email} (${data.role})`;

    // hiding all sections first
    document.querySelectorAll(".role-section").forEach(section =>{
        section.style.display = 'none';
    })

    if(data.role==="USER") {
        document.querySelector(".user-section").style.display = "block";
    }

    if(data.role === "HOST") {
        document.querySelector(".host-section").style.display = "block";
    }

    if(data.role === "ADMIN") {
        document.querySelector(".admin-section").style.display = "block";
    }
})

.catch(error => {
    console.error("Error fetching profile:", error);
});

// logout
document.getElementById("logout-btn").addEventListener("click",() => {
    localStorage.clear();
    window.location.href = "/login/";
});