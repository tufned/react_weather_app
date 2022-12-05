import './styles/style.css';
import Sidebar from './components/Sidebar';
import MainPage from './components/MainPage';
import React, { useEffect, useState } from 'react';
import { cities_data } from './data/cities'

function App() {
    const [selectedCity, setSelectedCity] = useState('');
    const selectedCity_func = cityName => {
        setSelectedCity(cityName);
    }



    const [addedCities, setAddedCities] = useState(['London']);
    useEffect(() => {
        if (localStorage.getItem('addedCities') != null) {
            setAddedCities(JSON.parse(localStorage.getItem('addedCities')));
        }
        // перевірити коли в локал сторедж залишиться присто [] (пісоя того як видалити всі міста)
        // localStorage.getItem('addedCities').length > 0 
    }, []);




    const mainApi_setup = (latitude, longitude) => {
        return `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation,cloudcover,visibility,windspeed_10m&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,precipitation_sum,windspeed_10m_max&timezone=Europe%2FLondon` 
    }
    const [mainApi, setMainApi] = useState(mainApi_setup(cities_data['london'][0], cities_data['london'][1]));





    useEffect(() => {
        if (selectedCity != '') {
            setMainApi(mainApi_setup(cities_data[selectedCity.toLowerCase()][0], cities_data[selectedCity.toLowerCase()][1]));
        }
        else if (selectedCity == '' && addedCities.length > 0) {
            setSelectedCity(addedCities[0]);
        }
    }, [selectedCity, addedCities])



    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(mainApi)
            .then(response => response.json())
            .then(data => setData(data))
    }, [mainApi]);






    const [ukTime, setUkTime] = useState(0);
    useEffect(() => {
        fetch('https://www.worldtimeapi.org/api/timezone/Europe/London')
        .then(response => response.json())
        .then(time => setUkTime(time.datetime))
    }, []);

    const ukHours = new Date(ukTime).getHours();




    // const [data_all, setData_all] = useState([]);



    return (
        <div className="core-grid-shell">
            <Sidebar data={data} ukHours={ukHours} addedCities={addedCities} selectedCity_func={selectedCity_func} cities_data={cities_data} selectedCity={selectedCity}/>
            <MainPage data={data} ukHours={ukHours} selectedCity={selectedCity}/>
        </div>
    );
}

export default App;