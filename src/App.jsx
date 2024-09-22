import React, { useState } from "react";

const App = () => {
  const [input, setInput] = useState(""); 
  const [isValidJson, setIsValidJson] = useState(false); 
  const [parsedData, setParsedData] = useState([]); 
  const [selectedFilter, setSelectedFilter] = useState(""); 
  const [filteredResponse, setFilteredResponse] = useState(""); 


  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  
  const handleSubmit = () => {
    try {
      const parsed = JSON.parse(input);
      if (Array.isArray(parsed.data)) {
        setParsedData(parsed.data);
        setIsValidJson(true);
        setSelectedFilter(""); 
        setFilteredResponse(""); 
      } else {
        alert('JSON must contain a "data" array');
        setIsValidJson(false);
      }
    } catch (error) {
      alert("Invalid JSON format");
      setIsValidJson(false);
    }
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    const numbers = parsedData.filter((item) => !isNaN(item));
    const alphabets = parsedData.filter(
      (item) => isNaN(item) && /^[a-zA-Z]+$/.test(item)
    );
    const lowercaseAlphabets = alphabets.filter(
      (item) => item === item.toLowerCase()
    );

    if (e.target.value === "Numbers") {
      setFilteredResponse(numbers.join(", "));
    } else if (e.target.value === "Alphabets") {
      setFilteredResponse(alphabets.join(", "));
    } else if (e.target.value === "Highest lowercase alphabet") {
      const highest = lowercaseAlphabets.sort().reverse()[0] || "N/A";
      setFilteredResponse(highest);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-10">
      {/* API Input */}
      <div className="w-full max-w-lg">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          API Input
        </label>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder='Enter valid JSON (e.g. {"data":["1","a","B"]})'
        />
      </div>

      
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
      >
        Submit
      </button>

      {isValidJson && (
        <div className="w-full max-w-lg">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Multi Filter
          </label>
          <select
            value={selectedFilter}
            onChange={handleFilterChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="">Select a filter</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">
              Highest lowercase alphabet
            </option>
          </select>
        </div>
      )}

      {filteredResponse && (
        <div className="w-full max-w-lg">
          <h3 className="font-semibold">Filtered Response</h3>
          <p>{filteredResponse}</p>
        </div>
      )}
    </div>
  );
};

export default App;
