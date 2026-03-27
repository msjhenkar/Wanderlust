const token = localStorage.getItem("access");

if(!token){
    window.location.href("/login/");
}

fetch("http://127.0.0.1:8000/api/listings/my/", {
    method: "GET",
    headers: {  
        "Authorization": `Bearer ${token}`,
        "content-type":"application/json"
    }
})

.then(res =>res.json())
.then(data => {
    const container = document.getElementById("listings");

    if(data.length === 0){
        container.innerHTML = "<p>No Listings yet.</p>";
        return;
    }

    data.forEach(listing => {
        const div = document.createElement("div");
        div.innerHTML = `
        <h3> ${listing.title}</h3>
        <p> ${listing .location}</p>
        <p> ${listing.price_per_night} / night</p>
        `;

        container.appendChild(div);
    });
})