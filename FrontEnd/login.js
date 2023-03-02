/* -------- LOGIN SECTION -------- */


const loginClick = function clickOnLogin(event) {
    event.preventDefault();
// 1 -HTML  (+CSS) STRUCTURE
    const main = document.querySelector("main");
    main.innerHTML = "";

    // login section 
    const loginSection = document.createElement("section");
    loginSection.classList.add("login");
    main.appendChild(loginSection);

    // title
    const loginTitle = document.createElement("h2");
    loginTitle.innerText = "Log In";
    loginTitle.classList.add("loginTitle");
    loginSection.appendChild(loginTitle);

    // Form
    const form = document.createElement("form");
    form.setAttribute("id","login-form");
    form.setAttribute("method","post");
    form.setAttribute("onsubmit", "formSubmitListener");
    loginSection.appendChild(form);
        //email
        const mailLabel = document.createElement("label");
        mailLabel.setAttribute("for","email");
        mailLabel.innerHTML = "E-mail";
        form.appendChild(mailLabel);
        const mailInput = document.createElement("input");
        mailInput.setAttribute("type","email");
        mailInput.setAttribute("id","email");
        mailInput.setAttribute("required","");
        form.appendChild(mailInput);
        //password
        const passwordLabel = document.createElement("label");
        passwordLabel.setAttribute("for","password");
        passwordLabel.innerHTML = "Mot de passe";
        form.appendChild(passwordLabel);
        const passwordInput = document.createElement("input");
        passwordInput.setAttribute("type","password");
        passwordInput.setAttribute("id","password");
        passwordInput.setAttribute("required","");
        form.appendChild(passwordInput);
        //submit
        const submit = document.createElement("input");
        submit.setAttribute("type","submit");
        submit.setAttribute("id","submit-button");
        submit.setAttribute("value","Se connecter");
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
var formSubmitListener = function addFormListener() {
    const loginForm = document.querySelector("#login-form");
    loginForm.addEventListener("submit", function submitLogin(event) {
        event.preventDefault();
        // body object
        const submittedData = {
            email: event.target.querySelector("#email").value,
            password: event.target.querySelector("#password").value
        }
        // convert to JSON for body
        const dataJSON = JSON.stringify(submittedData);
        // define fetch post config object
        const postMethod = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: dataJSON
        }
        // Fetch post
        async function postIdPwd() {
            const postInputs = await fetch("http://localhost:5678/api/users/login", postMethod);
            const fetchPostData = await postInputs.JSON();
        }
        postIdPwd()
            .then(postInputs => {
                if (postInputs.ok) {
                    alert("Bienvenue sur le site");
                    const refresh = window.location.replace("http://127.0.0.1:5500/FrontEnd//");
                    setTimeout(refresh, 1000);
                }  else {
                    switch(postInputs.statut){
                        case "404":
                            alert("email invalide");
                        break;
                        case "401":
                            alert("mot de passe invalide");
                        break;
                        default:
                            alert("mot de passe et/ou email invalide(s)");   
                    };
                };
            });
        
    });
};

