document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = 'TU_CLAVE_API'; // Reemplaza con tu clave API
    const API_URL = `https://api.exchangerate-api.com/v4/latest/USD`; // URL para tasas en USD

    const form = document.getElementById('currency-form');
    const fromCurrencySelect = document.getElementById('from-currency');
    const toCurrencySelect = document.getElementById('to-currency');
    const resultDiv = document.getElementById('result');

    async function fetchCurrencyRates() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.rates;
        } catch (error) {
            console.error('Error fetching currency rates:', error);
            alert('Error al obtener los tipos de cambio.');
        }
    }

    async function convertCurrency(amount, fromCurrency, toCurrency, rates) {
        if (fromCurrency === toCurrency) {
            return amount;
        }
        const rate = rates[toCurrency] / rates[fromCurrency];
        return amount * rate;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const amount = parseFloat(document.getElementById('amount').value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            alert('Por favor ingresa una cantidad válida.');
            return;
        }

        const rates = await fetchCurrencyRates();
        if (rates) {
            const result = await convertCurrency(amount, fromCurrency, toCurrency, rates);
            resultDiv.textContent = `Resultado: ${result.toFixed(2)} ${toCurrency}`;
        } else {
            resultDiv.textContent = 'Error en la conversión.';
        }
    });
});
