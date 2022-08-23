import React, {useState,useEffect} from "react";
import './Filters.css';

/**
 * The Filters function builds dropdown filters to display on the 
 * ResultsList component to filter airline search results
 * @param {*} props object containing data passed in from the ResultsList component
 * @returns JSX elements to build the Filter component
 */

function Filters(props) {
    
    // filter values object, updated on change by the dropdown selection
    const [filterValues, setFilterValues] = useState({
        airline: "All",
        price: "All"   
    })

    /* This useEffect hook will call the onChangeFilter function in the ResultsList component anytime
    * the filterValues variable state is changed
    */
    useEffect(()=>{
        props.onChangeFilter(filterValues);
    },[filterValues]);

    /*
    * The results response from ResultsList is converted to a set to generate 
    * unique values
    */
    let airlines = new Set(props.data.map(item =>
        item.flights[0].airline
        ));

    let prices = new Set(props.data.map(item => 
        item.price
        ));

    /*
    * The sets are converted back to arrays so we can call necessary array methods on them
    */
    airlines = Array.from(airlines);
    prices = Array.from(prices);

    /*
    * selectAirline and selectPrice are called 'onChange' by the respective dropdown. 
    * onChange generates an event object containing the value of the current selection which
    * is then used to set the filterValues object variable 
    */
    const selectAirline = e => {
        setFilterValues(prev =>{
            return {...prev, airline: e.target.value}
        })

        
    }

    const selectPrice = e => {
        setFilterValues(prev =>{
            return {...prev, price: e.target.value}
        })
        
    }
    
    // JSX for building Filters
    return (  
        <>
        <div className="filter-label">
            <p>Filter results by:</p>
        </div>
        <div className="filters">
            <div>Airline</div>
            <select className="select" value={props.selected} onChange={selectAirline}>
                <option value="All">All</option>
                {airlines.map((airline,index) => {
                 return <option key={index} value={airline}>{airline}</option>
                }
                )}
            </select>
            <div>Price</div>
            <select className="select" value={props.selected} onChange={selectPrice}>
            <option value="All">All</option>
                {prices.map((price,index) => {
                 return <option key={index} value={price}>${price}</option>
                }
                )}
            </select>
        </div>
        </>
    );
}

export default Filters;