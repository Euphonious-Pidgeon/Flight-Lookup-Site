import React, {useState} from 'react';
import './ResultList.css';
import Result from './Result';
import Filters from './Filters';

/**
 * Build ResultList by looping through Amadeus API response and adding Result component for each index
 * @param {*} (data, onSaveFlight) response object from Amadeus API, function to save result to database 
 * @returns 
 */
const ResultList = ({data,onSaveFlight}) => {

    // filter values used to filter response array
    const [filter, setFilter] = useState({
        airline: "All",
        price: 10000   
    });


    // filter values sent over from Filters component and used to set value of filter
    const filterAirline = (filterObject) => {
        setFilter(prev => {
            return {...prev, 
                    airline: filterObject.airline,
                    price: filterObject.price}
        });
    }

// filtered array
const filteredResults = data.map(item => {
    return {...item, flights: item.flights.filter((flights)=>
            (flights.airline === filter.airline || filter.airline === "All") &&
            (parseInt(item.price) <= parseInt(filter.price) || filter.price === "All")

        )}
}).filter(item => item.flights.length !== 0) // filter out any null arrays



// send single index of response array back to App.js to be saved to database
const saveSubmitHandler = (index) => {
    onSaveFlight(data[index]);
}

// JSX used to build ResultList
    return (
        <>
        <Filters data={data} onChangeFilter={filterAirline}/>
        <div className='resultlist'>
        {filteredResults.map((offer) => 
            <Result 
            key={offer.index}
            index={offer.index}
            totalPrice={offer.price}
            flights={offer.flights}
            onSaveSubmit={saveSubmitHandler}      
            />
        )}
        </div>
        </>
    );



}

export default ResultList;