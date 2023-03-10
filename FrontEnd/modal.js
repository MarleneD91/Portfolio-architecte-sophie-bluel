/* ------------------------- MODALS ------------------------- */

/* ############# EDIT MODAL HOME ############# */

let modal= null;

//function / event
const openModal = function (e) {
    e.preventDefault();

    // open modal
    modal = document.querySelector(e.target.getAttribute('href'));
    modal.style.display = null;
    modal.removeAttribute ("aria-hidden");
    modal.setAttribute("aria-modal","true");

    //close modal 
    modal.addEventListener('click', closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation);
}
// Close modal function
const closeModal = function (e) {
    if (modal === null) return;

    e.preventDefault();

    modal.style.display = "none";
    modal.setAttribute ("aria-hidden", "true")
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation);
    modal = null; 
    
}
// Stop propagation
const stopPropagation = function(e) {
    e.stopPropagation();
}

// add event listener to open the modal
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal);
});

 window.addEventListener("keydown",function (e){
    if ( e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    };
    if (e.key === "Tab" && modal != null) {
        focusInModal(e);
    };
 });

 /* Load the gallery in the modal */


 async function fetchData () {
    const fetchProjects = await fetch ("http://localhost:5678/api/works");
    const projects = await fetchProjects.json();
    console.log(projects);
    if (fetchProjects.ok) {
        return projects;
    } else {
        console.log ("error");
    };
};
fetchData().then(function(projects) {
    for (let i = 0; i<projects.length; i++){
        const projectInfo = projects[i];
        const cardsContainer = document.getElementById("cards-container");
        const card = document.createElement("figure");
        card.setAttribute("class", "project-card");
        const projectImgUrl = projectInfo.imageUrl;
        const projectImg = document.createElement("img");
        projectImg.setAttribute("src", projectImgUrl);
        projectImg.setAttribute("alt", projectInfo.title);
        projectImg.setAttribute("class","project-img")
        card.appendChild(projectImg);
        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("class", "fa-solid fa-trash-can delete-icon");
        trashIcon.setAttribute("id", projectInfo.id);
        trashIcon.addEventListener("click", deleteProject)
        card.appendChild(trashIcon);
        const imgCaption = document.createElement("figcaption");
        imgCaption.setAttribute("class","figcaption");
        imgCaption.innerText = "éditer";
        card.appendChild(imgCaption);
        cardsContainer.appendChild(card);

    };


});

/* ############# EDIT MODAL : ADD PICTURE ############# */
//const token = localStorage.getItem("token"); // retrieve token for fetch authorization

const deleteProject = function (e) {
    e.preventDefault();
    const confirmDial = window.confirm("Êtes vous certain de vouloir supprimer ce projet ?");
    if(confirmDial) {
        async function fetchDelete(){
            console.log(e.target);
            const projectId = parseInt(e.target.id);
            console.log(projectId);

            const deleteUrl = "http://localhost:5678/api/works/" + projectId
            const deleteRequest = await fetch (deleteUrl, {
                method : "DELETE",
                headers : { 
                    "accept":"*/*",
                    "Authorization":"Bearer " + token
                 },
                body: projectId,
            })
            const deleteResponse = await deleteRequest.json();
            console.log(deleteResponse);

            if (deleteResponse.status == 200){
                alert("Le projet a bien été supprimé.");
                /*window.localStorage.setItem("token", fetchPostData.token);
                window.location.replace("");*/
            } else if (deleteResponse.status == 401) {
                    alert ("Vous n'êtes pas autorisé à effectuer cette action.");
            } else if (deleteResponse.status == 500) {
                    alert("Un comportement innatendu est survenu.")
            }  
        };
        fetchDelete();
    }
}

/*document.querySelectorAll(".delete-icon").forEach(icon => {
    icon.addEventListener("click", deleteProject);
});*/


console.log(allProjects);