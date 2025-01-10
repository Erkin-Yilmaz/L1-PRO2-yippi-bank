document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the logged-in user from sessionStorage
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    // Predefined user accounts
    const userAccounts = {
        "AdminUser": {
            betaalrekening: 150000000000.00,
            spaarrekening: 320000000000000.50,
            investments: {
                TechCorp: 100000,
                BioHealth: 400,
                AutoFuture: 90
            }
        },
        "User1": {
            betaalrekening: 0.60,
            spaarrekening: 10.50,
            investments: {
                TechCorp: 0,
                BioHealth: 0,
                AutoFuture: 0
            }
        },
        "User2": {
            betaalrekening: 3436.00,
            spaarrekening: 32000.50,
            investments: {
                TechCorp: 2,
                BioHealth: 5,
                AutoFuture: 1
            }
        },
        "User3": {
            betaalrekening: -384.00,
            spaarrekening: 0.50,
            investments: {
                TechCorp: 1,
                BioHealth: 0,
                AutoFuture: 0
            }
        }
    };

    
    if (!loggedInUser) {
        alert("U moet inloggen om toegang te krijgen tot deze pagina.");
        window.location.href = "login.html"; 
        return;
    }

    
    const user = JSON.parse(loggedInUser);
    const accounts = userAccounts[user.username];

    
    if (!accounts) {
        alert("Gebruikersaccount niet gevonden. Log opnieuw in.");
        window.location.href = "login.html"; 
        return;
    }

    
    const investmentsDisplay = document.getElementById("fromInvestments");
    investmentsDisplay.textContent = `TechCorp: ${accounts.investments.TechCorp} eenheden, BioHealth: ${accounts.investments.BioHealth} eenheden, AutoFuture: ${accounts.investments.AutoFuture} eenheden`;

    
    const investmentForm = document.getElementById("investmentForm");
    investmentForm.addEventListener("submit", (event) => {
        event.preventDefault();

        
        const companySelect = document.getElementById("companySelect").value;
        const amount = parseInt(document.getElementById("amount").value, 10);
        const action = document.querySelector("input[name='action']:checked").value;

        
        if (isNaN(amount) || amount <= 0) {
            alert("Voer een geldig aantal eenheden in.");
            return;
        }

        const companyPrices = {
            TechCorp: 120,
            BioHealth: 95,
            AutoFuture: 150
        };

        const pricePerUnit = companyPrices[companySelect];
        const totalCost = pricePerUnit * amount;

        if (action === "buy") {
            if (accounts.betaalrekening >= totalCost) {
                accounts.betaalrekening -= totalCost;
                accounts.investments[companySelect] += amount;
                alert(`U heeft ${amount} eenheden van ${companySelect} gekocht voor €${totalCost.toFixed(2)}.`);
            } else {
                alert("Onvoldoende saldo op uw betaalrekening om deze aankoop te voltooien.");
                return;
            }
        } else if (action === "sell") {
            if (accounts.investments[companySelect] >= amount) {
                accounts.investments[companySelect] -= amount;
                accounts.betaalrekening += totalCost;
                alert(`U heeft ${amount} eenheden van ${companySelect} verkocht voor €${totalCost.toFixed(2)}.`);
            } else {
                alert("Onvoldoende eenheden om te verkopen.");
                return;
            }
        }

        
        investmentsDisplay.textContent = `TechCorp: ${accounts.investments.TechCorp} eenheden, BioHealth: ${accounts.investments.BioHealth} eenheden, AutoFuture: ${accounts.investments.AutoFuture} eenheden`;

        document.getElementById("fromAccountBalance").textContent = `€${accounts.betaalrekening.toFixed(2)}`;
    });

   
    const accountBalanceDisplay = document.createElement("p");
    accountBalanceDisplay.id = "fromAccountBalance";
    accountBalanceDisplay.textContent = `Betaalrekening: €${accounts.betaalrekening.toFixed(2)}`;
    investmentForm.parentElement.insertBefore(accountBalanceDisplay, investmentForm);
});
