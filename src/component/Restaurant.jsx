import { AiOutlineStar } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import axios from 'axios';

function Restaurant() {
  const [apiData, setApiData] = useState(null);

  const apiKey = '39d5a50c9cmshbcb1bfc5a3d58e7p1679c6jsn5e102ca0a19d';

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/list',
      params: {
        location_id: '293919',
        restaurant_tagcategory: '10591',
        restaurant_tagcategory_standalone: '10591',
        currency: 'USD',
        lunit: 'km',
        limit: '30',
        open_now: 'false',
        lang: 'en_US',
      },
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        Authorization: 'Bearer 39d5a50c9cmshbcb1bfc5a3d58e7p1679c6jsn5e102ca0a19d',
      },
    };

    try {
      const response = await axios.request(options);
      setApiData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 50;

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div>
      <h1 className="py-4 text-xl font-medium ">Restaurant</h1>
      {apiData.map((d, i) => (
        <div key={i} className="flex flex-wrap justify-between gap-4">
          <div className="w-[280px] flex gap-2 flex-col">
            <Link to={`/anime/2`}>
              <div className="border bg-gray-400 w-full h-[200px]"></div>
            </Link>
            <h1 className="font-medium align-middle">Very long name restaurant number 1 in list</h1>
            <div>
              <AiOutlineStar className="text-red-200" />
            </div>
            <div className="flex flex-row justify-between text-xs font-light">
              <p>THAI * $$$$</p>
              <p>
                <span>*</span> Status
              </p>
            </div>
            <Link to={`/anime/2`}>
              <button className="w-full h-[40px] text-white transform transition-transform hover:scale-105 hover:border-blue-500 text-lg border bg-blue-600 rounded-md">LEARN MORE</button>
            </Link>
          </div>
        </div>
      ))}
      <div className="flex flex-col items-center mt-4">
        <div className="flex flex-row">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <GoChevronLeft size={14} fill={currentPage === 1 ? '#5A5A5A' : '#fff'} />
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <GoChevronRight size={14} fill={currentPage === totalPages ? '#5A5A5A' : '#fff'} />
          </button>
        </div>
        <p>{`Page ${currentPage} of ${totalPages}`}</p>
      </div>
    </div>
  );
}

export default Restaurant;
