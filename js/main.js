// console.log("hello world main.js");
import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDoList = new ToDoList();

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
            event.preventDefault();
            processSubmission();
        });

    //another listener:  click event on delete button

        const clearItems = document.getElementById("clearItemsId");
        clearItems.addEventListener("click" , (event)=>{
            const list = toDoList.getList();
            if(list.length){
                const confirmed = confirm("are you sure?");
                if(confirmed){
                    toDoList.clearList();
                    //TODO: update persistent storage
                    refreshThePage();
                }
            }
        })

    //procedural
    //load list object
    loadListObject();


    //use webstorageAPI
    //refresh the page
    refreshThePage();
}


const loadListObject = () =>{
    const storedList = localStorage.getItem("MyToDoList")
    if(typeof storedList !== "string") return;
    const parsedlist = JSON.parse(storedList);
    parsedlist.foreach(itemObj =>{
        const newToDoItem = createNewItem(itemObj._id, itemObj._item);
        toDoList.addItemToList(newToDoItem)
    })
}

const refreshThePage = () =>{
    clearListDisplay();
    renderList()
    clearItemEntryField()
    setFocusOnItemEntry()

}

const clearListDisplay = () =>{
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
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
        toDoList.removeItemFromList(checkbox.id);
        updatePersistentData(toDoList.getList());
        const removedText = getLabelText(checkbox.id);

        updateScreenReaderConfirmation(removedText, "removed from list")
        //todo: remove from persistent data
        setTimeout(()=>{
            refreshThePage();
        },1000);
    })
}

const getLabelText = (checkboxId) => {
    return document.getElementById(checkboxId).nextElementSibling.textContent
}

const updatePersistentData = (listArray) => {
    localStorage.setItem("MyToDoList", JSON.stringify(listArray))
}

const clearItemEntryField = () =>{
    document.getElementById("newItem").value = "";
}

const setFocusOnItemEntry = () => {
    document.getElementById("newItem").focus();
}

const processSubmission = () => {
    const newEntryText = getNewEntry();
    if(!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const toDoItem = createNewItem(nextItemId, newEntryText);
    toDoList.addItemToList(toDoItem);
    //TODO: update persistent data
    updatePersistentData(toDoList.getList());
    updateScreenReaderConfirmation(newEntryText, actionVerb);
    refreshThePage();
}

const getNewEntry = () =>{
    return document.getElementById("newItem").value.trim();
}

const calcNextItemId = () =>{
    let nextItemId = 1;
    const list = toDoList.getList();
    if(list.length > 0 ){
        nextItemId = list[list.length - 1].getId() +1;
    }
    return nextItemId;
}

const createNewItem = (itemId, itemText) =>{
    const toDo = new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
}

const updateScreenReaderConfirmation = (newEntryText, actionVerb) => {
    document.getElementById("confirmation").textContent = `${newEntryText} ${actionVerb}.`
}