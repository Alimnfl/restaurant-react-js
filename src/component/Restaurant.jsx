import { AiFillStar } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';
import axios from 'axios';

function Restaurant() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      },
    };

    try {
      const response = await axios.request(options);
      setApiData(response.data.data);
      setTimeout(fetchData, 60000);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(apiData?.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const visibleData = apiData?.slice(startIndex, endIndex);

  return loading ? (
    <div className="mt-4">
      <div className="flex flex-wrap gap-6">
        {Array.from({ length: itemsPerPage }).map((_, i) => (
          <div key={i} className="w-[280px] max-h-[350px] justify-between p-2 flex gap-2 flex-col">
            <div className="w-full h-[200px] bg-gray-200"></div>
            <div className="font-medium align-middle bg-gray-200">&nbsp;</div>
            <div className="w-full font-medium bg-gray-200">&nbsp;</div>
            <button className="w-full h-[40px] text-white text-lg border rounded-md bg-gray-200">&nbsp;</button>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="mt-4">
      {console.log(apiData)}
      <div className="flex flex-wrap gap-6">
        {visibleData.map((d, i) => (
          <div key={i}>
            <div className="w-[280px]  h-[380px]  bg-gray-100 transform transition-transform hover:scale-105 border-2 rounded-md justify-between p-2 flex gap-2 flex-col">
              <Link to={`/restaurant/${d.location_id}`}>
                <img src={d?.photo?.images?.medium?.url} className="object-cover w-full rounded-md border h-[200px]" />
              </Link>
              <h1 className="font-medium align-middle">{d.name}</h1>
              <div className="flex flex-row items-center gap-4">
                <div className="flex flex-row">
                  {Array.from({ length: Math.round(d.rating) }).map((_, i) => (
                    <AiFillStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <div className="text-sm font-light">|</div>
                <div className="text-sm font-light">{d?.num_reviews} User</div>
              </div>
              <div className="flex flex-row items-center justify-between text-xs font-light">
                <p className="flex flex-row gap-4">
                  <span className="font-medium">{d?.address_obj?.city}</span> <span className="font-medium text-green-700">{d?.price_level}</span>
                </p>
                <p className="flex">{d?.open_now_text}</p>
              </div>
              <Link to={`/restaurant/${d.location_id}`}>
                <button className="w-full h-[40px] text-white  hover:border-blue-500 text-lg border bg-blue-600 rounded-md">LEARN MORE</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-4">
        <div className="flex flex-row gap-[60px]">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <GoChevronLeft size={14} fill={currentPage === 1 ? '#fff' : '#5A5A5A'} />
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <GoChevronRight size={14} fill={currentPage === totalPages ? '#fff' : '#5A5A5A'} />
          </button>
        </div>
        <p>{`Page ${currentPage} of ${totalPages}`}</p>
      </div>
    </div>
  );
}

export default Restaurant;
