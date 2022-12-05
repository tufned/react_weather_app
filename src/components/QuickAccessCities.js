import { useEffect } from "react";

function QuickAccessCities(props) {
    const addedCities = props.addedCities;
    const data = props.data;
    const ukHours = props.ukHours;
    const selectedCity = props.selectedCity;
    const selectedCity_func = props.selectedCity_func;

    // console.log(addedCities);
    // console.log(data);
    // console.log(ukHours);


    

    const city_temp = () => {
        if (data != null) {
            return Math.round(data.hourly.temperature_2m[ukHours]);
        }
    }

    function addedCities_setup() {
        let arr = [];
        for (let cityName of addedCities) {
            if (cityName == selectedCity) {
                arr.push(
                    <div key={cityName} className='city-shell city-shell_highlited'>
                        <p className="city-name">{cityName}</p>
                        <p className="city-temp">{city_temp()}°</p>
                    </div>
                )
            }
            else {
                arr.push(
                    <div key={cityName} className='city-shell' onClick={() => selectedCity_func(cityName)}>
                        <p className="city-name">{cityName}</p>
                        <p className="city-temp">{city_temp()}°</p>
                    </div>
                )
            }
        }
        return arr;
    }


    function addedCities_render() {
        let divs = addedCities_setup();
        let arr = [];
        for (let i = 0; i < divs.length; i++) {
            arr.push(divs[i]);
            if (i != divs.length - 1) arr.push(<div key={`line-${i}`} className="line"></div>);
        }
        return arr;
    }

    
        
    return ( 
        <div className='q-a-cities'>
            {addedCities_render()}
        </div>
    );
}

export default QuickAccessCities;