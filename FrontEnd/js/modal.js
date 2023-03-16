/* ############################################### MODALS ############################################### */

// Variables - Global range

// modal blocks & elements
const modalContainer = document.getElementById("modal-container");
const modalWrapper = document.querySelector(".modal-wrapper");
const homeEditModal = document.querySelector("#home-edit-modal");
const addEditModal = document.querySelector("#add-modal");
const arrow = document.querySelector(".arrow-back");
let modal = null;
const deleteGallery = document.getElementById("delete-modal-link");
const topIcons = document.getElementById("top-icons");

// "add" form elements
    //Form
    const addForm = document.getElementById("new-project-form");
    //Inputs
    const newProjectFileInput = document.getElementById("file-input");
    const newProjectTitle = document.getElementById("new-project-title");
    newProjectTitle.value = "";
    const newProjectCategory = document.getElementById("new-project-category");
    const categoryZero = newProjectCategory.options[0].value;
    newProjectCategory.value = categoryZero ;
    //File Input
    const beforeAddingImage = document.getElementById("before-adding-pic");
    const imagePreviewDiv = document.getElementById("preview");
    const incorrectImageSize = document.getElementById("incorrect-image-size"); // Warning p for img size
    const maxImageSize = 4000 * 1024;
    // Get add form inputs values
    var newTitleValue = "";
    var newCategoryValue = "";
    var newProjectImage = "";
    // Submmit button
    const submitNewProject = document.getElementById("submit-new-project");
    const missingFields = document.getElementById("incorrect-form-fields");
    missingFields.innerHTML ="";
    // new FormData for inputs values (before posting)
    const newProjectData = new FormData;
    
/* -------------------------------------------------------------------------------------------------------*/
/* --------------------------------------- EDIT MODAL : HOME -------------------------------------------- */
/* ------------------------------------------ OPEN & CLOSE ---------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------*/

//Open Modal function
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
};

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
    arrow.style.display="none";
    topIcons.style.justifyContent = "end"; 

    beforeAddingImage.style.display = null;
    imagePreviewDiv.style.display = "none";

    // cLear the form + grey button
    addForm.reset();
    submitNewProject.style.backgroundColor = "#A7A7A7";
    // clear Formdata
    newProjectData.delete("image");
    newProjectData.delete("category");
    newProjectData.delete("title");

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
});

/* -------------------------------------------------------------------------------------------------------*/
/* --------------------------------------- EDIT MODAL : HOME -------------------------------------------- */
/* ---------------------------------------- LOAD THE GALLERY -------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------*/

// function for creating cards and adding them to the card container
function createModalCards(data){
        const cardsContainer = document.getElementById("cards-container");
        const card = document.createElement("figure");
        card.setAttribute("class", "project-card");
        const projectImgUrl = data.imageUrl;
        const projectImg = document.createElement("img");
        projectImg.setAttribute("src", projectImgUrl);
        projectImg.setAttribute("alt", data.title);
        projectImg.setAttribute("class","project-img")
        card.appendChild(projectImg);
        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("class", "fa-solid fa-trash-can delete-icon");
        trashIcon.setAttribute("id", data.id);
        trashIcon.addEventListener("click", deleteProject)
        card.appendChild(trashIcon);
        const imgCaption = document.createElement("figcaption");
        imgCaption.setAttribute("class","figcaption");
        imgCaption.innerText = "éditer";
        card.appendChild(imgCaption);
        cardsContainer.appendChild(card);
}

// Retrieve projects data
async function fetchData () {
    const fetchProjects = await fetch ("http://localhost:5678/api/works");
    const projects = await fetchProjects.json();

    if (fetchProjects.ok) {
        return projects;
    } else {
        console.log ("error");
    };
};
fetchData().then(function(projects) {
    for (let i = 0; i<projects.length; i++){
        const projectInfo = projects[i];
        createModalCards(projectInfo);        
    };
});

/* -------------------------------------------------------------------------------------------------------*/
/* --------------------------------------- EDIT MODAL : HOME -------------------------------------------- */
/* ---------------------------------------- DELETE PROJECT(S) ------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------*/

const deleteProject = function (e) {
    e.preventDefault();

    if (e.target == deleteGallery){
        const confirmDial1 = confirm("Êtes vous certain de vouloir supprimer tous les projets ?")
        if (confirmDial1) { alert("Le chemin d'accès doit être spécifié!") };
    } else if (e.target != deleteGallery) {
        const confirmDial2 = confirm("Êtes vous certain de vouloir supprimer ce projet ?");
        if(confirmDial2) {
            async function fetchDelete(){
                const projectId = e.target.id;
                const deleteUrl = "http://localhost:5678/api/works/" + projectId;
                const deleteRequest = await fetch (deleteUrl, {
                    method : "DELETE",
                    headers : { 
                        "accept":"*/*",
                        "Authorization":"Bearer " + token,
                    }
                }); 
                
                if (deleteRequest.status >= 200 && deleteRequest.status < 205){
                    // alert the user that the target(s) has/have been deleted
                    if (e.target == deleteGallery) {
                        alert("La galerie a été supprimée.")
                    } else if (e.target != deleteGallery) {
                        alert("Le projet a bien été supprimé.");
                    }                    
                        // Then, delete the project from the modal gallery
                        const parentNode = document.getElementById("cards-container");
                        parentNode.removeChild(e.target.parentElement);
                        // And from the index gallery
                        const modalFigure = e.target.parentElement;
                        const modalFigureImgAlt = modalFigure.firstElementChild.getAttribute("alt");
                        const cardToRemove = document.getElementById(modalFigureImgAlt)
                        gallery.removeChild(cardToRemove);                        
                } else if (deleteRequest.status == 401) {
                    alert ("Vous n'êtes pas autorisé à effectuer cette action.");
                } else if (deleteRequest.status == 500) {
                    alert("Un comportement innatendu est survenu.");
                }  
            }
            fetchDelete();

        };
    };
};
// Delete the entire gallery : Event listener on txt
deleteGallery.addEventListener("click", deleteProject);

/* -------------------------------------------------------------------------------------------------------*/
/* --------------------------------------- EDIT MODAL : ADD --------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------*/

/* Switch to the add project form */
const switchToAdd = function displayAddForm(e){
    e.preventDefault();
    homeEditModal.style.display = "none";
    addEditModal.style.display = null;
    topIcons.style.justifyContent = "space-between";
    arrow.style.display= null;
    incorrectImageSize.innerHTML = "";


    /* Arrow : back to home edit modal */
    const backToHomeModal = function(e){
        e.preventDefault();
        // change the modal
        homeEditModal.style.display = null;   
        addEditModal.style.display = "none";
        // replace/hide the top icons
        arrow.style.display="none";
        topIcons.style.justifyContent = "end"; 

        // clear image upload bloc
        beforeAddingImage.style.display = null;
        imagePreviewDiv.style.display = "none";
        // cLear the form + grey button
        addForm.reset();
        submitNewProject.style.backgroundColor = "#A7A7A7";
        // clear Formdata
        newProjectData.delete("image");
        newProjectData.delete("category");
        newProjectData.delete("title");

    };
    arrow.addEventListener("click", backToHomeModal);
};
// Add the event listener on the add section button link 
document.getElementById("add-modal-link").addEventListener("click", switchToAdd);

/* -------------------------------------------------------------------------------------------------------*/
/* --------------------------------------- EDIT MODAL : ADD --------------------------------------------- */
/* ----------------------------------------- ADD A PICTURE ---------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------*/

// Img preview + size
const showImagePreview = function (e){
    e.preventDefault();
    newProjectImage = newProjectFileInput.files[0];

    //For size
    if (newProjectImage.size > maxImageSize){
        imagePreviewDiv.style.display = "none";
        incorrectImageSize.innerText = "La taille de l'image dépasse 4Mo.";
    } else {
        incorrectImageSize.innerText = "";
        beforeAddingImage.style.display = "none";
        imagePreviewDiv.style.display = null;
        imagePreviewDiv.innerHTML= "";
        const imageUrl = URL.createObjectURL(newProjectImage);
        const imagePreview = document.createElement("img");
        imagePreview.setAttribute("id", "image-preview");
        imagePreview.setAttribute("src", imageUrl);
        imagePreviewDiv.appendChild(imagePreview);

    };
}
newProjectFileInput.addEventListener("change", showImagePreview);

/* -------------------------------------------------------------------------------------------------------*/
/* --------------------------------------- EDIT MODAL : ADD --------------------------------------------- */
/* ------------------------------------------ FORM INPUTS ----------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------*/

// Listen changes in inputs : if all ok, change color button and add info to formData
const changeInputsActions = function(e){
    e.preventDefault();
    newCategoryValue = newProjectCategory.value;
    newTitleValue = newProjectTitle.value;
    if ( newProjectFileInput.value !== "" && newProjectFileInput.files[0].size <= maxImageSize 
        && newTitleValue !== "" && newCategoryValue !== categoryZero ) {
        // Manage alert p and submit button color
        missingFields.innerHTML ="";
        submitNewProject.style.backgroundColor = "#1D6154";
        // Fill the FormData
        newProjectData.append("image", newProjectFileInput.files[0]);
        newProjectData.append("title", newTitleValue);
        newProjectData.append("category", newCategoryValue);
    } else if ( newProjectFileInput.value == "" || newTitleValue == "" || 
                newCategoryValue == categoryZero ){
        submitNewProject.style.backgroundColor = "#A7A7A7"
    };    
};
// Add the change event listeners on inputs
newProjectTitle.addEventListener("change", changeInputsActions);
newProjectCategory.addEventListener("change", changeInputsActions);
newProjectFileInput.addEventListener("change", changeInputsActions);


// Create index.html card - same as in the gallery_and_filters.js
function createIndexCards(data){            
    const projectFigure = document.createElement("figure"); 
    projectFigure.setAttribute("id", data.title);
    gallery.appendChild(projectFigure);
    const projectImg = document.createElement("img"); 
    projectImg.src = data.imageUrl;
    projectFigure.appendChild(projectImg); 
    const projectCaption = document.createElement("figcaption");
    projectCaption.innerText = data.title;
    projectFigure.appendChild(projectCaption);
};

/* -------------------------------------------------------------------------------------------------------*/
/* --------------------------------------- EDIT MODAL : ADD --------------------------------------------- */
/* ------------------------------------- SUBMIT A NEW PROJECT ------------------------------------------- */
/* -------------------------------------------------------------------------------------------------------*/

const clickAndSubmit = function(e){
    e.preventDefault();
    e.stopPropagation();
    if ( newProjectFileInput.value == "" || newTitleValue == "" || newCategoryValue == categoryZero ) {
        missingFields.innerText = "Veuillez remplir tous les champs du fomulaire.";
        return;
    } else {
        async function fetchAdd(){
            const addRequest = await fetch ("http://localhost:5678/api/works", {
                method : "POST",
                headers : { Authorization : "Bearer " + token },
                body : newProjectData
            }); 
            const addResponse = await addRequest.json();

            if (addRequest.status == 201){
                alert("Le projet a bien été ajouté.");
                //reset FormData
                newProjectData.delete("image");
                newProjectData.delete("category");
                newProjectData.delete("title");
                //reset html form
                    // clear image upload bloc
                    beforeAddingImage.style.display = null;
                    imagePreviewDiv.style.display = "none";
                    // cLear the form + grey button
                    addForm.reset();
                    submitNewProject.style.backgroundColor = "#A7A7A7";
                // Create a new element for the modal gallery
                createModalCards(addResponse);
                // Create a new element for the index gallery
                createIndexCards(addResponse);
            } else if (addRequest.status == 400) {
                alert ("La requête n'a pas pu aboutir. Vérifier votre code.");
            } else if (addRequest.status == 401) {
                alert ("Vous n'êtes pas autorisé à effectuer cette action.");
            } else if (addRequest.status == 500) {
                alert("Un comportement innatendu est survenu au niveau du serveur.");
            }  
        }
        fetchAdd();
    };
};

submitNewProject.addEventListener("click", clickAndSubmit);

/* ---------------------------------------- END OF MODALS SCRIPT ---------------------------------------- */