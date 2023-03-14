/* -------- LOGIN SECTION -------- */


const loginClick = function clickOnLogin(event) {
    event.preventDefault();
// 1 -HTML  (+CSS) STRUCTURE
    var main = document.querySelector("main");
    main.innerHTML = "";

    // login section 
    const loginSection = document.createElement("section");
    loginSection.setAttribute("id", "login-section");
    main.appendChild(loginSection);

    // title
    const loginTitle = document.createElement("h2");
    loginTitle.innerText = "Log In";
    loginTitle.setAttribute("id", "loginTitle");
    loginSection.appendChild(loginTitle);

    // Form
    const form = document.createElement("form");
    form.setAttribute("id","login-form");
    form.setAttribute("method","post");
    loginSection.appendChild(form);
        //email
        const mailLabel = document.createElement("label");
        mailLabel.setAttribute("for","email");
        mailLabel.innerText = "E-mail";
        form.appendChild(mailLabel);
        const mailInput = document.createElement("input");
        mailInput.setAttribute("type","email");
        mailInput.setAttribute("id","email");
        mailInput.setAttribute("required","");
        form.appendChild(mailInput);
        //password
        const passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("for","password");
        passwordLabel.innerText = "Mot de passe";
        form.appendChild(passwordLabel);
        const passwordInput = document.createElement("input");
        passwordInput.setAttribute("type","password");
        passwordInput.setAttribute("id","password");
        passwordInput.setAttribute("required","");
        form.appendChild(passwordInput);
        //submit
        var submit = document.createElement("input");
        submit.setAttribute("type","submit");
        submit.setAttribute("id","submit-button");
        submit.setAttribute("value","Se connecter");
        submit.addEventListener("click", submitLogin);
        form.appendChild(submit);
        //password forgotten
        const forgotPassword =  document.createElement("a");
        forgotPassword.setAttribute("href","#forgot-password");
        forgotPassword.setAttribute("class","forgot-password");
        forgotPassword.innerText = "Mot de passe oublié";
        form.appendChild(forgotPassword);
    };

// 2- EVENT LISTENER, click on nav 'login'
const navLogin = document.querySelector("#login");
navLogin.addEventListener("click", loginClick);

// 3- POST THE ID/PSWD, ALERT IF SUCCESS OR NOT

// submit id + pwd function
async function submitLogin(event) {
        event.preventDefault();
        // body elemnts
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        //alert(email);
        //alert(password);
        // define fetch post config object
        const postMethod = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
        // Fetch post
        const postInputs = await fetch("http://localhost:5678/api/users/login", postMethod);
        const fetchPostData = await postInputs.json();
        //alert(postInputs.status);
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
    };        
     
    
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
    localStorage.clear();
    window.location.replace("");
});



