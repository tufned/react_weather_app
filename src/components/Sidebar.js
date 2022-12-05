import { useEffect, useState } from 'react';
import '../styles/sidebar.css'
import QuickAccessCities from './QuickAccessCities';
import Search from './Search'

function Sidebar(props) {
    const data = props.data;
    const ukHours = props.ukHours;
    const addedCities = props.addedCities;

    

    // зробити змогу видаляти міста в QACities (додати на правий клік, щоб виходила кнопка видалити)
    // вивести інфо про температуру навпроти кожного міста

    

    const [showSearch, setShowSearch] = useState(false);
    const cityAdded = bool => {
        setShowSearch(bool)
    }



    function comp_render() {        
        if (showSearch) return <Search addedCities={addedCities} cityAdded={cityAdded} cities_data={props.cities_data} />
        return <QuickAccessCities addedCities={addedCities} data={data} ukHours={ukHours} selectedCity_func={props.selectedCity_func} selectedCity={props.selectedCity}/>
    }
            
    function butImg_render() {
        if (showSearch) return 'https://img.icons8.com/fluency-systems-filled/96/484848/left.png'
        return 'https://img.icons8.com/android/96/484848/plus.png'
    }
    function butText_render() {
        if (showSearch) return 'Back'
        return 'Add City'
    }


    return (
        <div className='container'>

            {comp_render()}

            <div onClick={() => setShowSearch(!showSearch)} className='add-city-shell'>
                <img src={butImg_render()} className="plus-icon"></img>
                <p>{butText_render()}</p>
            </div>
        </div>
    );
}

export default Sidebar;