import React, { useState } from "react";
import { Link } from "react-router-dom";
import shippingData from "../../mockData/shippingData";
import "./Shipping.css";

const Shipping = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [weight, setWeight] = useState("");
  const [isJewelry, setIsJewelry] = useState(false);
  const [message, setMessage] = useState("");

  const handleCountrySelect = (e) => {
    const selected = e.target.value;
    setSelectedCountry(selected);
    setMessage("");

    if (selected === "India") {
      setMessage(shippingData.India.message);
      setWeight("");
      setIsJewelry(false);
    }
  };

  const handleWeightCalculator = (e) => {
    setWeight(e.target.value);
    setMessage("");
  };

  const isJewelryIncluded = (e) => {
    setIsJewelry(e.target.checked);
    setMessage("");
  };

  const calculateShipping = () => {
    if (!selectedCountry) {
      alert("Please select a country first.");
      return;
    }

    if (selectedCountry === "India") {
      setMessage(shippingData.India.message);
      return;
    }

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      alert("Please enter a valid shipping weight in kilograms.");
      return;
    }

    const roundedWeight = Math.ceil(weightNum);

    if (roundedWeight > 10) {
      setMessage(
        "Orders over 10 kgs require custom quotes — please contact us directly for bulk pricing."
      );
      return;
    }

    let shippingCost = roundedWeight * shippingData.USA.cost;

    if (isJewelry) {
      shippingCost += shippingData.USA.jewelrySurcharges;
    }

    setMessage(
      `Estimated shipping cost: ₹${shippingCost} for ${roundedWeight} kg${
        isJewelry
          ? ` (including ₹${shippingData.USA.jewelrySurcharges} customs surcharge for jewelry)`
          : ""
      }.`
    );
  };

  return (
    <div className="shipping-container">
      <div className="shipping-info">
        <h2>🏠📦🚚✈️🌏 Shipping Information 🌏✈️🚚📦🏠</h2>
        <ul>
          <li>🚚 <strong>Free shipping</strong> across India — no matter the quantity or weight!</li>
          <li>🌏 Use the calculator below for international shipping rates.</li>
          <li>⚠️ Orders over 10 kgs require <em>custom quotes</em> — <Link to="/contact-us">Contact Us</Link>.</li>
          <li>💎 Jewelry orders incur an additional customs surcharge.</li>
          <li>⚖️ Weight is rounded <strong>up</strong> to the nearest kg.</li>
          <li>🏙️ St. Louis: in-person pickup for under 10 kgs.</li>
          <li>🕒 Shipping due at dispatch (monthly or biweekly).</li>
          <li>📲 Questions? Reach us via WhatsApp or <Link to="/contact-us">Contact Page</Link>.</li>
        </ul>
      </div>

      {/* Shipping Calculator Box */}
      <div className="shipping-calculator">
        <h2>Shipping Calculator</h2>

        <label htmlFor="country">Select Country:</label>
        <select
          id="country"
          value={selectedCountry}
          onChange={handleCountrySelect}
        >
          <option value="" disabled>-- Select a country --</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
        </select>

        <label htmlFor="weight">Enter Weight (kg):</label>
        <input
          id="weight"
          type="number"
          placeholder="e.g. 2.5"
          value={weight}
          onChange={handleWeightCalculator}
          disabled={selectedCountry === "India" || !selectedCountry}
        />

        <label htmlFor="jewelry">
          <input
            id="jewelry"
            type="checkbox"
            checked={isJewelry}
            onChange={isJewelryIncluded}
            disabled={selectedCountry === "India" || !selectedCountry}
          />
          Includes Jewelry (₹{shippingData.USA.jewelrySurcharges} surcharge)
        </label>

        <button
          type="button"
          onClick={calculateShipping}
          disabled={selectedCountry === "India" || !selectedCountry}
        >
          Calculate Shipping
        </button>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default Shipping;
