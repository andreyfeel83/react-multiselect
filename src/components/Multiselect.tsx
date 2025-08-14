import {useMemo, useState} from 'react';
import arrow from '@/assets/arrow.svg';
import xcircle from '@/assets/xcircle.svg';

export interface Option {
  label: string;
  value: string;
}

interface MultiselectProps {
  options: Option[];
  selectedOptions: string[];
  onSelectionChange: (values: string[]) => void;
  placeholder?: string;
}

export const Multiselect = ({
  options,
  selectedOptions,
  onSelectionChange,
  placeholder = 'Select options...',
}: MultiselectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState('');

  const filteredOptions = useMemo(() => {
    return options.filter(option => option.label.toLowerCase().includes(selectedData.toLowerCase()));
  }, [options, selectedData]);

  const toggleOption = (value: string) => {
    if (selectedOptions.includes(value)) {
      onSelectionChange(selectedOptions.filter(region => region !== value));
    } else {
      onSelectionChange([...selectedOptions, value]);
    }
  };

  const removeOption = (value: string) => {
    onSelectionChange(selectedOptions.filter(region => region !== value));
  };

  const clearAll = () => {
    onSelectionChange([]);
  };

  return (
    <main className="flex flex-col sm:flex-row gap-6 w-full">
      <section className="flex-1 relative">
        <div
          className="flex cursor-pointer items-center justify-between rounded border border-teal-300 bg-white px-3 py-2"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span className="text-gray-500">{placeholder}</span>
          <img
            src={arrow}
            alt="Arrow"
            className={`h-4 w-4 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full rounded border border-teal-300 bg-white shadow-lg transition-all duration-300 ease-in-out">
            <div className="p-2" title="enter text">
              <input
                type="text"
                placeholder="Search region..."
                value={selectedData}
                onChange={e => setSelectedData(e.target.value)}
                className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-teal-500 focus:outline-none"
              />
            </div>
            <ul className="max-h-60 overflow-y-auto transition-all duration-300">
              {filteredOptions.length === 0 ? (
                <li className="px-3 py-2 text-sm text-gray-500">No options found</li>
              ) : (
                filteredOptions.map(opt => (
                  <li
                    key={opt.value}
                    className={`cursor-pointer px-3 py-2 text-sm hover:bg-teal-100 ${
                      selectedOptions.includes(opt.value) ? 'bg-teal-50' : ''
                    }`}
                    onClick={() => toggleOption(opt.value)}
                  >
                    {opt.label}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </section>

      <section
        className={`flex flex-col flex-1 gap-2 transition-all duration-700 ease-in-out
      ${isOpen ? 'mt-72 sm:mt-0' : ''}`}
      >
        {selectedOptions.length > 0 ? (
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-2">
              {selectedOptions.map(value => {
                const option = options.find(option => option.value === value);
                return (
                  <span
                    key={value}
                    className="flex items-center gap-1 rounded border border-gray-300 bg-teal-100 px-2 py-1
                     text-sm cursor-pointer hover:bg-gray-100"
                    onClick={() => removeOption(value)}
                    title="click to remove"
                  >
                    {option?.label || value}
                    <img src={xcircle} alt="Remove" className="w-3" />
                  </span>
                );
              })}
            </div>
            <button
              type="button"
              className="mt-2 text-sm text-red-500 hover:underline self-start cursor-pointer"
              title="click to remove all"
              onClick={clearAll}
            >
              Clear all
            </button>
            <div className="mt-3 border-t border-gray-200 pt-2">
              <p className="text-sm font-medium mb-1">You have chosen:</p>
              <ul className="list-disc list-inside space-y-1">
                {selectedOptions.map(value => {
                  const option = options.find(option => option.value === value);
                  return (
                    <li key={value} className="text-sm text-gray-700">
                      {option?.label || value}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500">No options selected</p>
        )}
      </section>
    </main>
  );
};
