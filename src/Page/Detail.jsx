import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiKey = '39d5a50c9cmshbcb1bfc5a3d58e7p1679c6jsn5e102ca0a19d';
  const { id } = useParams();

  const fetchData = async () => {
    const options = {
      method: 'GET',
      url: 'https://travel-advisor.p.rapidapi.com/restaurants/list',
      params: {
        location_id: '293919',
        currency: 'USD',
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
      setApiData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col w-full gap-4 py-4 mt-4 border-t-2">
      {console.log(apiData)}
      {apiData?.map((d, i) => (
        <div key={i} className="flex flex-row gap-8">
          <img src={d?.photo?.images?.medium?.url} className="border w-[300px] h-[400px] rounded-md object-cover" />
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-semibold">{d?.name}</h1>
            <p className="text-2xl font-medium">{d?.address}</p>
            <div className="flex flex-row items-center gap-4 text-2xl font-medium">
              <p>Rating : {d?.rating} / 5.0</p>
              <div>|</div>
              <p>Price : {d?.price}</p>
              <div>|</div>
              <p>Status : {d?.open_now_text}</p>
            </div>
            <p className="w-full h-[200px]">{d?.description}</p>
            <p className="text-xl font-semibold">Contact Person : {d?.phone}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Detail;
