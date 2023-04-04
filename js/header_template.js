function renderHeader() {
    let content = document.getElementById('header');
    content.innerHTML = templateHeader();
    if(currentUserHeaderData['abbreviation']) showUserInHeader();
    else showGuestUserInHeader();
}


function showUserInHeader() {
    let header = document.getElementById(`header-right-corner`);
    header.innerHTML += `<div class="header-profil-container flex cursor-p" id="header-profil-container-user" onclick="openHeaderMenuPopup()"><p class="header-profil flex " id="header-profil-container-user-abbreviation">${currentUserHeaderData['abbreviation']}</p></div>`;
    document.getElementById(`header-profil-container-user`).style.backgroundColor = `${currentUserHeaderData['color']}`;
    document.getElementById(`header-profil-container-user-abbreviation`).style.color = `${currentUserHeaderData['color']}`;
    document.getElementById(`header-profil-container-user-abbreviation`).style.border = `2px solid ${currentUserHeaderData['color']}`;
    document.getElementById(`header-profil-container-user-abbreviation`).style.filter = `invert(1)`;
    
}


function showGuestUserInHeader() {
    let header = document.getElementById(`header-right-corner`);
    header.innerHTML += `<div class="header-profil-container flex cursor-p" id="header-profil-container" onclick="openHeaderMenuPopup()"><img class="header-profil" src="assets/img/add-contact-icon.png"></div>`;
}



function templateHeader() {
    return `<p class="header-title cursor-d">Kanban Project Management Tool</p>
            <div class="header-right-corner flex" id="header-right-corner">
                <a href="help.html"><img class="help-img cursor-p" src="assets/img/question-mark-icon.png"></a>
                
                <img class="logo-img-resp absolute" src="assets/img/logo-big2.png">
            </div>
            <div class="header-right-corner-addTask flex" id="header-right-corner-addTask">
                <img class="logo-img-resp absolute" src="assets/img/logo-big2.png">
                <button form="myform" value="update" class="create-btn-responsive">
                    Create
                    <img src="./assets/img/check-small.png">
                </button>
            </div>`;
}