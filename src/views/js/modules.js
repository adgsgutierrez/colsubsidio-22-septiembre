import { getListUsers } from "./getlist.js";
import { createNewUser } from "./postuser.js";

let cacheDataByFilter = [];

export function uploadFile(target){
    document.getElementById("file-name").innerHTML = target.files[0].name;
}

export function loadUsers(){
    getListUsers().then( data => {
        cacheDataByFilter = data;
        mapperDataView(data);
    });
}

export function sendSearch(){
    const search = document.getElementById('search').value;
    if(search === ''){
        mapperDataView(cacheDataByFilter);
        return;
    }
    const dataFilter = cacheDataByFilter.filter( item => {
        return  item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.lastname.toLowerCase().includes(search.toLowerCase()) ||
                item.id.toString().includes(search.toLowerCase())
    });
    mapperDataView(dataFilter);
}

export function createUser(){
    const form = document.getElementById('createUserForm');
    const formData = new FormData(form);
    createNewUser(formData).then( () => {
        loadUsers();
    });
}

const mapperDataView = (data) => {
    let table = document.getElementById('users');
        let contain = '';
        for(let row of data) {
            contain +=`<tr>
                <td><img src="${row.photo == '' ? 'https://www.w3schools.com/howto/img_avatar.png' : row.photo }" alt="Avatar" class="avatar"></td>
                <td>${row.id}</td>
                <td>${row.name}</td>
                <td>${row.lastname}</td>
            </tr>`
        }
        table.innerHTML = contain;
};

( ()=> {
    loadUsers();
    window.sendSearch = sendSearch;
    window.createUser = createUser;
    window.uploadFile = uploadFile;
} )();