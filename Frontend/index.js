const backendURL = "http://localhost:5050/";

document.addEventListener('DOMContentLoaded', async () => {
    console.log("hi")
    const response = await fetch(`${backendURL}getAll`); 
    console.log(response)
    const result = await response.json();
    loadHTMLTable(result["data"]);
});


const addBtn = document.querySelector('#add-name-btn');
addBtn.onclick = async () => {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";

    const response = await fetch(`${backendURL}insert`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({name: name})
    });
    const result = await response.json();
    insertRowIntoTable(result['data']);
};

const searchBtn =  document.querySelector('#search-btn');
searchBtn.onclick = async () => {
    const searchInput = document.querySelector('#search-input');
    const searchValue = searchInput.value;
    searchInput.value = "";

    const response = await fetch(`${backendURL}search/` + searchValue);
    const result = await response.json();
    loadHTMLTable(result['data']);
};

const updateBtn = document.querySelector('#update-row-btn');
updateBtn.onclick = async () => {
    const updatedNameInput = document.querySelector('#update-name-input');

    const response = await fetch(`${backendURL}update`,{
            headers: {
                'Content-type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify(
                  {
                    id: idToUpdate,
                    name: updatedNameInput.value
                  }
            )
          }
    );
    const result = await response.json();
    if (!result.success){
        debug("update failed");
        return;
    }
    location.reload();
};


let rowToDelete; 
document.querySelector('table tbody').addEventListener('click', (event) => {
    if(event.target.className === "delete-row-btn"){
        deleteRowById(event.target.dataset.id);   
        rowToDelete = event.target.parentNode.parentNode.rowIndex;    
    }   
    if(event.target.className === "edit-row-btn"){
        showEditRowInterface(event.target.dataset.id); 
    }
});

let idToUpdate = 0;
function showEditRowInterface(id){
    document.querySelector('#update-name-input').value = "";
    const updateSetction = document.querySelector("#update-row");  
    updateSetction.hidden = false;
    idToUpdate = id;
}

async function deleteRowById(id){
    const response = await fetch(`${backendURL}delete/` + id,{ method: 'DELETE'});
    const result = await response.json();
    if (result.success){
        document.getElementById("table").deleteRow(rowToDelete);
    }
}

function insertRowIntoTable(data){
   const table = document.querySelector('table tbody');

   const isTableData = table.querySelector('.no-data');

   let tableHtml = "<tr>";
   
   for(let key of Object.keys(data)){ 
        if(key === 'dateAdded'){ 
            data[key] = new Date(data[key]).toLocaleString(); 
        }
        tableHtml += `<td>${data[key]}</td>`;
   }

   tableHtml +=`<td><button class="delete-row-btn" data-id=${data.id}>Delete</td>`;
   tableHtml += `<td><button class="edit-row-btn" data-id=${data.id}>Edit</td>`;
   tableHtml += "</tr>";

    if(isTableData){
       debug("case 1");
       table.innerHTML = tableHtml;
    }
    else {
        debug("case 2");
        const newrow = table.insertRow();
        newrow.innerHTML = tableHtml;
    }
}

function loadHTMLTable(data){
    const table = document.querySelector('table tbody'); 
    
    if(data.length === 0){
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";
    data.forEach(({id, name, date_added}) => {
         tableHtml += "<tr>";
         tableHtml +=`<td>${id}</td>`;
         tableHtml +=`<td>${name}</td>`;
         tableHtml +=`<td>${new Date(date_added).toLocaleString()}</td>`;
         tableHtml +=`<td><button class="delete-row-btn" data-id=${id}>Delete</td>`;
         tableHtml += `<td><button class="edit-row-btn" data-id=${id}>Edit</td>`;
         tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function debug(data){
    fetch(`${backendURL}debug`, {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({debug: data})
    });
}