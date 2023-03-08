/* -------- LOGIN SECTION -------- */

const loginSection = document.querySelector("#login-section");
const mainTag = document.querySelector("main");

const loginClick = function clickOnLogin(event) {
    event.preventDefault();
    loginSection.style.display = null;
    mainTag.style.display = "none";
};
const loginNav= document.querySelector("#login");
loginNav.addEventListener("click", loginClick)

// add the submit event listener on the login button
const loginButton = document.querySelector("#submit-button");
loginButton.addEventListener("submit", submitLogin);

/* -------------------- POST THE ID/PSWD, ALERT IF SUCCESS OR NOT -------------------- */

// submit id + pwd function
const submitLogin = async function submitLogin(e) {
        
        // body elements
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        // define fetch post config object
        const postMethod = {
            method: 'post',
            headers: { "Content-Type": "application/json",
                        "Accept" : "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };
        // Fetch post
        const postInputs = await fetch("http://localhost:5678/api/users/login", postMethod);
        const fetchPostData = await postInputs.json();
        console.log(fetchPostData);
        console.log(postInputs);
        if (postInputs.status == 200){
            alert("Bienvenue sur le site!");
            window.localStorage.setItem("token", fetchPostData.token);
            window.location.replace("");
        } else if (postInputs.status == 401) {
                alert ("Mot de passe invalide");
        } else if (postInputs.status == 404) {
                alert("Mot de passe et/ou identifiant invalide(s)")
        }   
        e.preventDefault();
    };        
     

   

/*
document
  .getElementById("submit-button")
  .addEventListener("click", function(e) {
    let user = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
      };
    console.log(JSON.stringify(user));
    fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then(function(res) {
          if (res.ok) {
            return res.json();
          }
          else if (res.status == 401) {
            alert ("Mot de passe invalide");
        } else if (res.status == 404) {
            alert("Mot de passe et/ou identifiant invalide(s)");
        }
        })
        .then(function(value) {
          localStorage.setItem("token", value.token);
          document.location.href="index.html";
          alert("Bienvenue sur le site!");
        })
        .catch(function(err) {
          alert("wrong");
        });
});
*/


/* ------------------------- CHANGES IN HOME PAGE IF USER IS CONNECTED ------------------------- */
const token = window.localStorage.getItem("token");
if (token){ //visual changes

    /* edition bar */
    const adminBar = document.querySelector("#admin-bar");
    adminBar.style.display = null;

    /* Header margin */
    const header = document.querySelector("header");
    header.style.marginTop = "100px";
    
    /* hide filters section */
    const filters = document.querySelector(".filters");
    filters.style.display = "none";

    /*"login" to "logout"*/
    const login = document.querySelector("#login");
    login.style.display = "none";
    const logout = document.querySelector("#logout");
    logout.style.display = null;

    /* Architecte picture - add the caption - "change" */
    const editArchiPic = document.querySelector("#edit-archi-pic");
    editArchiPic.style.display = null;

    /* Project - add "change" */
    const editProjects = document.querySelector(".js-modal");
    editProjects.style.display = null;
} ;
/* logout */
document.querySelector("#logout").addEventListener("click", function(){
    localStorage.removeItem("token");
    window.location.replace("");
});
