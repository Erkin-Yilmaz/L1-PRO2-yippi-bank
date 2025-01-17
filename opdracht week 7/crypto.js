document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = sessionStorage.getItem("loggedInUser");

    const userAccounts = {
        "AdminUser": {
            betaalrekening: 150000000000.00,
            investments: {
                Bitcoin: 10,
                Ethereum: 5,
                Litecoin: 20
            }
        },
        "User1": {
            betaalrekening: 0.60,
            investments: {
                Bitcoin: 0,
                Ethereum: 0,
                Litecoin: 0
            }
        },
        "User2": {
            betaalrekening: 3436.00,
            investments: {
                Bitcoin: 2,
                Ethereum: 1,
                Litecoin: 10
            }
        },
        "User3": {
            betaalrekening: -384.00,
            investments: {
                Bitcoin: 0,
                Ethereum: 0,
                Litecoin: 0
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

    const investmentsDisplay = document.getElementById("investmentMessage");
    investmentsDisplay.textContent = `Bitcoin: ${accounts.investments.Bitcoin} eenheden, Ethereum: ${accounts.investments.Ethereum} eenheden, Litecoin: ${accounts.investments.Litecoin} eenheden`;

    let cryptoPrices;

    function generateRandomPrices() {
        return {
            Bitcoin: Math.random() * (92000 - 88000) + 88000,
            Ethereum: Math.random() * (4900 - 4700) + 4700,
            Litecoin: Math.random() * (260 - 240) + 240
        };
    }

    function updateCryptoOptions(prices) {
        const cryptoSelect = document.getElementById("cryptoSelect");
        cryptoSelect.innerHTML = "";

        for (const [crypto, price] of Object.entries(prices)) {
            const option = document.createElement("option");
            option.value = crypto;
            option.textContent = `${crypto} (€${price.toFixed(2)} per eenheid)`;
            cryptoSelect.appendChild(option);
        }
    }

    cryptoPrices = generateRandomPrices();
    updateCryptoOptions(cryptoPrices);

    const cryptoForm = document.getElementById("cryptoForm");
    cryptoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const cryptoSelect = document.getElementById("cryptoSelect").value;
        const quantity = parseInt(document.getElementById("quantity").value, 10);
        const action = document.querySelector("input[name='action']:checked").value;

        if (isNaN(quantity) || quantity <= 0) {
            alert("Voer een geldige hoeveelheid in.");
            return;
        }

        const pricePerUnit = cryptoPrices[cryptoSelect];
        const totalCost = pricePerUnit * quantity;

        if (action === "buy") {
            if (accounts.betaalrekening >= totalCost) {
                accounts.betaalrekening -= totalCost;
                accounts.investments[cryptoSelect] += quantity;
                alert(`U heeft ${quantity} eenheden van ${cryptoSelect} gekocht voor €${totalCost.toFixed(2)}.`);
            } else {
                alert("Onvoldoende saldo op uw betaalrekening om deze aankoop te voltooien.");
                return;
            }
        } else if (action === "sell") {
            if (accounts.investments[cryptoSelect] >= quantity) {
                accounts.investments[cryptoSelect] -= quantity;
                accounts.betaalrekening += totalCost;
                alert(`U heeft ${quantity} eenheden van ${cryptoSelect} verkocht voor €${totalCost.toFixed(2)}.`);
            } else {
                alert("Onvoldoende eenheden om te verkopen.");
                return;
            }
        }

        investmentsDisplay.textContent = `Bitcoin: ${accounts.investments.Bitcoin} eenheden, Ethereum: ${accounts.investments.Ethereum} eenheden, Litecoin: ${accounts.investments.Litecoin} eenheden`;
        document.getElementById("fromAccountBalance").textContent = `Betaalrekening: €${accounts.betaalrekening.toFixed(2)}`;
    });

    const accountBalanceDisplay = document.getElementById("fromAccountBalance");
    accountBalanceDisplay.textContent = `Betaalrekening: €${accounts.betaalrekening.toFixed(2)}`;
});