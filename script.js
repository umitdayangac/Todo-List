const formTo = document.getElementById("form");
const inputData = document.querySelector(".input-form");
const taskList = document.querySelector(".task-list");


eventListener();
function eventListener() {
    formTo.addEventListener("submit",addTo);
    document.addEventListener("DOMContentLoaded",localStorageListAll);
    taskList.addEventListener("click",btnGroup);

}

function btnGroup(e) {
    const todos = e.target;
    if (todos.classList.contains("btn-task-check")){
        todos.parentElement.classList.toggle("completion");
    }else if (todos.classList.contains("btn-task-delete")){
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your a list todo has been deleted.',
                    'success'
                );
                deleteElement(todos);
            }
        });


    }
}


function dataControl(newTodo) {
    let todos = getLocalStorage();
    let result = true;
    todos.forEach((todos)=>{
        if (todos.toLowerCase()===newTodo.toLowerCase()){
            result =false;
        }
    });
    return result;
}

function deleteLocalStorage(newTodo){
    let todos = getLocalStorage();
    todos.forEach((index)=>{
        if (index===newTodo){
            todos.splice(index,1);
        }
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function localStorageListAll() {
    let todos = getLocalStorage();
    todos.forEach((input)=>{
        addToUI(input);
    })
}

function addToLocalStorage(newTodo) {
    let todos = getLocalStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function getLocalStorage() {
    let todos;
    if (localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addToUI(newTodo) {

    const liDom = document.createElement("li");
    liDom.classList="task-todo";

    const divDom = document.createElement("div");
    divDom.classList="task-title";
    divDom.textContent=newTodo;
    liDom.appendChild(divDom);

    const btnCheck = document.createElement("button");
    btnCheck.type="button";
    btnCheck.classList="btn btn-task-check";
    btnCheck.innerHTML='<i class="far fa-check-square"></i>';
    liDom.appendChild(btnCheck);

    const btnDelete = document.createElement("button");
    btnDelete.type="button";
    btnDelete.classList="btn btn-task-delete";
    btnDelete.innerHTML='<i class="far fa-trash-alt"></i>';
    liDom.appendChild(btnDelete);

    taskList.appendChild(liDom);
}

function addTo(e) {
    const newTodo = inputData.value.trim();
    if (inputData.value){
        if (dataControl(newTodo)){
            addToUI(newTodo);
            addToLocalStorage(newTodo);
            inputData.value="";
        }else{
            sweetAlert("warning","Todo has not been added before");
        }

    }else{
        sweetAlert("error","Please enter a value");
    }




    e.preventDefault();
}

function sweetAlert(type,message) {
    Swal.fire({
        position: 'center',
        icon: `${type}`,
        title: `${message}`,
        showConfirmButton: false,
        timer: 1500
    })
}



function deleteElement(todos) {
    todos.parentElement.classList.add("delete");
    const deleteText = todos.parentElement.children[0].textContent;
    deleteLocalStorage(deleteText);
    todos.parentElement.addEventListener("transitionend",function () {
        todos.parentElement.remove();
    });

}


