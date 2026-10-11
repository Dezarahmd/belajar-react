import { useState } from "react";
import TemperatureInput from "./TemperatureInput";

function celsiusToFahrenheit(c) {
  return (c * 9) / 5 + 32;
}
function fahrenheitToCelsius(f) {
  return ((f - 32) * 5) / 9;
}

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState(0);

  return (
    <div>
        <TemperatureInput label="Celsius" value={celsius} onChange={setCelsius}/>
        <TemperatureInput label="Fahrenheit" value={celsiusToFahrenheit(celsius)} onChange={value => setCelsius(fahrenheitToCelsius(value))}/>
    </div>
  )
}
