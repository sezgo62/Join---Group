// let createdTask = {
//     'category': {'name': 'Design','color': '#FF7A00'},
//     'title': 'Website redesign',
//     'description': "Modify the contents of the main website. Adjust the UI to the company's brand design.",
//     'progress': 0,
//     'subtasks': 1,
//     'team': [
//         {
//             'name': 'Simon Meyer',
//             'color': '#0190E0',
//             'email': 'simon.meyer@gmail.com',
//             'phone': '+49 0123 456 78 9'
//         },{
//             'name': 'Maximilian Vogel',
//             'color': '#EE00D6',
//             'email': 'maximilian.vogel@gmail.com',
//             'phone': '+49 0123 456 78 9'
//         }
//     ],
//     'prior': {
//         'name': 'Low',
//         'prio-index': 2,
//         'image': 'assets/img/green.png',
//         'color': '#7AE229'
//     },
//     'board': 0,
//     'due-date': '2022-11-26'
// };


// let createdTask2 = {
//     'category': {'name': 'Media','color': '#29ABE2'},
//     'title': 'New Interview',
//     'description': "Making an interview with someone on the planet earth.",
//     'progress': 0,
//     'subtasks': 2,
//     'team': [
//         {
//             'name': 'Simon Meyer',
//             'color': '#0190E0',
//             'email': 'simon.meyer@gmail.com',
//             'phone': '+49 0123 456 78 9'
//         },{
//             'name': 'Maximilian Vogel',
//             'color': '#EE00D6',
//             'email': 'maximilian.vogel@gmail.com',
//             'phone': '+49 0123 456 78 9'
//         },{
//             'name': 'Eva Fischer',
//             'color': '#02CF2F',
//             'email': 'Eva.Fischer@gmail.com',
//             'phone': '+49 0123 456 78 9'
//         },{
//             'name': 'Kevin Schumilo',
//             'color': '#02CF2F',
//             'email': 'kevin.schumilo@gmail.com',
//             'phone': '+49 0123 456 78 9'
//         }
//     ],
//     'prior': {
//         'name': 'Urgent',
//         'prio-index': 0,
//         'image': './assets/img/red-prio.svg',
//         'color': '#FF3D00'
//     },
//     'board': 0,
//     'due-date': '2022-11-26'
// };


let boardColumnTitle = ['To do', 'In progress', 'Awaiting Feedback', 'Done'];
let emptyBoardColumn = ['No task to do', 'Nothing in progess', 'No Feedback awaiting', 'Nothing here'];
let currentElementTicket;
// let currentElementColumn;
let currentElement;

// function addTest() {
//     todo.push(createdTask); // beide JSON dürfen vom Namen nicht gleich sein! sonst haben sie den selben Pointer
//     todo.push(createdTask2);
// }

function renderBoard() {
    renderBoardContent();
    document.getElementById('content-container').innerHTML += renderBoardSearchbarPopup();
}


function renderBoardContent() {
    let content = document.getElementById('board-content');
    content.innerHTML = '';
    for (let i = 0; i < boardColumns.length; i++) {
        content.innerHTML += renderTemplateBoardColumn(i);
        if(window.innerWidth > 800 || boardColumns[i].length > 0) renderOnholdTicketTargetResponsive(i);
        else renderBoardColumnIsEmptySign(i);
        renderBoardColumnContent(i);
    }
    renderOnholdTicketTarget();
}


function renderTemplateBoardColumn(i) {
    return `<div class="board-column flex column">
                <div class="board-column-header flex cursor-p">
                    <p>${boardColumnTitle[i]}</p>
                    <div class="board-column-header-plus flex" onclick="openBoardAddtaskPopup()">+</div>
                </div>
                <div class="board-tickets w-100 flex column" id="board-column-${i}" ondrop="drop(${i})" ondragover="allowDrop(event);highlightAreas(${i})" ondragleave="removeHighlightAreas(${i})"></div>
            </div>`;
}


function renderBoardColumnContent(n) {
    let content = document.getElementById(`board-column-${n}`);
    if(boardColumns[n].length > 0) {
        for (let j = 0; j < boardColumns[n].length; j++) {
            content.innerHTML += renderTemplateTicket(n,j);
            renderTicketContent(n,j);
        }
    }
}


////////////////// TICKET /////////////////////
// >>===============================> =======================================> ==============================================> =======================================>
/**
 * That is a template function which returns the ticket-container, where the ticket details will be rendered inside
 * @param {number} n - n is the column number starting at 0
 * @param {number} j - j is the row or the ticket-number in that column
 * @returns the ticket template
 */
function renderTemplateTicket(n,j) {
    return `<div class="ticket-container flex column cursor-p" id="ticket-container-${n}-${j}" draggable="true" ondragstart="startDragging(${n}, ${j})" onmousedown="highlightTicket(${n},${j})" onmouseup="removeHighlightTicket(${n},${j})" onclick="renderTicketInfoPopupContainer(${n}, ${j})"></div>`;
}


function renderTicketContent(n, j) {
    renderTemplateTicketCategory(n,j);
    renderTemplateTicketDescription(n,j);
    renderTemplateTicketProgressbar(n,j);
    setProgressBar(n,j);
    renderTemplateTicketFooter(n,j);
    renderTicketTeam(n,j);
}

////////////////// CATEGORY
function renderTemplateTicketCategory(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += `
        <div class="ticket-category-container flex">
            <p class="ticket-category" id="ticket-category-${n}-${j}">${boardColumns[n][j]['category']['name']}</p>
        </div>`;
    document.getElementById(`ticket-category-${n}-${j}`).style.backgroundColor = `${boardColumns[n][j]['category']['color']}`;
}

////////////////// DESCRIPTION
function renderTemplateTicketDescription(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += `
        <div class="ticket-description-container flex column">
            <p class="ticket-description-title">${boardColumns[n][j]['title']}</p>
                <div class="ticket-description" id="ticket-description-${n}-${j}">
                    ${boardColumns[n][j]['description']}
                </div>
        </div>`;
}

////////////////// PROGRESSBAR
function renderTemplateTicketProgressbar(n,j) {
    if(boardColumns[n][j]['subtasks'] > 0) { 
        let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
        ticketContent.innerHTML += `
            <div class="process-bar-container flex" id="process-bar-container-${n}-${j}">
                <progress class="process-bar" id="process-bar-${n}-${j}" value="" max="1"></progress>
                <div class="process-state">${boardColumns[n][j]['process']}/${boardColumns[n][j]['subtasks']}</div>
            </div>`;
    }
}


function setProgressBar(n,j) {
    if(boardColumns[n][j]['process'] > 0) {
        let progressValue = (boardColumns[n][j]['process']/boardColumns[n][j]['subtasks']);
        document.getElementById(`process-bar-${n}-${j}`).value = progressValue;
    }
}


function renderTemplateTicketFooter(n,j) {
    let ticketContent = document.getElementById(`ticket-container-${n}-${j}`);
    ticketContent.innerHTML += `
        <div class="ticket-footer-container flex">
            <div class="ticket-contacts-container flex" id="ticket-contacts-container-${n}-${j}"></div>
            <img class="state-img" src="${boardColumns[n][j]['prior']['image']}">
        </div>`;
}

////////////////// TEAM
function renderTicketTeam(n,j) {
    let name;
    let k = boardColumns[n][j]['team'].length;
    let content = document.getElementById(`ticket-contacts-container-${n}-${j}`);
    if(boardColumns[n][j]['team'].length > 3) k = 2;
    for (let i = 0; i < k ; i++) {
        name = boardColumns[n][j]['team'][i]['name'];
        content.innerHTML += `<div class="ticket-contact" id="board-contact-${n}-${j}-${i}">${getNameLetters(name)}</div>`;
        coloringTicketMembers(n,j,i);
    }
    if(k < boardColumns[n][j]['team'].length) renderContactPlaceholder(k,n,j,content);
}


function coloringTicketMembers(column, ticket, teamMember) {
    document.getElementById(`board-contact-${column}-${ticket}-${teamMember}`).style.backgroundColor = `${boardColumns[column][ticket]['team'][teamMember]['color']}`;
}


function renderContactPlaceholder(k,column,ticket,content) {
    if (k < boardColumns[column][ticket]['team'].length) {
        content.innerHTML += `<div class="ticket-contact contact-placeholder">+${getRestNumberOfMembers(column, ticket)}</div>`;
    }
}


function getRestNumberOfMembers(column, ticket) {
    return boardColumns[column][ticket]['team'].length - 2;
}
// <<=============================== <======================================= <============================================== <=======================================


function removeEmptyBoardColumnProperties(n) {
    document.getElementById(`board-column-${n}`).classList.remove('emptyColumn');
}


function renderTemplateOnholdTicketResponsive(content, column) {
    content.innerHTML += `<div class="onhold-container-first w-100" id="onhold-container-column-${column}-first"></div>`;
}


function renderBoardColumnIsEmptySign(n) {
    content = document.getElementById(`board-column-${n}`);
    content.innerHTML = `<p class="noTask cursor-d w-100">${emptyBoardColumn[n]}</p>`;
    emptyBoardColumnProperties(n);
}


function emptyBoardColumnProperties(n) {
    document.getElementById(`board-column-${n}`).classList.add('emptyColumn');
}


function renderOnholdTicketTarget() {
    let content;
        for (let i = 0; i < boardColumns.length; i++) {   
                content = document.getElementById(`board-column-${i}`);
                content.innerHTML += `<div class="onhold-container-last w-100" id="onhold-container-column-${i}-last"></div>`;
        }
}

function renderOnholdTicketTargetResponsive(i) {
    let content;  
    content = document.getElementById(`board-column-${i}`);
    content.innerHTML = `<div class="onhold-container-first w-100" id="onhold-container-column-${i}-first"></div>`;
}

////////////////// DRAGGING AND DROP /////////////////////
function startDragging(column, ticket) {
    currentElement = boardColumns[column][ticket];
    for (let i = 0; i < boardColumns.length; i++) highlightAllAreas(i,column,ticket);
    for (let i = 0; i < boardColumns.length; i++) removeAllHighlightAreas(i);
    currentElementTicket = ticket;
}


async function drop(column) {
    if (currentElement['board'] != column) {
        boardColumns[currentElement['board']].splice(currentElementTicket,1);
        if(window.innerWidth > 800) pushNewElement(column);
        else unshiftNewElement(column);
        currentElement = '';
    }
    await addBoard();
    await init();
}


function allowDrop(ev) {
    ev.preventDefault();
}


function pushNewElement(column) {
    boardColumns[column].push(currentElement);
    boardColumns[column][boardColumns[column].length-1]['board'] = column; 
}


function unshiftNewElement(column) {
    boardColumns[column].unshift(currentElement);
    boardColumns[column][0]['board'] = column; 
}


////////////////// SEARCHBAR INPUT /////////////////////
function showInput() {
    document.getElementById(`board-header-search-container`).classList.add('d-none');
    document.getElementById('board-header-search-input-and-results-popup').classList.remove('d-none');
    document.getElementById(`board-header-search-input-popup-full`).classList.remove('d-none');
}


function taskFilter() {
    let resultsContainer = document.getElementById('board-header-search-results-popup');
    resultsContainer.innerHTML = '';
    let input = document.getElementById('board-header-search-input-popup');
    let inputComparison = input.value.toLowerCase();
    document.getElementById('board-header-search-results-popup').classList.add('d-none');
    if(input.value.length > 0) filterTicketTitles(inputComparison, resultsContainer, 0);
}


function filterTicketTitles(inputComparison, resultsContainer, n) {
    let TeamMemberHere = false;
    for (let i = 0; i < boardColumns.length; i++) {
        if(boardColumns[i].length > 0) {
            for (let j = 0; j < boardColumns[i].length; j++) {
                let ticketCategory = boardColumns[i][j]['category']['name'].toLowerCase();
                let ticketTitle = boardColumns[i][j]['title'].toLowerCase();
                let ticketDescription = boardColumns[i][j]['description'].toLowerCase();
                TeamMemberHere = isTeamMemberHere(i, j, inputComparison);
                if(ticketCategory.includes(inputComparison) || ticketTitle.includes(inputComparison) || ticketDescription.includes(inputComparison) || TeamMemberHere) renderSearchResult(i, j, n, resultsContainer)
            }
        }
    }
}


function isTeamMemberHere(i,j, inputComparison) {
    let member;
    for (let m = 0; m < boardColumns[i][j]['team'].length; m++) {
        member = (boardColumns[i][j]['team'][m]['name'].toLowerCase());
        if(member.includes(inputComparison)) return true;
    }
    return false;
}


function renderSearchResult(i, j, n, resultsContainer) {
    resultsContainer.innerHTML += returnTemplateSearchResult(i, j, n);
    searchResultTeamNames(i, j);
    document.getElementById(`search-result-ticket-category-${i}-${j}-${n}`).style.backgroundColor = `${boardColumns[i][j]['category']['color']}`;
    document.getElementById('board-header-search-results-popup').classList.remove('d-none');
    document.getElementById(`search-result-${i}-${j}-${n}`).classList.add('bold');
}


function returnTemplateSearchResult(i, j, n) {
    return `<a class="search-result flex w-100" href="#ticket-container-${i}-${j}" onclick="closeBoardSearchbarPopup()">
                <div class="search-result-p-container w-100 flex column">
                    <p class="search-result-p w-100 bold" id="search-result-${i}-${j}-0">${boardColumns[i][j]['title']}</p>
                    <p class="search-result-p" id="search-result-${i}-${j}-1">${boardColumns[i][j]['description']}</p>
                    <div class="ticket-contacts-container flex" id="search-result-contacts-container-${i}-${j}-2"></div>
                </div>
                <div class="search-result-ticket-category-point" id="search-result-ticket-category-${i}-${j}-${n}"></div>
            </a>`;
}


function searchResultTeamNames(i,j) {
    let content = document.getElementById(`search-result-contacts-container-${i}-${j}-2`);
    for (let k = 0; k < boardColumns[i][j]['team'].length; k++) {
        content.innerHTML += `<div class="search-result-ticket-contact" id="board-contact-${i}-${j}-${k}-2">${getNameLetters(i, j, k)}</div>`;
    }
}


////////////////// AREA & TICKET - HIGHLIGHTING //////////////////////////
function highlightAllAreas(i,column,ticket) {
    if(i != currentElement['board']) {
        document.getElementById(`onhold-container-column-${i}-last`).classList.add('highlight-area');
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            document.getElementById(`onhold-container-column-${i}-first`).classList.add('highlight-area');
        let myDiv = document.getElementById(`ticket-container-${column}-${ticket}`);
        let getHeight = myDiv.offsetHeight;
        document.getElementById(`onhold-container-column-${i}-last`).style.height = `${getHeight}px`;
    }
}


function removeAllHighlightAreas(i) {
    setTimeout( () => {
        if(i != currentElement['board']) {
            document.getElementById(`onhold-container-column-${i}-last`).classList.add('no-highlight-area');
            if(window.innerWidth > 800 || boardColumns[i].length > 0)
                document.getElementById(`onhold-container-column-${i}-first`).classList.add('no-highlight-area');
        }
    }, 600)
}

function highlightAreas(i) {
    if(i != currentElement['board']) {
        document.getElementById(`onhold-container-column-${i}-last`).classList.add('highlight-area-more');
        if(window.innerWidth > 800 || boardColumns[i].length > 0)
            document.getElementById(`onhold-container-column-${i}-first`).classList.add('highlight-area-more');
    }
}


function removeHighlightAreas(i) {
    document.getElementById(`onhold-container-column-${i}-last`).classList.remove('highlight-area-more');
    if(window.innerWidth > 800 || boardColumns[i].length > 0)
        document.getElementById(`onhold-container-column-${i}-first`).classList.remove('highlight-area-more');
}


function highlightTicket(column, ticket) {
    document.getElementById(`ticket-container-${column}-${ticket}`).classList.add('ticket-highlight');
}


function removeHighlightTicket(column, ticket) {
    document.getElementById(`ticket-container-${column}-${ticket}`).classList.remove('ticket-highlight');
}




