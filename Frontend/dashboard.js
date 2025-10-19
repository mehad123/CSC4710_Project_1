const backendURL = "http://localhost:5050";

const form = document.getElementById("search-form");


document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch(backendURL + `/users`);
    const queries = await response.json();
    console.log(queries)

    loadTable(queries);
});

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fields = Object.fromEntries((new FormData(form)).entries());

    let response;
    let urlQueries;
    let queries;
    switch (e.submitter.value){
        case "username":
            response = await fetch(backendURL + `/users/${fields["username"]}`);
            break;
        case "firstname":
            response = await fetch(backendURL + `/users/firstname/${fields["firstname"]}`);
            break;
        case "lastname":
            response = await fetch(backendURL + `/users/lastname/${fields["lastname"]}`);
            break;
        case "salary":
            urlQueries = `minSalary=${encodeURIComponent(fields["minSalary"])}&maxSalary=${encodeURIComponent(fields["maxSalary"])}`;
            response = await fetch(backendURL + `/users/salary?${urlQueries}`);
            break;
        case "age":
            urlQueries = `minAge=${encodeURIComponent(fields["minAge"])}&maxAge=${encodeURIComponent(fields["maxAge"])}`;
            response = await fetch(backendURL + `/users/age?${urlQueries}`);
            break;
        case "registeredAfter":
            response = await fetch(backendURL + `/users/afterReg/${fields["regAfterUser"]}`);
            break;
        case "registeredCurrent":
            response = await fetch(backendURL + `/users/sameReg/${fields["regSameUser"]}`);
            break;
        case "registeredToday":
            response = await fetch(backendURL + `/users/today`);
            break;
        case "nosignin":
            response = await fetch(backendURL + `/users/nosignin`);
            break;
        case "all":
            response = await fetch(backendURL + `/users`);
            break;
    }
    if (!response.ok){
        console.error("Query failed!");
        queries = []
    }else{
         queries = await response.json();
    }
   
    loadTable(queries);
});

function loadTable(queries){
    console.log(queries);
    const tBody = document.getElementById("user-entries");
    let content = "";
    
    queries.forEach(row => {


        content += `<tr>
            <td>${row["username"]}</td>
            <td>${row["firstname"]}</td>
            <td>${row["lastname"]}</td>
            <td>${row["salary"]}</td>
            <td>${row["age"]}</td>
            <td>${row["registerday"].split("T")[0]}</td>
            <td>${row["signintime"] ? 
                new Date(row["signintime"]).toLocaleString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                })
                :
                null
            }</td>
        </tr>
        `;
    });
    tBody.innerHTML = content;
}