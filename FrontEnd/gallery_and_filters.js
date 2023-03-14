/* Selecting the gallery + Initializing arrays where the datas will be stored */
const gallery = document.querySelector('.gallery');
let categoriesArray = new Set();
let allProjects = [];

/* ------ CREATING ELEMENTS THAT DON'T NEED DATA ------ */

/* Creating the filters div */
const filtersDiv = document.createElement("div");
filtersDiv.classList.add("filters"); // add the "filter" class name
document.querySelector('#portfolio').insertBefore(filtersDiv,gallery); // Inserting the filter section before the gallery²

/* Adding the buttton 'Tous' - never change*/
const allCategoriesButton = document.createElement("button");
allCategoriesButton.classList.add("filter");
allCategoriesButton.setAttribute("id", "all");
allCategoriesButton.setAttribute("class","filter");
allCategoriesButton.innerText = "Tous";
filtersDiv.appendChild(allCategoriesButton);

/* -------- RETRIEVING WORKS W/ FETCH : INSERTED INTO THE GALLERY --------
-------- / SELECTED BY CATEGORY-LINKED TO BUTTON CATEGORY -------- */

// fetch the data / HTTP get request
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

fetchData()
.then( projects => { // use the .json response to store the collected datas

    gallery.innerHTML = "";

    /* Loop to get the datas (projects infos + categories) into arrays */
    for (let i=0; i<projects.length; i++) {
        const projectInfo = projects[i]; 
        categoriesArray.add(projectInfo.category.name);       
        allProjects.push(projectInfo);
    };
    //console.log(allProjects); -- check if the datas are retrieved
    //console.log(categoriesArray); -- same

    /* Creating the filters buttons */
    categoriesArray.forEach(function createButton(category){
        const categoryButton = document.createElement("button");
        categoryButton.classList.add("filter");
        const categoryName = category;
        categoryButton.setAttribute("id", categoryName)
        categoryButton.innerText = categoryName;
        categoryButton.setAttribute("class","filter");
        filtersDiv.appendChild(categoryButton);
    });
    
    /* function to create the projects cards */
    function displayProjects(array){
        for (let i=0; i<array.length; i++){
            const projectData = array[i]; // using the i element (object) of the array
            console.log(projectData)
            /* figure element */
            const projectFigure = document.createElement("figure"); // the figure tag
            projectFigure.setAttribute("id", projectData.title)
            //const projectClassTxt = "project" + " " + projectData.category.name;
            gallery.appendChild(projectFigure); // adding figure tag to the gallery div
            /* img element */
            const projectImg = document.createElement("img"); // creating the img tag
            projectImg.src = projectData.imageUrl; // adding the url to the src attribute for each img tag
            projectFigure.appendChild(projectImg); // append img tag inside the figure tag
            /* figcaption element */
            const projectCaption = document.createElement("figcaption"); // creating the fig caption
            projectCaption.innerText = projectData.title; // adding text = title of the i object, into the figcaption tag
            projectFigure.appendChild(projectCaption); // append figcaption inside figure tag*/
        };
    };
    
    displayProjects(projects); // To display all the projects when the page load

    let buttonId = null;  
    /* Onclick fonction that allows to display projects corresponding to the selected category */
    const filterOnClick = function(e) {
        e.preventDefault();
        buttonId = e.target.getAttribute("id");
        console.log(buttonId);
        gallery.innerHTML="";
        if (buttonId == "all"){ // For the "Tous" button, display all the projects
            displayProjects(projects);
        } else { // For the others button, the projects displayed match the buttons categories
                const filteredProjects = projects.filter(function(project){
                    return project.category.name == buttonId;
                });
                console.log(filteredProjects);
                displayProjects(filteredProjects);
        };
    };
    /* Add the event listener on the categories buttons */
    document.querySelectorAll(".filter").forEach(button => button.addEventListener("click",filterOnClick));    
    
});
/* --------------------------------- END OF THE GALLERY AND FILTERS SCRIPT --------------------------------- */