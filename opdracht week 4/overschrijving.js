document.addEventListener("DOMContentLoaded", () => {
    // Haal ingelogde gebruiker op
    const loggedInUser = sessionStorage.getItem("loggedInUser");
    const userAccounts = {
        "AdminUser": { betaalrekening: 150000000000.00, spaarrekening: 320000000000000.50 },
        "User1": { betaalrekening: 0.60, spaarrekening: 10.50 },
        "User2": { betaalrekening: 3436.00, spaarrekening: 32000.50 },
        "User3": { betaalrekening: -384.00, spaarrekening: 0.50 },
    };

    if (!loggedInUser) {
        alert("U moet inloggen om toegang te krijgen tot deze pagina.");
        window.location.href = "login.html";
        return;
    }

    const user = JSON.parse(loggedInUser);
    const accounts = userAccounts[user.username];

    if (accounts) {
        document.getElementById("fromAccountBalance").textContent = `€${accounts.betaalrekening.toFixed(2)}`;
        document.getElementById("fromSavingsBalance").textContent = `€${accounts.spaarrekening.toFixed(2)}`;
    } else {
        alert("Rekeninginformatie niet beschikbaar.");
    }

    
    document.getElementById("transferForm").addEventListener("submit", (event) => {
        event.preventDefault();
        const originAccount = document.getElementById("originAccount").value;
        const targetAccount = document.getElementById("targetAccount").value;
        const amount = parseFloat(document.getElementById("amount").value);

        if (originAccount === targetAccount) {
            alert("WAT DOE JE!!!!!!!!!!!!!😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡😡.");
            return;
        }

        if (!targetAccount || isNaN(amount) || amount <= 0.01) {
            alert("Voer een geldig rekeningnummer en bedrag in.");
            return;
        }

        if (amount > accounts[originAccount]) {
            alert("Onvoldoende saldo op de betaalrekening.");
            return;
        }

        
        accounts[originAccount] -= amount;
        accounts[targetAccount] += amount;
        alert(`€${amount.toFixed(2)} succesvol overgeschreven naar ${targetAccount}.`);

        
        document.getElementById("fromAccountBalance").textContent = `€${accounts.betaalrekening.toFixed(2)}`;
        document.getElementById("fromSavingsBalance").textContent = `€${accounts.spaarrekening.toFixed(2)}`;
    });
});

