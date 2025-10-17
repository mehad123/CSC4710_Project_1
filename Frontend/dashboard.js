const backendURL = "http://localhost:5050";
const form = document.getElementById("search-form");


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(backendURL + `/users`);
    queries = response.json();

    loadTable(queries)
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fields = Object.fromEntries((new FormData(form)).entries());

    let response;
    let urlQuery;
    let queries;
    switch (fields["action"]){
        case "username":
            response = await fetch(backendURL + `/users/${fields["username"]}`);
            queries = response.json();
            break
        case "firstname":
            response = await fetch(backendURL + `/users/firstname/${fields["firstname"]}`);
            queries = response.json();
            break
        case "lastname":
            response = await fetch(backendURL + `/users/lastname/${fields["lastname"]}`);
            queries = response.json();
            break
        case "salary":
            urlQuery = `minSalary=${encodeURIComponent(fields["minSalary"])}&maxSalary=${encodeURIComponent(fields["maxSalary"])}`;
            response = await fetch(backendURL + `/users/salary?${urlQuery}`);
            queries = response.json()
            break
        case "age":
            urlQuery = `minAge=${encodeURIComponent(fields["minAge"])}&maxAge=${encodeURIComponent(fields["maxAge"])}`;
            response = await fetch(backendURL + `/users/age?${urlQuery}`);
            queries = response.json()
            break
        case "registeredAfter":
            response = await fetch(backendURL + `/users/afterReg/${fields["username"]}`);
            queries = response.json();
            break
        case "registeredCurrent":
            response = await fetch(backendURL + `/users/sameReg/${fields["username"]}`);
            queries = response.json();
            break
        case "registeredToday":
            response = await fetch(backendURL + `/users/today`);
            queries = response.json();
            break
        case "nosignin":
            response = await fetch(backendURL + `/users/nosignin`);
            queries = response.json();
            break
    }
    loadTable(queries);
})

function loadTable(queries){

    const tBody = document.getElementById("user-entries");
    let content = ""
    
    queries.forEach(row => {
        content += `<tr>
            <td>${row["username"]}</td>
            <td>${row["firstname"]}</td>
            <td>${row["lastname"]}</td>
            <td>${row["salary"]}</td>
            <td>${row["age"]}</td>
            <td>${row["registerday"]}</td>
            <td>${row["signintime"]}</td>
        </tr>
        `
    })
    tBody.innerHTML = content
}