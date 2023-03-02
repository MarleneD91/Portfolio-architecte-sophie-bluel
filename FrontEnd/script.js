

    
    /* for each cat., even a nex one, listen and filter 
    filterButton.addEventListener("click", function(){
        const selectedProject = projectsArray.filter( function (projectsArray){
            return projectId == myButton.name;
        }); 
    }); */

    
/* ------------------------------------------------------------------------- */

/* -------- 1 a. - RETRIEVING WORKS W/ FETCH + INSERTING INTO DOM -------- */

const gallery = document.querySelector('.gallery');

async function fetchProjects () {
    const fetchData = await fetch ("http://localhost:5678/api/works");
    const projects = await fetchData.json();
    if (fetchData.ok) {
        return projects;
    } else {
        console.log ("error");
    }
};
fetchProjects()
.then( projects => {
    gallery.innerHTML = " ";
    // function for in order to loop in the json array
    for (let i=0; i<projects.length; i++) { // For each project in the data array
        const projectInfo = projects[i]; // using the i element (object) of the array
        /* figure element */
        const projectFigure = document.createElement("figure"); // the figure tag
        const figureClass = "project-" + projectInfo.id; // class name = project-idnumber for figure tag
        projectFigure.classList.add(figureClass); //adding class name
        gallery.appendChild(projectFigure); // adding figure tag to the gallery div
        /* img element */
        const projectImg = document.createElement("img"); // creating the img tag
        projectImg.src = projectInfo.imageUrl; // adding the url to the src attribute for each img tag
        projectFigure.appendChild(projectImg); // append img tag inside the figure tag
        /* figcaption element */
        const projectCaption = document.createElement("figcaption"); // creating the fig caption
        projectCaption.innerText = projectInfo.title; // adding text = title of the i object, into the figcaption tag
        projectFigure.appendChild(projectCaption); // append figcaption inside figure tag
            /* add the category id in order to filter */
            /*const projectId = projectFigure.id;
            projectFigure.id = projectInfo.category.name;*/ 
    }   
        /*const categories = new Set();
        console.log(projects);
            for (let i =0; i<projects.length; i++) { // adding the buttons for categories - loop 
                const category = projects; 
                console.log(category)
                categories.add(category);
                /*console.log(categories);*/
            /*};
            for (let i = 0; i<categories.length; i++){
                const category = categories[i];
                const myButton = category.name;
                const filterButton = document.createElement("button");
                const buttonClassName = "filter" //+ "" + myButton.name.replaceAll(" ","-");
                filterButton.classList.add(buttonClassName);
                filterButton.innerText = myButton.name;
                filtersDiv.appendChild(filterButton);        
            };
        }*/
});
/*.then( projects => {
    const categories = new Set();
    for (let i =0; i<projects.length; i++) { // adding the buttons for categories - loop 
        const category = projects[i].category; 
        categories.add(category);
    };
    for (let i = 0; i<categories.length; i++){
        const category = categories[i];
        const myButton = category.name;
        const filterButton = document.createElement("button");
        const buttonClassName = "filter" //+ "" + myButton.name.replaceAll(" ","-");
        filterButton.classList.add(buttonClassName);
        filterButton.innerText = myButton.name;
        filtersDiv.appendChild(filterButton);        
    };*/
/*});
/* creating the filters div */
const filtersDiv = document.createElement("div");
filtersDiv.classList.add("filters"); // add the "filter" class name
document.querySelector('#portfolio').insertBefore(filtersDiv,gallery); // Inserting the filter section before the gallery²
/* Adding the buttton 'Tous' - never change*/
const allCategories = document.createElement("button");
allCategories.classList.add("filter");
allCategories.innerText = "Tous";
filtersDiv.appendChild(allCategories);





