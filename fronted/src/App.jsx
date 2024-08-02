import React, { useState, Fragment } from 'react';
import axios from '../axiosConfig';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const options = [
  { name: 'Numbers' },
  { name: 'Alphabets' },
  { name: 'Highest Alphabet' },
];

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState('');

  document.title = "RA2111003020546";

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const response = await axios.post('/bfhl', parsedInput);
      setResponseData(response.data);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or server error');
      setResponseData(null);
    }
  };

  const displayResponse = () => {
    if (!responseData) return null;
    return (
      <div className="mt-4">
        {selectedOptions.includes('Numbers') && (
          <div>Numbers: {responseData.numbers.join(',')}</div>
        )}
        {selectedOptions.includes('Alphabets') && (
          <div>Alphabets: {responseData.alphabets.join(',')}</div>
        )}
        {selectedOptions.includes('Highest Alphabet') && (
          <div>Highest Alphabet: {responseData.highest_alphabet}</div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Filter App</h1>
      <textarea
        className="w-full p-2 border rounded"
        rows="4"
        placeholder='{"data": ["A", "C", "z"]}'
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
      ></textarea>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2"
        onClick={handleSubmit}
      >
        Submit
      </button>

      {responseData && (
        <div className="mt-4">
          <Listbox value={selectedOptions} onChange={setSelectedOptions} multiple>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-orange-300 sm:text-sm">
                <span className="block truncate">Select Options</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {options.map((option, optionIdx) => (
                    <Listbox.Option
                      key={optionIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                        }`
                      }
                      value={option.name}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {option.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          {displayResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
