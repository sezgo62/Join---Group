/////////////////// PRIORITY SECTION ////////////////////
//colors the priority which is chosen in the task opened to edit
function selectPrioInEditContainer(column, ticket) {
    let id = boardColumns[column][ticket]['prior']['name'];
    let button = document.getElementById(id);
    let index = boardColumns[column][ticket]['prior']['prio-index']
    changePrioImageToWhite(button);
    changePrioBtnColors(button, index)    
}


/////////////////// CONTACTS SECTION ////////////////////

//Display the Assigned contacts with a check and display them in their Initials below the Dropdown
function renderAlreadyAssignedContacts(column, ticket) {
    let assignedContacts = getAssignedContacts(column, ticket);
    for (let i = 0; i < assignedContacts.length; i++) { 
        for (let j = 0; j < contacts.length; j++) {
            //compare email of all contacts with them assigned to the task 
            if (boardColumns[column][ticket]['team'][i]['email'] == contacts[j]['email']) { 
                displayAssignedContactsAsChecked(j);
                changeDisplayInContactIconSection(j); //in add_task.js -> same as if contact would have been clicked
                break
            }
        }
    }
}


//without that we cannot use .length  (Does not work on a Json Object)
function getAssignedContacts(column, ticket) {
    let assignedContacts = [];
    for (let i = 0; i < Object.keys(boardColumns[column][ticket]['team']).length; i++) {
        assignedContacts.push(boardColumns[column][ticket]['team'][i]);
    }
    return assignedContacts;
}


function displayAssignedContactsAsChecked(j) {
    document.getElementById('checkbox' + j).checked = true;
}


/////////////////// SUBTASK SECTION ////////////////////

function renderSubtasksInEditContainer(column, ticket) {
    let subtasks = getSubtasksFromTask(column, ticket);
    for (let i = 0; i < subtasks.length; i++) {
        addTaskToSubtaskListInEdit(subtasks[i], i);
    }
    displayCheckBoxesCorrectlyIfChecked(column, ticket);
    addDisplayNoneToSubtaskIfEmpty(subtasks);
}


function getSubtasksFromTask(column, ticket) {
    let subtasks = [];
    for (let i = 0; i < Object.keys(boardColumns[column][ticket]['subtasksArray']).length; i++) {
        subtasks.push(boardColumns[column][ticket]['subtasksArray'][i]);
    }
    return subtasks;
}


function addTaskToSubtaskListInEdit(subtask, i) {
    let container = document.getElementById('subtask-list-container');
    container.innerHTML += templateSubtaskListInEdit(subtask, i);
}


function templateSubtaskListInEdit(subtask, i) {
    return /*html*/ `
        <li class="subtask-list-entry flex"><input id="cb-subtask-${i}" class="subtask-checkbox" type="checkbox">${subtask}</li>
    `;
}


function displayCheckBoxesCorrectlyIfChecked(column, ticket) {
    for (let i = 0; i < boardColumns[column][ticket]['subtasksArray'].length; i++) {
        if (subtaskStatusIsTrue(i, column, ticket)) {
            let checkbox = document.getElementById('cb-subtask-' + i);
            checkbox.checked = true;
        }
    }
}


function subtaskStatusIsTrue(i, column, ticket) {
    return boardColumns[column][ticket]['status-subtasks'][i];
}


function addDisplayNoneToSubtaskIfEmpty(subtasks) {
    if (subtasks == '') {
        document.getElementById('subtask-edit-container').classList.add('d-none');
    }
}


/////////////////// FINISH EDIT ////////////////////

function saveChanges(columm, ticket) {
    let currentTask = boardColumns[columm][ticket];
    addInputValuesToTask(currentTask, 'title'); //in add_task.js
    addInputValuesToTask(currentTask, 'description'); //in add_task.js
    addInputValuesToTask(currentTask, 'due-date'); //in add_task.js
    addPriotityToTask(currentTask);
    pushAssignedContactsToTask(currentTask);
    changeSubtasksStatus(currentTask);
    addBoard();
}


//clears the contacts array which is needed to know which contacts abbreviations should be displayed
function clearContactIconArray() {
    contactIconArray = [];
}



