const token = localStorage.getItem("access");

if(!token){
    window.location.href="/login/";
}

document.getElementById("create-Btn").addEventListener("click",() => {
    const data = {
        title : document.getElementById("title").value,
        description : document.getElementById("description").value,
        location: document.getElementById("location").value,
        price_per_night : document.getElementById("price").value     
    };

    fetch("http://127.0.0.1:8000/api/listings/create/",{
        method: "POST",
        headers: {
            "Authorization":`Bearer ${token}`,
            "content-Type": "application/json"
        },
        body:JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        alert("Listing created successfully");
        console.log(data);
    })
})