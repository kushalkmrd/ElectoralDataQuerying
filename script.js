let data = [];

// Load and parse the CSV file
Papa.parse('combined.csv', {
    download: true,
    header: true,
    complete: function(results) {
        data = results.data;
    }
});

function filterData() {
    const nameInput = document.getElementById('nameInput').value;
    const filteredData = data.filter(item => item.purchaser_name === nameInput);

    const partyTotals = filteredData.reduce((acc, item) => {
        acc[item.political_party] = (acc[item.political_party] || 0) + parseFloat(item.denomination);
        return acc;
    }, {});

    const sortedParties = Object.entries(partyTotals).sort((a, b) => b[1] - a[1]);

    displayResults(sortedParties);
}

function displayResults(sortedParties) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    sortedParties.forEach(([party, total]) => {
        const p = document.createElement('p');
        p.textContent = `${party}: ${total / 10000000} crores`;
        resultDiv.appendChild(p);
    });
}
