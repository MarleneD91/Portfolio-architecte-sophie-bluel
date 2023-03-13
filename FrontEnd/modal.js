/* ------------------------- MODALS ------------------------- */

//Global const
const modalContainer = document.getElementById("modal-container");
const modalWrapper = document.querySelector(".modal-wrapper");
const homeEditModal = document.querySelector("#home-edit-modal");
const addEditModal = document.querySelector("#add-modal");
let arrow = null;
let modal= null;

/* ############# EDIT MODAL HOME ############# */


//function / event
const openModal = function (e) {
    e.preventDefault();
    homeEditModal.style.display = null;   
    addEditModal.style.display = "none"; 

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
    arrow.remove(); 
   
    
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

/* ############# EDIT MODAL : DELETE PROJECT ############# */
//const token = localStorage.getItem("token"); // retrieve token for fetch authorization

const deleteProject = function (e) {
    e.preventDefault();
    const confirmDial = window.confirm("Êtes vous certain de vouloir supprimer ce projet ?");
    if(confirmDial) {
        async function fetchDelete(){
            console.log(e.target);
            const projectId = e.target.id;
            console.log(projectId);

            const deleteUrl = "http://localhost:5678/api/works/" + projectId
            console.log(deleteUrl);
            const deleteRequest = await fetch (deleteUrl, {
                method : "DELETE",
                headers : { 
                    "accept":"*/*",
                    "Authorization":"Bearer " + token,
                 }
            }); 
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
        }
        fetchDelete();
    }
}

/*document.querySelectorAll(".delete-icon").forEach(icon => {
    icon.addEventListener("click", deleteProject);
});*/

console.log(allProjects);
// A REVOIR : pb json data !!

/* ############# EDIT MODAL : ADD RPOJECT ############# */

/* First, switch to the add project form */
const switchToAdd = function displayAddForm(e){
    e.preventDefault();
    homeEditModal.style.display = "none";
    addEditModal.style.display = null;
    arrow = document.createElement("i");
    arrow.setAttribute("class","fa-solid fa-arrow-left-long arrow-back");
    arrow.innerHTML = "<p>Revenir en arrière</p>";
    modalWrapper.insertBefore(arrow, modalContainer);

 /*   //for the categories
    const selectCategory = document.getElementById("new-project-category");
    console.log(selectCategory);
    let optionValue = 1;
    categoriesArray.forEach(function createOption(category){
        const categoryOption = document.createElement("option");
        categoryOption.setAttribute("value", optionValue);
        categoryOption.innerText = category;
        console.log(category)
        selectCategory.appendChild(categoryOption);
        console.log (categoryOption);
        optionValue += 1;
    });
    // Problem : categories not in the right order, need to fetch get the categories ? */

    /* Arrow : back to home edit modal */
    const backToHomeModal = function(e){
        e.preventDefault();
        homeEditModal.style.display = null;   
        addEditModal.style.display = "none";
        arrow.remove();
    };
    arrow.addEventListener("click", backToHomeModal);

    // cLear the project inputs
    newProjectImage = null;
    newProjectTitle = null;
    newProjectCategory = null;
};
// Add the event listener on the add button link 
document.getElementById("add-modal-link").addEventListener("click", switchToAdd);

// Get inputs values
const newProjectFileInput = document.getElementById("file-input");
let newProjectImage = null;
let newProjectTitle = document.getElementById("new-project-title").value;
let newProjectCategory = document.getElementById("new-project-category").value;
const beforeAddingImage = document.getElementById("before-adding-pic");
const imagePreviewDiv = document.getElementById("preview");


// Disable or enable the submmit button
const submitNewProject = document.getElementById("submit-new-project");
//if (newProjectImage == null && newProjectTitle == null && )

// Img preview + size
const showImagePreview = function (e){
    e.preventDefault();
    newProjectImage = newProjectFileInput.files[0];
    console.log(newProjectImage);

    //For size
    const maxImageSize = 4000 * 1024;
    const incorrectImageSize = document.getElementById("incorrect-image-size");
    if (newProjectImage.size > maxImageSize){
        imagePreviewDiv.style.display = "none";
        incorrectImageSize.style.display = null;
        incorrectImageSize.innerText = "La taille de l'image dépasse 4Mo.";
    } else {
        incorrectImageSize.style.display = "none";
        beforeAddingImage.style.display = "none";
        imagePreviewDiv.style.display = null; 
        const imageURL = URL.createObjectURL(newProjectImage);
        const imagePreview = document.createElement("img");
        imagePreview.setAttribute("id", "image-preview");
        imagePreview.setAttribute("src", imageURL);
        imagePreviewDiv.appendChild(imagePreview);

    };
}
newProjectFileInput.addEventListener("change", showImagePreview);

/*const reader = new FileReader()
reader.onload = async (event) => {
    document.getElementById("preview").setAttribute('src', event.target.result);
    beforeAddingImage.style.visibility = "hidden";
}
reader.readAsDataURL(newProjectImage)*/
// DO NOT WORK, THE UPLOADING INPUT STAYS THE SAME 



/* RESTE :


Il faut voir comment faire pour que le bouton valider soit vert une fois tous les champs remplis (if value != null ?)
Il faut s'occuper de l'erreur JSON parse de la promesse pour la suppresion d'un élément (même si ce dernier est bien supprimé)
Question: pourquoi l'id augmente et n'est pas remplacé ? Avec delete, l'emplacement n'est pas vidé... Comment régler ce problème ?
Il faut pouvoir supprimer la galerie entière de la même façon qu'un seul élément en cliquant sur "Supprimer la galerie" -> if avec l'id du bouton ? (en reprenant la fonction qui fetch delete)
Il faut pouvoir voir l'image dès son ajout au niveau du container.
Après ajout ou suppression d'un projet, la gallery (celle crée dans le script consacré) doit pouvoir se rafraichir automatiquement
Il y a une revision de code à effectuer pour rendre celui-ci plus clair, faciliter sa lecture et créer des points d'arrêt dans la page afin de mieux visualiser les différentes parties. 
Si on ouvre à nouveau la modal, on doit tomber sur la gallery!*/