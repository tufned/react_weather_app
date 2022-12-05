import { useEffect, useState } from 'react';


function Search(props) {
    const addedCities = props.addedCities;
    const cities_data = props.cities_data;
    console.log(cities_data)

    const [search_value, setSearch_value] = useState([]);
    
    function searchResults_render(e) {
        const val = e.target.value.toLowerCase();
        let arr = [];
        

        for (let key in cities_data) {
            if (toCapLet(key).includes(val.trim())) {
                if (addedCities.includes(toCapLet(key)) == false) {
                    arr.push(<div onClick={addingCity} key={key} className="city">{toCapLet(key)}</div>);
                }
            }
        }
        setSearch_value(arr);
    }



    useEffect(() => {
        let arr = [];

        for (let key in cities_data) {
            if (addedCities.includes(toCapLet(key)) == false) {
                arr.push(<div onClick={addingCity} key={key} className="city">{toCapLet(key)}</div>);
            }
        }
        
        setSearch_value(arr);
    }, []);


    function toCapLet(word) {
        let str = word.slice(0, 1);
        let res = word.replace(str, str.toUpperCase());
        return res;
    }




    function addingCity(e) {
        const addedCity = e.target.innerHTML;
        addedCities.push(addedCity);
        localStorage.setItem('addedCities', JSON.stringify(addedCities));
        
        props.cityAdded(false);
    }




    return (
        <div className={'cities-list'}>
            <input autoFocus className="search-bar" onChange={searchResults_render} placeholder="Type a city" type="text" />
            <div className="search-results">{search_value}</div>
        </div>
    );
}

export default Search;