/* -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x- MODALS -x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x-x- */

// Variables - Global range

// modal blocks & elements
const modalContainer = document.getElementById("modal-container");
const modalWrapper = document.querySelector(".modal-wrapper");
const homeEditModal = document.querySelector("#home-edit-modal");
const addEditModal = document.querySelector("#add-modal");
let arrow = "";
let modal = null;
const deleteGallery = document.getElementById("delete-modal-link");

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
    // new FormData for inputs values (before posting)
    const newProjectData = new FormData;

// ############################################################################################################
/* ########################################### EDIT MODAL : HOME ########################################### */
// ############################################################################################################

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
    arrow.remove(); 

    beforeAddingImage.style.display = null;
    imagePreviewDiv.style.display = "none";

    // cLear the project inputs
    addForm.reset();

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

// #############################################################################################################
/* ##################################### EDIT MODAL : DELETE PROJECT(S) ##################################### */
// #############################################################################################################


//const token = localStorage.getItem("token"); // retrieve token for fetch authorization
console.log(token);
//const authorizationKey = "Bearer " + 
const deleteProject = function (e) {
    e.preventDefault();
    console.log(e.target)
    console.log(e.target.parentElement);
//// Voir avec if e.target = deleteGallery
    if (e.target == deleteGallery){
        console.log(deleteGallery);
        const confirmDial1 = confirm("Êtes vous certain de vouloir supprimer tous les projets ?")
        if (confirmDial1) { alert("Le chemin d'accès doit être spécifié!") };
    } else if (e.target != deleteGallery) {
        const confirmDial2 = confirm("Êtes vous certain de vouloir supprimer ce projet ?");
        if(confirmDial2) {
            async function fetchDelete(){
                console.log(e.target);
                const projectId = e.target.id;
                console.log(projectId);
                const deleteUrl = "http://localhost:5678/api/works/" + projectId;
                console.log(deleteUrl);
                const deleteRequest = await fetch (deleteUrl, {
                    method : "DELETE",
                    headers : { 
                        "accept":"*/*",
                        "Authorization":"Bearer " + token,
                    }
                }); 
                console.log(deleteRequest.status);
                if (deleteRequest.status >= 200 && deleteRequest.status < 205){
                    alert("Le projet a bien été supprimé.");
                        // Then, delete the project from the modal gallery
                        const parentNode = document.getElementById("cards-container");
                        parentNode.removeChild(e.target.parentElement);
                        // And from the index gallery
                        const modalFigure = e.target.parentElement;
                        const modalFigureImgAlt = modalFigure.firstElementChild.getAttribute("alt");
                        const cardToRemove = document.getElementById(modalFigureImgAlt)
                        console.log(cardToRemove);
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
// Delete the entire gallery :
deleteGallery.addEventListener("click", deleteProject);

// ############################################################################################################
/* #######################################  EDIT MODAL : ADD RPOJECT ####################################### */
// ############################################################################################################

/* First, switch to the add project form */
const switchToAdd = function displayAddForm(e){
    e.preventDefault();
    homeEditModal.style.display = "none";
    addEditModal.style.display = null;
    arrow = document.createElement("i");
    arrow.setAttribute("class","fa-solid fa-arrow-left-long arrow-back");
    arrow.innerHTML = "<p>Revenir en arrière</p>";
    modalWrapper.insertBefore(arrow, modalContainer);
    incorrectImageSize.innerHTML = "";


    /* Arrow : back to home edit modal */
    const backToHomeModal = function(e){
        e.preventDefault();
        homeEditModal.style.display = null;   
        addEditModal.style.display = "none";
        arrow.remove();
        beforeAddingImage.style.display = null;
        imagePreviewDiv.style.display = "none";
        // cLear the form
        addForm.reset();

    };
    arrow.addEventListener("click", backToHomeModal);
};
// Add the event listener on the add button link 
document.getElementById("add-modal-link").addEventListener("click", switchToAdd);



// Img preview + size
const showImagePreview = function (e){
    e.preventDefault();
    newProjectImage = newProjectFileInput.files[0];
    console.log(newProjectImage);

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

// Listen changes in inputs : if all ok, change color button and add info to formData
const changeInputsActions = function(e){
    e.preventDefault();
    newCategoryValue = newProjectCategory.value;
    newTitleValue = newProjectTitle.value;
    //console.log(newCategoryValue);
    //console.log(newTitleValue);
    if ( newProjectFileInput.value !== "" && newProjectFileInput.files[0].size <= maxImageSize 
        && newTitleValue !== "" && newCategoryValue !== categoryZero ) {
        console.log(newCategoryValue);
        console.log(newTitleValue);
        submitNewProject.style.backgroundColor = "#1D6154";
        //const fileName = newProjectFileInput.files[0].name;
        //const fileType = newProjectFileInput.files[0].type;
        //const bodyImagePart = "@" + fileName + ";type=" + fileType;
        newProjectData.append("title", newTitleValue);
        newProjectData.append("imageUrl", newProjectFileInput.files[0]);
        //projectData.append("", "\\");
        //projectData.append("", "\\");
        newProjectData.append("categoryId", newCategoryValue);
    } else if ( newProjectFileInput.value == "" || newTitleValue == "" || newCategoryValue == categoryZero ){
        submitNewProject.style.backgroundColor = "#A7A7A7"
    };    
    console.log (newProjectData);
};
newProjectTitle.addEventListener("change", changeInputsActions);
newProjectCategory.addEventListener("change", changeInputsActions);
newProjectFileInput.addEventListener("change", changeInputsActions);
console.log (newProjectData);
/* RESTE :


Il faut s'occuper de l'erreur JSON parse de la promesse pour la suppresion d'un élément (même si ce dernier est bien supprimé)
Question: pourquoi l'id augmente et n'est pas remplacé ? Avec delete, l'emplacement n'est pas vidé... Comment régler ce problème ?
Après ajout ou suppression d'un projet, la gallery (celle crée dans le script consacré) doit pouvoir se rafraichir automatiquement

// Submit new project




        /*async*/
        
const clickAndSubmit = function(e){
            e.preventDefault();
            e.stopPropagation();
            if ( newProjectFileInput.value == "" || newTitleValue == "" || newCategoryValue == categoryZero ) {
                const missingFields = document.getElementById("incorrect-form-fields");
                missingFields.innerText = "Veuillez remplir tous les champs du fomulaire.";
                return;
            } else {
            console.log(newProjectData); 
            console.log(newProjectFileInput.files[0])
           async function fetchAdd(){
               console.log(newProjectData);
                const addRequest = await fetch ("http://localhost:5678/api/works", {
                    method : "POST",
                    headers : { 
                        "accept" :"application/json",
                        "Authorization" : "Bearer " + token,
                        "Content-Type" : "multipart/form-data"
                    },
                    body : newProjectData
                }); 
                const addResponse = await addRequest.json();
                console.log(addResponse.status);
                if (addResponse.status == 200){
                    alert("Le projet a bien été ajouté.");
                } else if (addResponse.status == 400) {
                    alert ("La requête n'a pas pu aboutir. Vérifier votre code.");
                } else if (addResponse.status == 401) {
                    alert ("Vous n'êtes pas autorisé à effectuer cette action.");
                } else if (addResponse.status == 500) {
                    alert("Un comportement innatendu est survenu au niveau du serveur.");
                }  
            }
            fetchAdd();
        };
            };


        
        submitNewProject.addEventListener("click", clickAndSubmit);