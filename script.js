// ##### TASK #####
let task;

/** That object is used in AddTask when creating a new task. 
 * Familiar functions: templatePrioritySelection(i), changeSelectedPrioBtn(i), resetOtherPrioBtns(i) */
let priorities = [
    {
        'name': 'Urgent',
        'prio-index': 0,
        'image': './assets/img/red-prio.svg',
        'color': '#FF3D00'
    },
    {
        'name': 'Medium',
        'prio-index': 1,
        'image': './assets/img/orange-prio.svg',
        'color': '#FFA800'
    },
    {
        'name': 'Low',
        'prio-index': 2,
        'image': './assets/img/green-prio.svg',
        'color': '#7AE229'
    }
]


// ##### CONTACTS #####
let contacts = [];

/** That object is important when creating a new contact in contacts. Familiar functions: addAllInputValuesToContact() */
let newContact = {
    'name': '',
    'color': '',
    'email': '',
    'phone': '',
    'abbreviation': '',
}

/** That object is important to for the scroll function, after editting or creating a new contact in "contacts"
 *  Familiar functions: settingContactValuesGlobaly(index, letter, number), cleanContactValues()
 */
let contactValues = {
    'index' : '',
    'letter' : '',
    'number' : '',
}

/** That variable is important to scroll to the new contact after creating it.
 *  Find it in contacts.js. Familiar functions: filerContacts() 
 */
let createdContact;

/** This two variables are important for loading the right templates and buttons, if a contact will be editted or not (creating new contact).
 *  Familiar functions: settingValuesForEdittingContact(index), cleanValuesForEdittingContact()
*/
let edittingNewContact = false;
let indexOfChoosedContactToEdit;

/** Array for choosing a random color out of this array. Find it in contacts.js
 *  Familiar functions: addColorToContact(identifier)
 */
let colors = ['#0190e0','#ee00d6', '#02cf2f', '#ffa800', '#9327ff', '#ff5c00', '#4e963d', '#32daff', '#007cee', '#cb02cf']

/** That variable is important to get an alphabetic order in the contacts list. 
*  Familiar functions: filterContacts(list)
*/
let alphabet = [...'abcdefghijklmnopqrstuvwxyz'];


// ##### USERS #####
let users = [];

// ##### CATEGORY #####
let category = [];
let categoryColors = ['#FF8A00', '#8AA4FF', '#FF0000', '#2AD300', '#E200BE', '#0038FF']


// ##### NAV #####
let selectedNavItem = 0;

/**
 * That function marks the category/tab in the navbar on the same page.
 * @param {number} n - The id of the category/tab in the nav
 */
function markNavItem(n) {
    unmarkAllNAvItems();
    selectedNavItem = n;
    document.getElementById(`${n}`).classList.add('selected-nav-item');  
}


function markPreviewsNavItem() {
    document.getElementById(`${selectedNavItem}`).classList.add('selected-nav-item'); 
}


function unmarkAllNAvItems() {
    for (let i = 1; i < 5; i++) document.getElementById(`${i}`).classList.remove('selected-nav-item');
}


// ##### HEADER RESPONSIVE #####
function renderResponsiveHeaderTitle() {
    document.getElementById('content-container').innerHTML = `<p class="header-title-resp cursor-d">Kanban Project Management Tool</p>`;
}


// ########## BACKEND ##########
setURL('https://gruppe-348.developerakademie.net/smallest_backend_ever');


async function init() {
    await downloadFromServer();
    users =  await JSON.parse(backend.getItem('users')) || [];
    user = await JSON.parse(backend.getItem('currentUser')) || [];
    boardColumns =  await JSON.parse(backend.getItem('boardColumns')) || [[], [], [], []]; // compare with line 6
    category =  await JSON.parse(backend.getItem('category')) || [];
    contacts =  await JSON.parse(backend.getItem('contacts')) || [];
    getCurrentUserHeaderData();
    renderSiteRelatedTemplate();
}


function renderSiteRelatedTemplate() {
    if(navAndHeaderNeeded()) renderNavAndHeader();
    if(window.location.pathname.includes('summary.html')) initSummary(1);
    else if(window.location.pathname.includes('board.html')) initBoard(2);
    else if(window.location.pathname.includes('add_task.html')) initAddtask(3);
    else if(window.location.pathname.includes('contacts.html')) initContacts(4);
    
}


function navAndHeaderNeeded() {
    if(window.location.pathname.includes('index.html' || 'sign_up.html' || 'reset_password.html' || 'forgot_password.html')) return false;
    else return true;
}


function renderNavAndHeader() {
    renderNav();
    renderHeader();
}


function initSummary(value) {
    greet();
    markNavItem(value);
    renderPopups();
    renderSummary();
}


function initBoard(value) {
    markNavItem(value);
    renderPopupsInBoard();
    renderBoard();
}


function initAddtask(value) {
    markNavItem(value);
    renderPopups();
    initAddTask();
}


function initContacts(value) {
    markNavItem(value);
    renderPopupsInContacts();
    renderContactsList();
}

// LOGIN 
function isLoggedIn() {
    let itemSet = localStorage.getItem('usersEmail');
    if(!itemSet) {
        window.location.href = 'index.html?msg=Du hast dich erfolgreich abgemeldet';
    }
}


// ADD
async function addContact() {
    await backend.setItem('contacts', JSON.stringify(contacts));
}

async function addBoard() {
    await backend.setItem('boardColumns', JSON.stringify(boardColumns));
}

// async function addUser() {
//     users.push('John);
//     await backend.setItem('users', JSON.stringify(users));
// }
// DELETE
// function deleteUser(name) {
//     await backend.deleteItem('users');
// }


// HELPFULL FUNCTIONS
function addClasslist(id, classe) {
    document.getElementById(id).classList.add(classe);
}

function removeClasslist(id, classe) {
    document.getElementById(id).classList.remove(classe);
}

function doNotClose(event) {
    event.stopPropagation();
}


function reloadPage() {
    window.location.reload(true);
}


function getNameLetters(name) {
    let firstLetter = name.toString().charAt(0).toUpperCase();  
    let index = name.indexOf(' '); 
    let secondLetter = name.toString().charAt(index+1).toUpperCase();
    return firstLetter + secondLetter;
}


// Returns a random integer from 0 to 9:
//Math.random returns a number lower than 1
//Math.floor makes the decimal number to a 'no decimal' number
//10 is the number of values we want, beginning from  0
//Using this function to get a random color out of the array 'colors'
function getRandomNumberFromZeroToNine() {
    return Math.floor(Math.random() * 10);
}


function URLequalsAddTaskHtml() {
    if ('/add_task.html' == window.location.pathname) {
        return true
    }
}




