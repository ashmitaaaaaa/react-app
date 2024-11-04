import React, { useState, useEffect } from 'react';
import "./calculator.css";

const ClockCalculator = () => {
  // Clock State
  const [time, setTime] = useState(new Date());

  // Calculator State
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isNewNumber, setIsNewNumber] = useState(true);

  // Clock Effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clock Format Functions
  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  // Calculator Functions
  const handleNumber = (number) => {
    if (isNewNumber) {
      setDisplay(number);
      setIsNewNumber(false);
    } else {
      setDisplay(display + number);
    }
  };

  const handleOperator = (operator) => {
    setEquation(display + ' ' + operator + ' ');
    setIsNewNumber(true);
  };

  const handleEqual = () => {
    try {
      const result = eval(equation + display);
      setDisplay(String(result));
      setEquation('');
      setIsNewNumber(true);
    } catch (error) {
      setDisplay('Error');
      setEquation('');
      setIsNewNumber(true);
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
    setIsNewNumber(true);
  };

  const Button = ({ value, onClick, className }) => (
    <button
      onClick={onClick}
      className={`p-4 text-xl font-semibold rounded-lg ${className}`}
    >
      {value}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Clock & Calculator
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Clock Section */}
          <div className="flex flex-col items-center justify-center min-h-[200px] bg-gray-900 rounded-lg p-8">
            <div className="text-6xl font-mono text-green-500">
              {hours}:{minutes}:{seconds}
            </div>
            <div className="mt-4 text-gray-400">
              {time.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>

          {/* Calculator Section */}
          <div className="bg-gray-800 p-5 rounded-xl shadow-2xl">
            {/* Equation Display */}
            <div className="h-6 text-right text-gray-400 text-sm mb-1">
              {equation}
            </div>
            
            {/* Main Display */}
            <div className="bg-gray-900 text-right p-4 rounded-lg mb-4">
              <span className="text-3xl text-white font-mono">
                {display}
              </span>
            </div>

            {/* Button Grid */}
            <div className="grid grid-cols-4 gap-2">
              <Button 
                value="C" 
                onClick={handleClear}
                className="bg-red-500 hover:bg-red-600 text-white col-span-2"
              />
              <Button 
                value="/" 
                onClick={() => handleOperator('/')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              />
              <Button 
                value="*" 
                onClick={() => handleOperator('*')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              />
              
              {[7, 8, 9].map((num) => (
                <Button
                  key={num}
                  value={num}
                  onClick={() => handleNumber(String(num))}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                />
              ))}
              <Button 
                value="-" 
                onClick={() => handleOperator('-')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              />
              
              {[4, 5, 6].map((num) => (
                <Button
                  key={num}
                  value={num}
                  onClick={() => handleNumber(String(num))}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                />
              ))}
              <Button 
                value="+" 
                onClick={() => handleOperator('+')}
                className="bg-yellow-500 hover:bg-yellow-600 text-white"
              />
              
              {[1, 2, 3].map((num) => (
                <Button
                  key={num}
                  value={num}
                  onClick={() => handleNumber(String(num))}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                />
              ))}
              <Button 
                value="=" 
                onClick={handleEqual}
                className="bg-green-500 hover:bg-green-600 text-white row-span-2"
              />
              
              <Button 
                value="0" 
                onClick={() => handleNumber('0')}
                className="bg-gray-600 hover:bg-gray-700 text-white col-span-2"
              />
              <Button 
                value="." 
                onClick={() => handleNumber('.')}
                className="bg-gray-600 hover:bg-gray-700 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockCalculator;