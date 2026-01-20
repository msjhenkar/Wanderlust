

document.getElementById("loginForm").addEventListener("submit",async function(e) {
    e.preventDefault();
    console.log("Login button clicked");

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const message = document.getElementById("message");

    try{
        const response = await fetch("/api/users/api-login/",{
            method: "POST",
            headers:{
                "content-Type": "application/json"
            },
            body: JSON.stringify({email,password})
        });

        // console.log("RAW RESPONSE:", text);

        const data = await response.json();

        if(response.ok){
            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            message.innerText = "Login Successful";
            message.style.color = "green";

            console.log("Access token saved:", data.access);

            window.location.href = "/dashboard/";
        }
        else{
            message.innerText = data.detail || "Invalid Credentials";
            message.style.color = "red";
        }
    }catch(error){
        console.error("LoginError:",error);
        message.innerText = "something went wrong";
        message.style.color = "red";
    }

});
