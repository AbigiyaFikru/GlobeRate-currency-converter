import { useState, useEffect } from "react";
import { countryCode } from "../data/countryCode";
import CurrencySelector from "./CurrencySelector";

const apiKey = "337985066fb95128cdedabf6";

function ConverterForm() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETB");
  const [exchangeRate, setExchangeRate] = useState("");

  const currencyOptions = Object.keys(countryCode);

  const getExchangeRate = async () => {
    if (!amount || amount === "0") setAmount(1);

    try {
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
      const response = await fetch(url);
      const result = await response.json();
      const rate = result.conversion_rates[toCurrency];
      const total = (amount * rate).toFixed(2);
      setExchangeRate(`${amount} ${fromCurrency} = ${total} ${toCurrency}`);
    } catch (error) {
      setExchangeRate("Error fetching exchange rate");
    }
  };

  useEffect(() => {
    getExchangeRate();
  }, []);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        getExchangeRate();
      }}
      className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md mt-6 flex flex-col gap-4"
    >
      {/* Amount */}
      <div className="flex flex-col">
        <p className="font-medium">Enter amount</p>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="h-12 text-lg px-4 border-2 border-gray-400 rounded focus:outline-none mt-2"
        />
      </div>

      {/* Currency selectors */}
      <div className="flex justify-between gap-4 mt-4">
        <CurrencySelector
          label="From"
          flagUrl={`https://flagcdn.com/48x36/${countryCode[fromCurrency]}.png`}
          options={currencyOptions}
          selected={fromCurrency}
          onChange={setFromCurrency}
        />
        <CurrencySelector
          label="To"
          flagUrl={`https://flagcdn.com/48x36/${countryCode[toCurrency]}.png`}
          options={currencyOptions}
          selected={toCurrency}
          onChange={setToCurrency}
        />
      </div>

      {/* Exchange rate */}
      <div className="text-lg my-4 text-center">{exchangeRate || "Wait a second..."}</div>

      {/* Convert button */}
      <button
        type="submit"
        className="h-12 mt-2 border border-black text-black text-lg bg-gray-200 hover:bg-gray-300 rounded transition"
      >
        Convert
      </button>
    </form>
  );
}

export default ConverterForm;
