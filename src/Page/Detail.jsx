import axios from 'axios';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

function Detail() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = '98f0cc0e59msh50e8edb049b82c0p18414cjsnc8eeefc6c1d4';

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://travel-advisor.p.rapidapi.com/restaurants/list',
        params: {
          location_id: id,
          currency: 'USD',
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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return loading ? (
    <div className="flex flex-col w-full gap-4 py-4 mt-4 border-t-2">
      {[...Array([0])].map((_, i) => (
        <div key={i} className="flex flex-row gap-8">
          <img className="border w-[300px] h-[400px] bg-gray-200" />
          <div className="flex flex-col w-full gap-4">
            <h1 className="w-full font-semibold bg-gray-200">&nbsp;</h1>
            <div className="flex flex-col gap-2">
              <p className="text-xl font-medium bg-gray-200">&nbsp;</p>
              <div className="flex flex-row items-center gap-4 text-xl font-medium bg-gray-200">&nbsp;</div>
            </div>
            <p className="w-full h-[200px] flex text-justify bg-gray-200">&nbsp;</p>
            <p className="text-xl font-semibold bg-gray-200">&nbsp;</p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="mt-8 border-t-2">
      <div className="flex flex-col justify-between w-full gap-4 py-4 mt-4 rounded-md">
        {apiData?.map((d, i) => (
          <div key={i} className="flex flex-row gap-8 ">
            <img src={d?.photo?.images?.medium?.url} className="transform transition-transform hover:scale-110 border w-[300px] h-[400px] rounded-md object-cover" />
            <div className="flex flex-col gap-4 p-6 bg-gray-400 rounded-md">
              <Link to={`/`} className="flex flex-row items-center gap-4 font-semibold">
                <AiOutlineArrowLeft />
                <p>Back</p>
              </Link>
              <h1 className="text-4xl font-semibold">{d?.name}</h1>
              <div className="flex flex-col gap-1">
                <p className="text-xl font-medium">{d?.address}</p>
                <div className="flex flex-row items-center gap-4 text-xl font-medium">
                  <p>Rating : {d?.rating} / 5.0</p>
                  <div>|</div>
                  <p>Price : {d?.price}</p>
                  <div>|</div>
                  <p>Status : {d?.open_now_text}</p>
                </div>
              </div>
              <p className="w-full h-[200px] flex text-justify">{d?.description}</p>
              <p className="pt-4 text-xl font-semibold ">Contact Person : {d?.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Detail;
