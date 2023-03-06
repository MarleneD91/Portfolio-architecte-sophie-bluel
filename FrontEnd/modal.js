const token = window.localStorage.getItem("token");
if (token){ //visual changes

    /* edition bar */
    const adminSection = document.createElement("section");
    adminSection.setAttribute("class", "admin-bar");
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    html.insertBefore(adminSection, body);
    const editionIcon = document.createElement("i");
    const iconPen = "fa-regular fa-pen-to-square edition";
    editionIcon.setAttribute("class", iconPen);
    adminSection.appendChild(editionIcon);
    const editionP = document.createElement("p");
    editionP.innerHTML = "Mode édition";
    editionP.setAttribute("class","edition edition-txt");
    adminSection.appendChild(editionP);
    const editionButton = document.createElement("button");
    editionButton.setAttribute("id", "edition-button");
    editionButton.innerText = "publier les changements";
    adminSection.appendChild(editionButton);  
    
    /* hide filters section */
    const filters = document.querySelector(".filters");
    filters.style.display = "none";

    /*"login" to "logout"*/
    const login = document.querySelector("#login");
    login.style.display = "none";
    const logout = document.createElement("li");
    logout.innerText = "logout";
    logout.setAttribute("id", "logout");
    const contact = document.querySelector("#contact");
    contact.after(logout);

    /* Architecte picture - add the caption - "change" */
    const architectPicture = document.querySelector("#architect-picture");
    const changeElement = document.createElement("div");
    changeElement.setAttribute("class", "change-architect");
    const changeIcon = document.createElement("i");
    changeIcon.setAttribute("class", "fa-regular fa-pen-to-square change-icon");
    changeElement.appendChild(changeIcon);
    const changeTxt = document.createElement("p");
    changeTxt.setAttribute("class", "change-txt")
    changeTxt.innerText =  "modifier";
    changeElement.appendChild(changeTxt);
    architectPicture.appendChild(changeElement);

    /* Project - add "change" */
    const portfolio = document.querySelector("#portfolio");
    const gallery = document.querySelector(".gallery")
    const myProjects = document.createElement("div");
    myProjects.setAttribute("class", "my-projects");
    portfolio.insertBefore(myProjects, gallery);
    const projectH2 = document.querySelector("#portfolio > h2");
    myProjects.appendChild(projectH2);
    const changeElement2 = document.createElement("div");
    changeElement2.setAttribute("class", "change-projects");
    const changeIcon2 = document.createElement("i");
    changeIcon2.setAttribute("class", "fa-regular fa-pen-to-square change-icon");
    changeElement2.appendChild(changeIcon2);
    const changeTxt2 = document.createElement("p");
    changeTxt2.setAttribute("class", "change-txt")
    changeTxt2.innerText =  "modifier";
    changeElement2.appendChild(changeTxt2);
    architectPicture.appendChild(changeElement2);
    projectH2.after(changeElement2);


    
    

} ;
/* logout */
document.querySelector("#logout").addEventListener("click", function(){
    localStorage.removeItem("token");
    window.location.replace("");
});

