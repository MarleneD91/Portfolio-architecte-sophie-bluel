/* -------- 1 a. - RETRIEVING WORKS W/ FETCH + INSERTING INTO DOM -------- */

const gallery = document.querySelector('.gallery') ; // var creation for the .gallery div
gallery.innerHTML = " "; // Deleting static elements

// Getting the projects  + Loop to insert into "".gallery" div
const fetchData = fetch ("http://localhost:5678/api/works") // retrieve works
    .then (response => response.json()) // converting into json 
    .then ( function addProject(projectsArray) { // function for in order to loop in the json array
        for (let i=0; i<projectsArray.length; i++) { // For each project in the data array

            const projectInfo = projectsArray[i]; // using the i element (object) of the array

            /* figure element */
            const projectFigure = document.createElement("figure"); // the figure tag
            const figureClass = "project-" + projectInfo.id; // class name = project-idnumber for figure tag
            projectFigure.classList.add(figureClass); //adding class name
            gallery.appendChild(projectFigure); // adding figure tag to the gallery div

            /* img element */
            const projectImg = document.createElement("img"); // creating the img tag
            projectImg.src = projectInfo.imageUrl; // adding the url to the src attribute for each img tag
            projectFigure.appendChild(projectImg); // append img tag inside the figure tag

            /* igcaption element */
            const projectCaption = document.createElement("figcaption"); // creating the fig caption
            projectCaption.innerText = projectInfo.title; // adding text = title of the i object, into the figcaption tag
            projectFigure.appendChild(projectCaption); // append figcaption inside figure tag
        }
    });

/* -------- 1 b. CREATING WORKS FILTERS -------- */
