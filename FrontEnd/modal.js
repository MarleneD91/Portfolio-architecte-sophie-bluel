const token = window.localStorage.getItem("token");
if (token){
    const adminSection = document.createElement("section");
    adminSection.setAttribute("class", "admin-bar");
    const body = document.querySelector("body");
    const headers = document.querySelector("headers");
    body.insertBefore(adminSection, headers);
    const editionMode = document.createElement("div");
    const editionIcon = '<i class="fa-solid fa-pen-to-square edition"></i></br>';
    const editionTxt = '<p class="edition">Mode édition</p>';
    editionMode.innerHTML = editionIcon + editionTxt;
    adminSection.appendChild(editionMode);
    const editionButton = document.createElement("button");
    editionButton.innerText = "publier les changements";
    adminSection.appendChild(editionButton);    
}