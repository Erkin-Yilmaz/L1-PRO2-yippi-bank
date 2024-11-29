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