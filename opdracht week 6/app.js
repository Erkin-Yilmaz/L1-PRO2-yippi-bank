const users = [
    { username: "AdminUser", password: "Admin123", dashboard: "admin_dashboard.html" },
    { username: "User1", password: "User123", dashboard: "user1_dashboard.html" },
    { username: "User2", password: "User123", dashboard: "user2_dashboard.html" },
    { username: "User3", password: "User123", dashboard: "user3_dashboard.html" }
];

function Login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('Wachtwoord0').value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert("Yippie🎊");
        sessionStorage.setItem('loggedInUser', JSON.stringify(user)); 
        window.location.href = user.dashboard; 
    } else {
        alert("Onjuiste gebruikersnaam of wachtwoord. Probeer opnieuw.");
    }
}


function checkLoginStatus() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("U moet inloggen om toegang te krijgen tot deze pagina.");
        window.location.href = "login.html";
    } else {
        const user = JSON.parse(loggedInUser);
        document.getElementById('welcomeMessage').textContent = `Welkom, ${user.username}!`;
    }
}


function showCurrentDate() {
    const date = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('nl-NL', options);
    document.getElementById('dateDisplay').textContent = formattedDate;
}


window.onload = function () {
    if (document.getElementById('dateDisplay')) {
        showCurrentDate();
    }

 
    if (document.body.classList.contains('dashboard-page')) {
        checkLoginStatus();
    }
};

 
        function logout() {
            sessionStorage.clear(); 
            alert("U bent uitgelogd.");
            window.location.href = "login.html";}


document.addEventListener("DOMContentLoaded", () => {
    const newAccountButton = document.querySelector(".new-account-btn");
    const accountList = document.querySelector(".account-list");

    newAccountButton.addEventListener("click", () => {
        const accountName = prompt("Voer de naam van de nieuwe rekening in:");
        const accountBalance = prompt("Voer het startsaldo in:");

        if (accountName && accountBalance) {
            const newAccountItem = document.createElement("div");
            newAccountItem.classList.add("account-item");

            const accountNameElement = document.createElement("span");
            accountNameElement.classList.add("account-name");
            accountNameElement.textContent = accountName;

            const accountBalanceElement = document.createElement("span");
            accountBalanceElement.classList.add("account-balance");
            accountBalanceElement.textContent = `€${parseFloat(accountBalance).toFixed(2)}`;

            newAccountItem.appendChild(accountNameElement);
            newAccountItem.appendChild(accountBalanceElement);
            accountList.appendChild(newAccountItem);

            alert("Nieuwe rekening succesvol toegevoegd!");
        } else {
            alert("Rekeninggegevens zijn niet volledig ingevuld.");
        }
    });
});

function BeherenAdmin(){
    window.location.href = "BeherAdmin.html";
}
function BeherenUser1(){
    window.location.href = "BeherenUser1.html";
}
function BeherenUser2(){
    window.location.href = "BeherenUser2.html";
}
function BeherenUser3(){
    window.location.href = "BeherenUser3.html";
}

function overschrijven(){
window.location.href = "overschrijvingAdmin.html"; 
}

function geschiedenis(){
    window.location.href = "transactiegeschiedenis.html"; 
}

function AandelenBeheren(){
    window.location.href = "beleggen.html"
}