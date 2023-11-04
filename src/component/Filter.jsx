import { useState } from 'react';

function Filter() {
  return (
    <div className="flex flex-row items-center justify-between mt-4 border border-y-2 border-x-0">
      <div className="flex flex-row gap-4 py-4 ">
        <h1>Filter By : </h1>
        <Price />
        <Categories />
      </div>
      <button className="h-[30px] text-gray-700 hover:text-white font-light rounded-sm hover:bg-gray-700 flex items-center px-5 border">Clear All</button>
    </div>
  );
}

function Price() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="flex flex-row">
      <select
        className="block w-full px-2 leading-tight bg-white border-0 border-b-2 border-gray-300 hover:border-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="">Price</option>
        <option value="Higher">Higher</option>
        <option value="Lower">Lower</option>
      </select>
    </div>
  );
}

function Categories() {
  const [selectedValue, setSelectedValue] = useState('');

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <div className="flex flex-row ">
      <select
        className="block w-full px-2 leading-tight bg-white border-0 border-b-2 border-gray-300 hover:border-gray-500 focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        value={selectedValue}
        onChange={handleSelectChange}
      >
        <option value="">Categories</option>
        <option value="Restaurant 1">Restaurant 1</option>
        <option value="Restaurant 2">Restaurant 2</option>
        <option value="Restaurant 3">Restaurant 3</option>
        <option value="Restaurant 4">Restaurant 4</option>
      </select>
    </div>
  );
}

export default Filter;
