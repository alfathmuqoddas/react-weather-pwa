import React, {useState} from 'react';

const App = () => {
  
  const [weather, setWeather] = useState({});
  const [query, setQuery] = useState('');
  
  const getWeather = async (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=4018b500122ee53a2b2b0ccc505a5ae4&units=metric`;
    const res = await fetch(url);
    const resJson = await res.json();
    console.log(resJson);
    console.log(resJson.main);
    if (resJson) {
      setWeather(resJson);
    }
    setQuery('');
  }
  
  return (
  <>
      <div style={{backgroundColor: '#8932a8'}}>
      <div className="container py-3">
    <h1 className="text-center text-light">React Weather PWA</h1>
      <form className="input-group mx-auto" onSubmit={getWeather} style={{width:'500px'}}>
              <input type="text" className="form-control" value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder='Search for a city' />
              <input type="submit" className="btn btn-primary" value="🔍" />
          </form>
      </div>
      </div>
        {weather.list && (
         <div className="container mt-5">
            <div className="card mx-auto mb-2" style={{width:'18rem'}}>
            <div class="card-header bg-primary text-light"><h4><bold>
              {weather.city.name}, {weather.city.country}</bold></h4>
            </div>
            <img src={`https://openweathermap.org/img/wn/${weather.list[2].weather[0].icon}@4x.png`} class="card-img-top" alt="..." />
            <div className="card-body bg-light">
              <h1 className="card-text text-center">{weather.list[2].main.temp.toFixed(0)}°C</h1>
              <h4 className="card-text text-center">{weather.list[2].weather[0].description}</h4>
            </div>
          </div>
          <div className="card mx-auto mb-5" style={{width: '18rem'}}>
             <ul class="list-group list-group-flush">
              <li class="list-group-item">Wind: {weather.list[2].wind.speed} m/s | {weather.list[2].wind.deg}°</li>
              <li class="list-group-item">Humidity: {weather.list[2].main.humidity}%</li>
              <li class="list-group-item">Visibility: {weather.list[2].visibility*0.001} km</li>
            </ul>
          </div>
         </div>
        )}
  </>
  );
}

export default App;