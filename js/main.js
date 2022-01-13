// console.log("hello world main.js");
import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDoList = new toDoList();

// launch app
document.addEventListener("readystatechange", (event)=>{
    if(event.target.readyState ==="complete") {
        initApp();
    }
})

const initApp = () => {
    //add listeners
        const itemEntryForm = document.getElementById("itemEntryForm");
        itemEntryForm.addEventListener("submit", (event)=>{

        })


    //procedural
    //load list object
    //use webstorageAPI
    //refresh the page
    refreshThePage();
}

const refreshThePage = () =>{
    clearListDisplay();
    renderList()
    clearItemEntryField()
    setFocusOnItemEntry()

}

const clearListDisplay = () =>{
    const parentElement = document.getElementById("listItems");
    const deleteContents(parent) = () =>{

    }
}

const deleteContents = () =>{
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeElement(child)
        child = parentElement.lastElementChild;
    }

}

const renderList = () =>{
    const list = toDoList.getList();
    list.foreach(item =>{
        buildListItem(item)
    })
}

const buildListItem = (item) =>{
    const div = document.createElement("div");
    div.className = "item";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = item.getId();
    check.tabIndex = 0;
    addClickListenerToCheckbox(check)
    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const container = document.getElementById("listItems");
    container.appendChild(div);
}

const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        toDoList.removeItemFromList(checkbox.id)
        //todo: remove from persistent data
        setTimeout(()=>{
            refreshThePage();
        },1000);
    })
}

const clearItemEntryField = () =>{
    document.getElementById("newItem").value = "";
}

const setFocusOnItemEntry = () => {
    document.getElementById("newItem").focus();
}