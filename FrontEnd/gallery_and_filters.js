const gallery = document.querySelector('.gallery');
/* ------------------------------------------------------------------------- */


/* ------ Categories filter ------ */

/* creating the filters div */
const filtersDiv = document.createElement("div");
filtersDiv.classList.add("filters"); // add the "filter" class name
document.querySelector('#portfolio').insertBefore(filtersDiv,gallery); // Inserting the filter section before the gallery²
/* Adding the buttton 'Tous' - never change*/
const allCategories = document.createElement("button");
allCategories.classList.add("filter");
allCategories.setAttribute("id", "all");
allCategories.innerText = "Tous";
filtersDiv.appendChild(allCategories);






/* -------- 1 a. - RETRIEVING WORKS W/ FETCH + INSERTING INTO DOM -------- */




async function fetchData () {
    const fetchProjects = await fetch ("http://localhost:5678/api/works");
    var projects = await fetchProjects.json();
    console.log(projects);
    if (fetchProjects.ok) {
        return projects;
    } else {
        console.log ("error");
    };


};
fetchData()
.then( projects => {
    gallery.innerHTML = " ";
    // function for in order to loop in the json array
    for (let i=0; i<projects.length; i++) { // For each project in the data array
        const projectInfo = projects[i]; // using the i element (object) of the array
        /* figure element */
        const projectFigure = document.createElement("figure"); // the figure tag
        const figureClass = "project-" + projectInfo.id; // class name = project-idnumber for figure tag
        const figureId = projectFigure.setAttribute("id", figureClass); //adding id
        projectFigure.setAttribute("class", projectInfo.category.name)//Add class=category name for the filters
        gallery.appendChild(projectFigure); // adding figure tag to the gallery div
        /* img element */
        const projectImg = document.createElement("img"); // creating the img tag
        projectImg.src = projectInfo.imageUrl; // adding the url to the src attribute for each img tag
        projectFigure.appendChild(projectImg); // append img tag inside the figure tag
        /* figcaption element */
        const projectCaption = document.createElement("figcaption"); // creating the fig caption
        projectCaption.innerText = projectInfo.title; // adding text = title of the i object, into the figcaption tag
        projectFigure.appendChild(projectCaption); // append figcaption inside figure tag
    }
});

/* Filter function */
async function forCategories() {
    //Retrieve categories
    const fetchCategories = await fetch ("http://localhost:5678/api/categories");
    const categories = await fetchCategories.json();
    console.log(categories);
    if (fetchCategories.ok) {
        return categories;
    } else {
        console.log ("error");
    };
    };
    forCategories().then(categories =>{
        for(let i = 0; i <categories.length; i++){ 
            const categoryButton = document.createElement("button");
            categoryButton.classList.add("filter");
            const categoryId = categories[i].name;
            categoryButton.setAttribute("id", categoryId)
            categoryButton.innerText = categories[i].name;
            filtersDiv.appendChild(categoryButton);
            //categoryButton.addEventListener("click", filterOnClick());
        };
    });
/*.then(projects => filterOnClick(projects));
function filterOnClick()
    {
    const projectsFiltered = projects.filter( function (){
            return categoryId == figureID ;
            });   
        };          





//function filterByCategory ()




/* add click event on buttons*/
