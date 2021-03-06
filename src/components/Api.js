import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react';
import '../App.css';


export const Api = () => {
    const [api, setApi] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [city, setCity] = useState("Ankara");
    const baseURL = `https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=b5cced026e22437cbdc61451d13c95f9&include=minutely&country=TR&city=${city}`;
    async function apiData() {
        const result = await axios.get(baseURL);
        const response = result.data.data[0];
        if (response) {
            setApi(response);
            setIsLoaded(true);
        } else if (error) {
            setIsLoaded(true);
            setError(error);
        }
        console.log(response)
    }
    const onChangeValue = (e) => {
        setCity(e.target.value)
        apiData();
    }
    useEffect(() => {
        apiData();
    }, []);


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <ul>
                    <h1>Weather APİ</h1>
                    <li><b>Tarih :</b> {api.ob_time}</li>
                    <img width={150} height={150} src={`${"https://www.weatherbit.io/static/img/icons/"}` + api.weather?.icon + `.png`} />{api.weather?.description}
                    <li><b>Ülke :</b> {api.country_code}</li>
                    <li><b>Şehir :</b> {api.city_name}</li>
                    <li><b>Derece :</b> {api.temp}</li>
                </ul>
                <div className="flex-container">
                    <button onClick={(e) => onChangeValue(e)} value="İstanbul">İstanbul</button>
                    <button onClick={(e) => onChangeValue(e)} value="Ankara">Ankara</button>
                    <button onClick={(e) => onChangeValue(e)} value="İzmir">İzmir</button>
                </div>
            </>
        )
    }
}
