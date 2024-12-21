document.addEventListener("DOMContentLoaded", () => {
    // Transaction history code
    const transactionHistory = [
        { type: "inkomend", date: "2024-1-24", amount: 3000.00 },
        { type: "uitgaand", date: "2024-1-26", amount: -500.00 },
        { type: "inkomend", date: "2024-10-08", amount: 10.00 },
        { type: "uitgaand", date: "2024-12-20", amount: -80.00 },
    ];

    const tbody = document.getElementById("transactionHistory");
    const typeFilter = document.getElementById("typeFilter");
    const dateFilter = document.getElementById("dateFilter");

    function renderTransactions(filterType = "Alle", filterDate = "") {
        tbody.innerHTML = "";

        const filteredTransactions = transactionHistory.filter(transaction => {
            const matchesType = filterType === "Alle" || transaction.type === filterType;
            const matchesDate = !filterDate || transaction.date === filterDate;
            return matchesType && matchesDate;
        });

        if (filteredTransactions.length === 0) {
            tbody.innerHTML = `<tr><td colspan="3">Geen transacties beschikbaar.</td></tr>`;
            return;
        }

        filteredTransactions.forEach(transaction => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${transaction.date}</td>
                <td>${transaction.type}</td>
                <td>€${transaction.amount.toFixed(2)}</td>
            `;
            tbody.appendChild(row);
        });
    }

    document.getElementById("filterForm").addEventListener("submit", event => {
        event.preventDefault();
        const filterType = typeFilter.value;
        const filterDate = dateFilter.value;
        renderTransactions(filterType, filterDate);
    });

    renderTransactions();
});
