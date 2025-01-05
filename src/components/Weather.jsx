import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Weather = () => {

  const [city, setCity] = useState('');
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState(null)

  const fetchWeather = async (cityName = 'Haryana') => {
    setLoading(true)
    setErrors(null);
    try {
      // const cityName = city || 'rohtak';
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${'79b4708f30adf9efb235d0a5bb90c949'}`)
      response ? setLoading(true) : setLoading("false")
      setData(response);
    }
    catch (error) {
      setErrors('Error fetching weather data. Please try again .');
      toast.error(`sorry, ${city} Not found`)

      console.log(`Error in Fetching data : ${error}`);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchWeather()
  }, [])

  const handleChange = (e) => {
    setCity(e.target.value)
  }

  const handleClick = (e) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeather(city);
      setCity('')
    }

    if (city == '') {
      toast.error('Sorry, it cant be Empty')
    }

  }



  return (
    <>
      <form action="" className=' flex justify-center items-center w-full  m-auto p-1  gap-2   mb-6'>
        <input type="text" placeholder='Enter city Name' value={city} onChange={handleChange} className='border pl-5 p-2 rounded-xl w-3/5 h-14 text-black shadow-lg' />
        <button onClick={handleClick} className='bg-blue-800  m-1 rounded-xl p-3 hover:bg-blue-700 font-bold h-14 w-14 flex items-center justify-center text-lg'><FaSearch /></button>
      </form>
      <div className=' p-3 lg:w-2/5 my-auto  mx-auto h-fit min-h-96 rounded-3xl bg-box-img bg-cover '>



        <div className=' p-3 h-[80%] sm:flex flex-col sm:flex-row  justify-between items-center'>
          {data && <>

            <div className=" hidden md:block sm:flex flex-col sm:w-1/2 h-full justify-between  items-start p-3 m-3 w-full relative ">

              <div className='mb-36'>
                <h2 className='   font-bold text-4xl p-3'>{`${data.data.name}, ${data.data.sys.country} `}</h2>
                <p>{data.data.weather[0].description}</p>
              </div>
              {data.data.main.temp && <h1 className='font-bold text-5xl'>{`${Math.floor((data.data.main.temp - 273.15) * 10) / 10} °C`}</h1>}

            </div>

            <div className=" hidden sm:flex sm:flex-col h-full w-full sm:w-1/2 sm:justify-start sm:items-start pl-10">
              <img
                className="h-40 w-40 mx-auto sm:mx-auto "
                src={`http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`}
                alt="Weather Icon"
              />
              <span className=" p-2 w-full rounded-md">
                {`Feels Like : ${Math.floor((data.data.main.feels_like - 273.15) * 10) / 10} °C`}
              </span>
              <span className=" p-2 w-full rounded-md">
                {`Humidity : ${data.data.main.humidity} %`}
              </span>
              <span className=" p-2 w-full rounded-md">
                {`Wind Speed : ${Math.round(data.data.wind.speed * 3.6)} km/h`}
              </span>
       
            </div>


            {/* mobile */}
            <div className='sm:hidden flex flex-col w-full justify-center items-center '>
              <div className=" flex flex-col sm:w-1/2 h-full justify-between items-start p-3 m-3 w-full relative ">

                <div className=' m-auto'>
                  <h2 className='font-bold text-3xl p-3'>{`${data.data.name}, ${data.data.sys.country} `}</h2>
                  <p>{data.data.weather[0].description}</p>
                </div>

                <img className='m-auto h-40 w-40' src={`http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png`} alt="" />

                {data.data.main.temp && <h1 className=' m-auto font-bold text-5xl'>{`${Math.floor((data.data.main.temp - 273.15) * 10) / 10} °C`}</h1>}

              </div>

              <div className=''>
                <span className='p-1 w-full'>{`Humidity : ${data.data.main.humidity} %`} </span> <br />
                <span className=' p-1 w-full'>{`Wind Speed :  ${Math.round(data.data.wind.speed * 3.6)} km/h`}</span><br />
         


              </div>

            </div>



          </>}

        </div>

      </div>
      <ToastContainer />
    </>
  )
}

export default Weather
