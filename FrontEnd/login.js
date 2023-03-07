/* -------- LOGIN SECTION -------- */



/* -------------------- POST THE ID/PSWD, ALERT IF SUCCESS OR NOT -------------------- */

// submit id + pwd function
async function submitLogin(e) {
        
        // body elemnets
        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        // define fetch post config object
        const postMethod = {
            method: "POST",
            headers: { "Content-Type": "application/json",
                        "Accept" : "application/json" },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };
        // Fetch post
        const postInputs = await fetch('http://localhost:5678/api/users/login', postMethod);
        const fetchPostData = await postInputs.json();
        console.log(fetchPostData);
        console.log(postInputs);
        if (postInputs.status == 200){
            alert("Bienvenue sur le site!");
            window.localStorage.setItem("token", fetchPostData.token);
            window.location.replace("./index.html");
        } else if (postInputs.status == 401) {
                alert ("Mot de passe invalide");
        } else if (postInputs.status == 404) {
                alert("Mot de passe et/ou identifiant invalide(s)")
        }   
        e.preventDefault();
    };        
     
// add the submit event listener on the login button
var loginButton = document.querySelector("#submit-button");
loginButton.addEventListener("submit", submitLogin);
   



