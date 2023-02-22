let login = document.querySelector(".login");
let create = document.querySelector(".create");
let container = document.querySelector(".container");

const loginForm = document.querySelector(".signin");
const usernameInput = loginForm.querySelector('input[type="text"]');
const passwordInput = loginForm.querySelector('input[type="password"]');
const submitButton = loginForm.querySelector('input[type="submit"]');

submitButton.addEventListener("click", event => {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    fetch("http://localhost:8080/api/users/login/", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            const token = data.token; //assuming the response is returning a token

            //store the token in local storage or session storage
            localStorage.setItem("token", token);

            //redirect the user to the dashboard or home page
            console.log(data);
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Invalid username or password. Please try again.");
        });
});

login.onclick = function () {
    container.classList.add("signinForm");
};

create.onclick = function () {
    container.classList.remove("signinForm");
};
