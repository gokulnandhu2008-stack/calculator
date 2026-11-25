
import { useState } from "react";

function App() {
  const [display, setDisplay] = useState("0");

  const buttons = [
    "AC", "DEL", "%", "÷",
    "7", "8", "9", "×",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", ".", "="
  ];

  const handleClick = (btn) => {
    if (btn === "AC") {
      setDisplay("0");
    } 
    else if (btn === "DEL") {
      setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
    } 
    else if (btn === "=") {
      try {
        const expression = display
          .replace(/×/g, "*")
          .replace(/÷/g, "/");

        if (!/^[0-9+\-*/.() ]+$/.test(expression)) return;

        const result = Function('"use strict"; return (' + expression + ')')();

        setDisplay(
          Number.isFinite(result) ? String(Number(result.toFixed(10))) : "Error"
        );
      } catch {
        setDisplay("Error");
      }
    } 
    else if (btn === "%") {
      setDisplay(String(Number(display) / 100));
    } 
    else {
      setDisplay(display === "0" || display === "Error"
        ? btn
        : display + btn);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">

      <div className="w-full max-w-sm bg-slate-900 p-6 rounded-3xl shadow-2xl">

        <h1 className="text-white text-3xl font-bold text-center mb-6">
          Calculator
        </h1>

        {/* Display */}
        <div className="bg-slate-800 rounded-2xl p-5 mb-5">
          <p className="text-slate-400 text-sm text-right">DISPLAY</p>

          <h2 className="text-white text-4xl font-bold text-right break-all mt-3">
            {display}
          </h2>
        </div>

        {/* Calculator Buttons */}
        <div className="grid grid-cols-4 gap-3">

          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`
                h-16 rounded-2xl text-xl font-semibold
                transition duration-200 hover:brightness-125
                active:scale-95
                ${btn === "0" ? "col-span-2" : ""}
                ${
                  ["+", "-", "×", "÷", "="].includes(btn)
                    ? "bg-purple-600 text-white"
                    : ["AC", "DEL", "%"].includes(btn)
                    ? "bg-slate-700 text-purple-300"
                    : "bg-slate-800 text-white"
                }
              `}
            >
              {btn}
            </button>
          ))}

        </div>

        <p className="text-slate-500 text-center text-xs mt-6">
          Built with React & Tailwind CSS
        </p>

      </div>
    </div>
  );
}

export default App;
