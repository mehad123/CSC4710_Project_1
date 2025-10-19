const form = document.getElementById("create-form");
const errMssg = document.getElementById("create-error");
let timeoutID;

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log(form)
    console.log(new FormData(form))
    const response = await fetch("http://localhost:5050/users",{
        method: "POST",
        body: new FormData(form)
    });

    const result = await response.text();
    if (result !== "ok"){
        clearTimeout(timeoutID);
        errMssg.innerText = "Failed to create new user!";
        timeoutID = setTimeout(()=>{
            errMssg.innerText = "";
        },1000);
        return
    }
    window.location.href = "dashboard.html";
})