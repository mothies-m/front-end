import React, { useState } from "react";
import { Select } from "antd";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [isValidJson, setIsValidJson] = useState(false);
  const [responseData, setResponseData] = useState({});
  const [filter, setFilter] = useState([]);

  const filteredResponse = filter.reduce((acc, key) => {
    if (responseData[key]) {
      acc[key] = responseData[key];
    }
    return acc;
  }, {});


  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const options = [
    { label: "Alphabets", value: "alphabets" },
    { label: "Numbers", value: "numbers" },
    {
      label: "Highest Lowercase Alphabet",
      value: "highest_lowercase_alphabet",
    },
  ];

  const handleChange = (value) => {
    setFilter(value);
  };

  const handleSubmit = () => {
    try {
      const parsed = JSON.parse(input);
      if (parsed) {
        postData(parsed);
      } else {
        alert('JSON must contain a "data" array');
        setIsValidJson(false);
      }
    } catch (error) {
      alert("Invalid JSON format");
      setIsValidJson(false);
    }
  };

  const postData = async (parsedData) => {
    try {
      const data = {
        ...parsedData,
      };
      const response = await axios.post(
        "https://backend-lovat-ten.vercel.app/bfhl",
        data
      );
      setResponseData(response?.data);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-10 max-w-lg mx-auto">
      <div className="w-full">
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
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 w-full"
      >
        Submit
      </button>

      <Select
        mode="multiple"
        className="h-12"
        allowClear
        style={{
          width: "100%",
        }}
        placeholder="Multi Filter"
        onChange={handleChange}
        options={options}
      />
            {Object.keys(filteredResponse).length > 0 && (
              <div className="mt-5">
                <h3 className="font-semibold mb-2">Filtered Response</h3>
                {Object.keys(filteredResponse).map((key) => {
                  const formattedKey = key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());
                  return (
                    <div key={key} className="flex gap-2 mb-2">
                      <p>{formattedKey}:</p>
                      <p>
                        {Array.isArray(filteredResponse[key])
                          ? filteredResponse[key].join(", ")
                          : JSON.stringify(filteredResponse[key])}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
    </div>
  );
};

export default App;
