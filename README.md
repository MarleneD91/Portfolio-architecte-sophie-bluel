# Portfolio-architecte-sophie-bluel

Creating a dynamic version of the site / based on an existant design.

This website is a project intended to be a portfolio for a interior architect, Sophie BLUEL. The static version of th front-end part and a first version of the back-end were already done by coworkers. I was added to the project in order to create the dynamic version of the client's protfolio.
Following the designer model, I used JavaScript script language in order to add : 

  ## 1. The home page gallery and filters 
  The client's projects are diplayed in a gallery. These works are retrieved using the fetch API, from a sqlite database. An option is added in order to filter the categories depending on the category of each project. There is no need to refresh the page.
  
  ## 2. The login
  The client has needs to upload new project or delete some. For this purpose, I added a login section, using fetch API but with a post method. I have chosen to alert the user depending on the connection issues that can occur. Once the user is logged (here it means the architect), some details change upon the page : an admin bar and edit elements are spread all over the page. The token generated is stocked in the local storage and then used to allow the user, in modals, to delete or add projects.
  
  ## 3. Modals
  For this sprint, I had to allow the client to add new projects or delete existant ones. With this aim, I created a modal. In this modal, the first element displayed is a section presenting the gallery. In this modal's gallery, each element can be deleted independtly. Also, I created the possibility to delete the entire gallery. I took the initiative to alert the user and confirm her choice. In fact, as I use the API fetch and delete method, this action is irreversible (unless she add the project(s) once again using the add part of the modal). Then, I created, in the same modal, an add part, in order to allow the client to add new projects. This second part of the modal is displayed when clicking on a bouton. For this second part, I used the fetch API with the method POST. This section is represented by a form to fill out, with picture, title and category. Once a picutre of correct size (below 4Mo) is selected, a miniature appears. Then, the user has to fill the title and category inputs if she wants to complete the adding process.
  
All the elements created with JavaScript needed to match the initial design, so I used html and CSS, but that was not the majority of my work.
