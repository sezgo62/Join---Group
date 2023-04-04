let categoryObject;
let contactIconArray = []; //safes the indexes/positions of the seleceted Contacts in the contacts array
let currentUser = {
    'name': 'Max Mustermann',
    'color': '#0190E0',
    'email': 'max.mustermann@gmail.com',
    'phone': '+490123456789',
    'abbreviation': 'MM'
}

setURL('https://gruppe-348.developerakademie.net/smallest_backend_ever');


/**
 * This function is used to initialize the AddTask page and the AddTask form in the board page
 */
async function initAddTask() {
    renderResponsiveHeaderTitle(); //in script.js
    await includeHTML();
    clearTask();
    renderAddTask();
}


/**
 * This function create/clears the template task which gets filled during the creation of a task
 */
function clearTask() {
    task = { 
        'category': [],
        'title': '',
        'description': '',
        'process': 0,
        'subtasks': 0,
        'finished-subtasks': 0,
        'status-subtasks': [],
        'subtasksArray': [],
        'team': [],
        'prior': '',
        'board': 0,
        'due-date': '',
    };
}


/**
 * This function is used to include the AddTask template form
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "assets/templates/task_form.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML += await resp.text();
        } else {
            element.innerHTML += 'Page not found';
        }
    }
}


/**
 * This function renders the elements in the add task form
 */
async function renderAddTask() {
    renderCategoryDropdown();
    renderCategoryColorSelection();
    renderContactsDropdown();
    renderPrioritySelection();
    changeClearToCancel();
}


/**
 * This function changes the span in the clear button in the task form from clear to cancel, if the current page is not add_task.html
 */
function changeClearToCancel() {
    if (!URLequalsAddTaskHtml()) {
        document.getElementById('clear-btn-string').innerHTML = 'Cancel';
    }
}


///////////////////////// CATEGORY DROPDOWN FUNCTIONS ////////////////////////////////////

/**
 * This function renders the dropdown container for the categories 
 */
function renderCategoryDropdown() {
    let id = 'category-dropdown';
    let dropdown = document.getElementById(id);
    dropdown.innerHTML = templateDropdownNewCategory();
    for (let i = 0; i < category.length; i++) {
        dropdown.innerHTML += templateDropdownCategories(i);
    }  
}


/**
 * This function generates the html code for the dropdown field, which is used to create a new category
 * 
 * @returns a html temlate of a row in the dropdown for the user to select to create a new category
 */
function templateDropdownNewCategory() {
    return /*html*/ `
        <span class="dropdown-content-child" onclick="changeVisibility('category-dropdown'); changeVisibilityNewCategory(); focusOnInput('new-category-input'); createNewCategoryObject()">New category</span>
    `;
}


/**
 * This function generates the html code which is used to display and select the categories in the dropdown container
 * 
 * @param {int} i -  is the indexes of the category that will be displayed (in this iteration)
 * @returns a html template of a row in the dropdown which displays the category with the current index
 */
function templateDropdownCategories(i) {
    return /*html*/ `
        <div class="dropdown-content-child" onclick="changeVisibility('category-dropdown'); selectCategory('${i}')">
            ${category[i]['name']}
            <div class="category-colors" style="background-color: ${category[i]['color']}"></div>
        </div>
    `;
}


/**
 * This function is used to render the color selection, when a new category should be created
 * Every category needs to be assigned to a color
 */
function renderCategoryColorSelection() {
    let container = document.getElementById('category-color-selection-ctn');
    container.innerHTML = '';
    for (let i = 0; i < categoryColors.length; i++) {
        container.innerHTML += templateCategoryColors(i);
    }
}


/**
 * This function is used to generate the html code for the color selection when a new category should be created
 * 
 * @param {int} i - is the indexes of the color that will be displayed (in this iteration)
 * @returns a html template which displays the color with the current index
 */
function templateCategoryColors(i) {
    return /*html*/ `
        <div onclick="changeColorSelected(${i})" id="category-color-${i}" class="category-colors category-colors-selection-section" style="background-color: ${categoryColors[i]}"></div>
    `;
}

/**
 * This function is executed to change the selected color for the new category and
 * to visually signal which color is selected
 * 
 * @param {int} i - index of the color that has been selected for the category 
 */
function changeColorSelected(i) {
    changeClassOfClickedElem(i);
    changeColorInCategoryObject(i);
    removeClassOfPriorClickedElem(i);
}

/**
 * This function changes the way the clicked element is displayed to communicate if it is selected or not
 * This is done by checking if the element already contains the class 'category-colors-selected'
 * If YES the class is removed
 * If NO the class is added
 * 
 * @param {int} i - index of the color clicked at creating a new category 
 */
function changeClassOfClickedElem(i) {
    let elemID = document.getElementById('category-color-' + i)
    if (elemID.classList.contains('category-colors-selected')) {
        elemID.classList.remove('category-colors-selected');
    } else {
        elemID.classList.add('category-colors-selected');
    }
}

/**
 * This function is used to correctly save the selected color in the new categoryObject
 * If color is already in the categoryObject, the click should remove the color; else add the color
 * 
 * @param {int} i - index of the color which is either added to the categoryObject or removed
 */
function changeColorInCategoryObject(i) {
    if (categoryObject['color'] == categoryColors[i]) {
        categoryObject['color'] = '';
    } else {
        categoryObject['color'] = categoryColors[i];
    }
}

/**
 * This function removes the class 'category-colors-seleceted' from the earlier selected color
 * Necessary for the case that the user is changing which color the new category should have
 *  
 * @param {int} i - index of the color clicked at creating a new category 
 */
function removeClassOfPriorClickedElem(i) {
    for (let j = 0; j < categoryColors.length; j++) {
        let color = document.getElementById('category-color-' + j)
        // i!=j because otherwise you would instantly remove the class from the element you just selected
        //true for the elem which was clicked before the current selection
        if (i != j && color.classList.contains('category-colors-selected')) {
            color.classList.remove('category-colors-selected');
        }
    } 
}


/**
 * This function is used to remove the class which signals which color has been selected at creating a new category
 * Gets executed when the creation of a new category is cancelled
 */
function removeClassFromSelectedColor() {
    for (let j = 0; j < categoryColors.length; j++) {
        let color = document.getElementById('category-color-' + j)
        if (color.classList.contains('category-colors-selected')) { 
            color.classList.remove('category-colors-selected');
        }
    } 
}


/**
 * This function is used to open or close the new category input and corresponding color selection
 */
function changeVisibilityNewCategory() {
    clearInput('new-category-input');
    changeVisibility('category-dropdown-field');
    changeVisibility('new-category-input-ctn');
    changeVisibility('category-color-selection-ctn');
}


/**
 * This function adds the newly created category to the category array and saves it in the database
 */
function addNewCategory() {
    if (BothValuesAreEntered()) {
        addCategoryNameToCategoryObject()
        pushCategoryObjectToCategoryArray()
        renderCategoryDropdown();
        changeVisibilityNewCategory();
        selectCategory(category.length - 1);
    } else {
        alert("Please select a color and type in a category name!")
    }
}


/**
 * This function checks if both values of the categoryObject are entered when creating a new category
 * @returns either true or nothing
 */
function BothValuesAreEntered() {
    let categoryInput = document.getElementById('new-category-input').value;
    if (categoryInput != '' && categoryObject['color'] != '') {
        return true
    }
}


/**
 * This function adds the value entered in the new category input field to the categoryObject
 */
function addCategoryNameToCategoryObject() {
    categoryObject['name'] = document.getElementById('new-category-input').value;
}


/**
 * This function adds the newly created category to the category array
 */
function pushCategoryObjectToCategoryArray() {
    category.push(categoryObject);
    saveCategoriesOnServer();
}


/**
 * This function saves the category array in the database on the server
 */
function saveCategoriesOnServer() {
    backend.setItem('category', JSON.stringify(category));
}


/**
 * This function creates/resets the category object as an empty template which can then be filled with the entered data
 */
function createNewCategoryObject() {
    categoryObject = {
        'name': '',
        'color': ''
    };
}


/**
 * This function is used when a user selects a category
 * It changes the text which is shown in the dropdown field and adds the category to the task which gets currently created
 * 
 * @param {int} i - index of the selected categoryObject in the category array
 */
function selectCategory(i) {
    changeCategoryDropdownText(i)
    addCategoryToTask(i)
}


/**
 * This function is changing the text in the dropdown box (normally: Select a category) into the name of the selected category
 * 
 * @param {int} i - index of the selected categoryObject in the category array  
 */
function changeCategoryDropdownText(i) {
    let dropdown = document.getElementById('dropdown-text-category');
    dropdown.innerHTML = templateSelectedCategoryinDropdownField(i);
}


/**
 * This function generates the html code which is replacing the name of the dropdown field 
 * 
 * @param {int} i - index of the selected categoryObject in the category array 
 * @returns a html template which displays the name and color of the category 
 */
function templateSelectedCategoryinDropdownField(i) {
    return /*html*/ `
            ${category[i]['name']}
            <div class="category-colors" style="background-color: ${category[i]['color']}"></div>
    `;
}


/**
 * This function is used to add the selected category to the task in creation
 * 
 * @param {int} i - index of the selected categoryObject in the category array 
 */
function addCategoryToTask(i) {
    task['category'] = category[i];
}


///////////////////////// CONTACTS DROPDOWN FUNCTIONS ////////////////////////////////////

/**
 * This function renders the dropdown container for the contacts selection
 */
function renderContactsDropdown() {
    let dropdown = document.getElementById('contacts-dropdown');
    dropdown.innerHTML = templateContactsYou();
    for (let i = 0; i < contacts.length; i++) {
        dropdown.innerHTML += templateDropdownContacts(i);
    }
    dropdown.innerHTML += templateDropwdownInviteNewContact();  
}


/**
 * This function generates the html code to display and be able to select the currently logged in user
 * @returns a html template which display 'YOU' and a checkbox
 */
function templateContactsYou() {
    return /*html*/ `
        <label for="checkbox-you" class="dropdown-content-child space-between">    
                <span>You</span>
                <input value="you" name="checkbox" class="contacts-cb" id="checkbox-you" type="checkbox">
        </label>
    `;
}


/**
 * This function generates the html code to display and be able to select the contact (of the current itteration)
 * 
 * @param {int} i - index of the contact in the contacts array 
 * @returns a html tmeplate which displays the name of the contact and checkbox
 */
function templateDropdownContacts(i) {
    return /*html*/ `
        <label for="checkbox${i}" class="dropdown-content-child space-between">    
                <span>${contacts[i]['name']}</span>
                <input value="${i}" name="checkbox" class="contacts-cb" id="checkbox${i}" type="checkbox" onclick="changeDisplayInContactIconSection(${i})">
        </label>
    `;
}


/**
 * This function displays the initials of a contact below the contacts dropdown when the contact is selected
 * Or it removes the initials from being displayed if the selection of the contact is removed
 * 
 * @param {int} i - index of the clicked contact 
 */
function changeDisplayInContactIconSection(i) {
    let index = contactIconArray.indexOf(i);
    if (ContactIsAlreadyInArray(index)) {
        removeFromContactsIconArray(index);
    } else {
        addToContactsIconArray(i);
    }
    renderContactIconSection();
}


/**
 * This function checks if the Contact is already in the ContactsIconArray by checking if the index is greater -1
 * 
 * @param {int} index - index of the contact in the contactIconArray \ -1 if the contact is not in the array  
 * @returns true if index > -1
 */
function ContactIsAlreadyInArray(index) {
    return index > -1;
}

/**
 * This function removes the value at the position index from the contactIconArray
 * 
 * @param {int} index - position of the value that should be removed from contactsIconArray 
 */
function removeFromContactsIconArray(index) {
    contactIconArray.splice(index, 1); 
}


/**
 * This function adds i to the contactsIconArray
 * 
 * @param {*} i - is the index/position of the selected contactObject in the contactsArray
 */
function addToContactsIconArray(i) {
    contactIconArray.push(i);
}


/**
 * This function renders the section where the initials of the selected contacts are displayed
 */
function renderContactIconSection() {
    let container = document.getElementById('contacts-icon-section');
    container.innerHTML = '';
    for (let i = 0; i < contactIconArray.length; i++) {
        let contactIndex = contactIconArray[i] //the contactIonArray holds the indexes of the selected contacts
        container.innerHTML += templateContactIconSection(contactIndex);
    }
}


/**
 * This function generates the html code to display the selected contact (current itteration)
 * 
 * @param {int} index -  
 * @returns 
 */
function templateContactIconSection(index) {
    return /*html*/ `
        <div class="contact-icon" style="background-color: ${contacts[index]['color']}">${contacts[index]['abbreviation']}</div>
    `;
}


/**
 * This function generates the dropdown row to select invite a new contact
 * 
 * @returns a html template with the text Invite new Contact and a img of a contact symbol
 */
function templateDropwdownInviteNewContact() {
    return /*html*/ `
        <div onclick="changeVisibilityContactSection(), focusOnInput('input-invite-contact')" class="dropdown-content-child space-between">
            <span>Invite new Contact</span>
            <img src="./assets/img/add-task-invite-icon.svg">
        </div>
    `;
}


/**
 * This function changes the visibility of the elements in the contact section when:
 *      - invite new contact is selected
 *      - the invitation of a contact was fulfilled or canceled
 */
function changeVisibilityContactSection() {
    clearInput('input-invite-contact')
    changeVisibility('invite-contact-ctn');
    changeVisibility('contacts-dropdown-ctn');
    changeVisibility('contacts-dropdown');
}


///////////////////////// PIORITY SELECTION FUNCTIONS ////////////////////////////////////

/**
 * This function renders the dropdown container for the selection of the priority 
 */
function renderPrioritySelection() {
    let container = document.getElementById('prio-container');
    for (let i = 0; i < priorities.length; i++) {
        container.innerHTML += templatePrioritySelection(i);
    }
}


/**
 * This function generates the html code to display and be able to select the priotity (current iteration)
 * 
 * @param {int} i - index of the current priority in the priorities array 
 * @returns a html template which displays the name of the priority with index i and the image assigned to this priority
 */
function templatePrioritySelection(i) {
    return /*html*/ `
         <button type="button" class="prio-btn" id="${priorities[i]['name']}" onclick="selectPrio(${i})">
            ${priorities[i]['name']}
            <img src="${priorities[i]['image']}">
        </button>
    `;
}


/**
 * This function is designed change the design of the priority buttons (selected/not selected)
 * 
 * @param {int} i - index of the current priority in the priorities array 
 */
function selectPrio(i) {
    changeSelectedPrioBtn(i);
    resetOtherPrioBtns(i);
}


/**
 * This function changes the design of priority button which has been clicked
 * By changing the design it gets if a button is currently selected
 * 
 * @param {int} i - index of the current priority in the priorities array 
 */
function changeSelectedPrioBtn(i) {
    let id = priorities[i]['name'];
    let button = document.getElementById(id);
    if (!button.hasAttribute('style')) {
        changePrioImageToWhite(button, i);
        changePrioBtnColors(button, i);
    } else {
        removeStyleAttributesBtn(button)
    }
}


/**
 * This function resets the design of the priority buttons which were not clicked now but selected with a click before to default
 * 
 * @param {int} i - the index of the priority (in priorities array) which is clicked 
 */
function resetOtherPrioBtns(i) {
    for (let j = 0; j < priorities.length; j++) {
        let id = priorities[j]['name'];
        let button = document.getElementById(id); 
        //i is the clicked button
        //only gets executed for the button which was selected right before button i was clicked
        if (j != i && button.hasAttribute('style')) {
            removeStyleAttributesBtn(button)
        }
    }
}


/**
 * This function is used to change the image of the priority to white 
 * 
 * @param {Element} button - The button where the image should be changed to white
 */
function changePrioImageToWhite(button) {
    button.lastElementChild.style.filter = 'brightness(0) invert(1)'   
}


/**
 * This function changes the bg-color (according to the priorityObject) and the color of the text (white) 
 * 
 * @param {Element} button - The button where the colors should be changed
 * @param {int} i - the index of the priorityObject in the priorities array
 */
function changePrioBtnColors(button, i) {
    button.style.backgroundColor = `${priorities[i]['color']}`;
    button.style.color = 'white';
}


/**
 * This function resets the design of a priority button to default
 * This is done by removing the style attribute from the button and from the image
 * 
 * @param {Element} button - The button where the style attribute should be removed (design set back to default) 
 */
function removeStyleAttributesBtn(button) {
    button.removeAttribute('style');
    button.lastElementChild.removeAttribute('style');
}


///////////////////////// SUBTASK FUNCTIONS ////////////////////////////////////

/**
 * This function function changes which part of the subtask section is visible
 */
function changeVisibilitySubtask() {
    changeVisibility('subtask-placeholder-input-ctn');
    changeVisibility('subtask-input-ctn');
}


/**
 * This function calls the function which changes which part of the subtask section is visible
 * and clears the subtask input field  
 */
function clearSubtaskInput() {
    changeVisibilitySubtask();
    clearInput('subtask-input');
}


/**
 * This function adds the entered subtask to the task currently under creation and wirtes the subtask into the list below the subtask input
 * This only happens if the input field is not empty
 */
function addSubtask() {
    let input = document.getElementById('subtask-input');
    let subtask = input.value;
    let currentTask = task; //necessary because in edit the subtasks are also displayed but from another task 
    if (!inputFieldIsEmpty(subtask)) {
        changeVisibilitySubtask();
        addSubtaskToTask(subtask);
        addTaskToSubtaskList(subtask, currentTask);
        clearInput('subtask-input')
    }
}


/**
 * This function checks if the input field is empty
 * @param {Element} input - The input field where subtasks are entered 
 * @returns a condition which is true if input field is empty
 */
function inputFieldIsEmpty(input) {
    return input == '';
}


/**
 * This function adds the new subtask to the task in creation and increases the counter (which counts how many subtasks there are) by one
 * And adds the Status false for the created subtask
 * 
 * @param {string} subtask - the value entered in the subtask input field (the name of the subtask)
 */
function addSubtaskToTask(subtask) {
    task['subtasksArray'].push(subtask);
    task['subtasks']++;
    task['status-subtasks'].push(false);
}


/**
 * This function adds the currently entered subtask to the container which displays all subtasks below the input field
 * 
 * @param {string} subtask - the value which has been entered in the subtask input field
 */
function addTaskToSubtaskList(subtask) {
    let container = document.getElementById('subtask-list-container');
    container.innerHTML += templateSubtaskList(subtask);
}

/**
 * This function generates the html code used to display the newly entered subtask in the subtask list
 * 
 * @param {string} subtask - the value entered in the subtask input field 
 * @returns a html template with a list item consisting of the name of the subtask and a checkbox
 */
function templateSubtaskList(subtask) {
    return /*html*/ `
        <li class="subtask-list-entry flex"><input id="cb-subtask-${task['subtasks']-1}" class="subtask-checkbox" type="checkbox">${subtask}</li>
    `;
}





///////////////////////// BOTTOM BUTTONS SECTION ////////////////////////////////////

/**
 * This function changes the image in the clear button to a lightblue version of it 
 */
function clearImageToLightBlue() {
    let img = document.getElementById('clear-image');
    img.src = './assets/img/blue-cancel-icon.png'
}


/**
 * This function changes the image in the clear button to a darkblue version of it  
 */
function clearImageToDarkBlue() {
    let img = document.getElementById('clear-image');
    img.src = './assets/img/clear-x-icon.png'
}


/**
 * This function sets the add task form back to default
 * In add_task.html the initAddTask is called to reset everything
 * the other pages the add task pop up is closed which leads to the same effect
 */
function clearAddTask() {
    if (window.location.pathname == '/add_task.html') {
        initAddTask();
    } else {
        closeBoardAddtaskPopup()
    }
}


///////////////////////// CREATE TASK ////////////////////////////////////

async function createTask() {
    let currentTask = task; //to be able to reuse functions in edit task
    addInputValuesToTask(currentTask, 'title');
    addInputValuesToTask(currentTask, 'description');
    addInputValuesToTask(currentTask, 'due-date');
    changeSubtasksStatus(currentTask);
    addPriotityToTask(currentTask);
    pushAssignedContactsToTask(currentTask);
    pushTaskToTodo();
    await addBoard();
    clearAddTask();
    switchToBoard();
    await init();
}


function addInputValuesToTask(currentTask, identifier) {
    currentTask[identifier] = document.getElementById(identifier).value;
}


function addPriotityToTask(currentTask) {
    for (let i = 0; i < priorities.length; i++) {
        let btn = document.getElementById(priorities[i]['name']); //id of the btns equals name of the priority
        if (btn.hasAttribute('style')) {
            currentTask['prior'] = priorities[i];
        }
    }
}


function pushAssignedContactsToTask(currentTask) {
    currentTask['team'] = []; //to make sure contacts are removed in edit when they are not anymore selected
    let checkboxes = document.querySelectorAll('.contacts-cb:checked'); //get all selected contacts checkboxes
    for (let i = 0; i < checkboxes.length; i++) {
        if (currentUserIsSelected(checkboxes[i])) {
            addCurrentUserToTeam()
        } else {
            currentTask['team'].push(contacts[checkboxes[i].value]); //value contains and index of the contact in the object contacts
        }
    }
}


function currentUserIsSelected(checkbox) {
    return checkbox.value == 'you';
}


function addCurrentUserToTeam() {
    //TODO
}


function changeSubtasksStatus(currentTask) {
    for (let i = 0; i < currentTask['subtasksArray'].length; i++) {
        resetSubtaskStatusAndFinishCounter(currentTask, i); //to make sure if a subtask is not anymore ticked it gets reset
        let checkbox = document.getElementById('cb-subtask-' + i);
        if (checkbox.checked == true) {
            currentTask['status-subtasks'][i] = true;
            currentTask['finished-subtasks']++;
        }
    }
}


function resetSubtaskStatusAndFinishCounter(currentTask, i) {
    currentTask['status-subtasks'][i] = false;
    currentTask['finished-subtasks']--;
}


function pushTaskToTodo() {
    boardColumns[0].push(task);
}


function switchToBoard() {
    if (URLequalsAddTaskHtml()) {
        setTimeout(function (){
            window.location.href = '/board.html';     
          }, 500);
    }
}

///////////////////////// GENERAL FUNCTIONS////////////////////////////////////

function changeVisibility(id) {
    let dropdown = document.getElementById(id);
    if (dropdown.classList.contains('d-none')) {
        dropdown.classList.remove('d-none');
    } else {
        dropdown.classList.add('d-none');
    }
}


function focusOnInput(id) {
    document.getElementById(id).focus();
}


function clearInput(id) {
    let elem = document.getElementById(id);
    if (elem.value != '') {
        elem.value = '';
    }
}


///////////////////////// SEND INVITE EMAIL ////////////////////////////////////

async function sendInviteMail() {
    //event.preventDefault();
    //giveID(); 
    let formData = document.getElementById('input-invite-contact').value;
    let response = await actionInvite(formData);
    if(response.ok) { 
        console.log('email was send!');
    } else {
        alert('Email not send!');
    }
}

function actionInvite(formData) {
     const input = 'https://gruppe-348.developerakademie.net/join/send_invite_mail.php';
     const requestInit = {
         method: 'post',
         body: formData
     };

     return fetch(
         input,
         requestInit
         );
}
