import { useState, useEffect } from 'react';
import '../styles/mainPage.css'

function MainPage(props) {
    const data = props.data;
    const ukHours = props.ukHours;
    const selectedCity = props.selectedCity;




    function curTemp() {
        if (data != null) {
            return Math.round(data.hourly.temperature_2m[ukHours]);
        }
    }
    function feelsLike() {
        if (data != null) {
            return Math.round(data.hourly.apparent_temperature[ukHours]);
        }
    }
    function humidity() {
        if (data != null) {
            return Math.round(data.hourly.relativehumidity_2m[ukHours]);
        }
    }
    function windspeed() {
        if (data != null) {
            return Math.round(data.hourly.windspeed_10m[ukHours]);
        }
    }
    function cloudiness() {
        if (data != null) {
            return Math.round(data.hourly.cloudcover[ukHours]);
        }
    }
    function visibility() {
        if (data != null) {
            let value = data.hourly.visibility[ukHours];
            let val_empty = '';
            for (let i = 0; i < value.toString().length; i++) {
                if (i == 2) val_empty += '.';
                val_empty += value.toString()[i];
            }
            value = Math.round(+val_empty);

            return value;
        }
    }

    // if (selectedCity == '') return 'London' 
    // console.log(selectedCity)
    // return selectedCity
    return (
        <div className='mainPage-shell'>
            <div className="top-block-shell">
                <div className="degree-shell">
                    <div className="degree">{curTemp()}°</div>
                    <div className="feelslike">feels like {feelsLike()}°</div>
                </div>
                <div className="extra-info">
                    <div className="city-name">{selectedCity}</div>
                    <div className="status">humidity: {humidity()}%</div>
                    <div className="status">wind speed: {windspeed()}km/h</div>
                    <div className="status">cloudiness: {cloudiness()}%</div>
                    <div className="status">visibility: {visibility()}km</div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;