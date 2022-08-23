import React, {useState} from 'react';
import './Search2.css';
import NumberOfAdults from './Numberofadults';
import TravelClass from './TravelClass'; 
import NonStop from './NonStop';

/**
 * Builds Search component that is used to make request for flight results to Amadeus API
 * @param {*} props passes function defined in App.js to be called by Search
 * @returns JSX to build Search component
 */
const Search = (props) => {

    // object to store search params entered by user
    const [searchData, setSearchData] = useState({
        startingCity: "",
        endingCity: "",
        startDate: "",
        endDate: "",
        numAdults: "1",
        travelClass: "ECONOMY",
        nonStop: "false"
    });

    /*
    * The following handle functions retrieve the value input by the user and store to the searchData object 
    */

    const handleStartCity = (e) => {
        setSearchData(previousState => {
            return {...previousState, startingCity: e.target.value}
        });
    
    }

    const handleEndCity = (e) => {
        setSearchData(previousState => {
            return {...previousState, endingCity: e.target.value}
        });
    }

    const handleStartDate = e => {
        setSearchData(previousState => {
            return {...previousState, startDate: e.target.value}
        });
    }

    const handleEndDate = e => {
        setSearchData(previousState => {
            return {...previousState, endDate: e.target.value}
        });
    }

    const handleSelect = param => {
       
        setSearchData(previousState => {
            return {...previousState, numAdults: param};
        });
    }
    
     const handleClassSelect = param => {
       
        setSearchData(previousState => {
            return {...previousState, travelClass: param};
        });
    }
    
     const handleNonStopSelect = param => {
       
        setSearchData(previousState => {
            return {...previousState, nonStop: param};
        });
    }

    // onSubmit pass the searchData object to the API call in App.js
    
    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSearch({params:searchData});
        setSearchData(previousState => {
            return{...previousState, 
                    startingCity: "",
                    endingCity: "",
                    startDate: "",
                    endDate: ""
                    };
        });
        
    } 

    // JSX to build the Search component
    return (
        <div className="searchFrm">
            <img src="https://cdn.discordapp.com/attachments/976146657588691008/1004557660412194826/upandaway-logo-big.png" alt="" className="flight-logo" width="400"/>
                <form onSubmit={handleSubmit} className="searchForm">
                    
                        <div className="inputContainerSearch">
                            <input value={searchData.startingCity} onChange={handleStartCity} type='text' placeholder="Starting city..." className='inputSearch' />
                            <label className="labelSearch">Starting City</label>
                        </div>
                        <div className="inputContainerSearch">
                            <input value={searchData.endingCity} onChange={handleEndCity} type='text' placeholder="Destination city..." className='inputSearch' />
                            <label className="labelSearch">Destination City</label>
                        </div>
                        <p>Starting Date</p>
                        <div className="inputContainerSearch">
                            <input value={searchData.startDate} onChange={handleStartDate} type='date' className='search-date-start inputSearch'/>
                        </div>
                        <p >Ending Date</p>
                        <div className="inputContainerSearch">
                            <input value={searchData.endDate} onChange={handleEndDate} type='date' className='search-date-end inputSearch'/>
                        </div>
                        <div className="inputContainerSearch">
                            <div className="dropdown">
                            < NumberOfAdults onSelection={handleSelect}/>
                            </div>
                            <p>Number Adults:</p>
                        </div>
                        <div className="inputContainerSearch">
                            <div className="dropdown">
                            <TravelClass onSelection={handleClassSelect}/>
                            </div>
                            <p >Travel Class:</p>
                        </div>
                        <div className="inputContainerSearch">
                            <div className="dropdown">
                            <NonStop onSelection={handleNonStopSelect}/>
                            </div>
                            <p >Non Stop:</p>
                        </div>
                        <input type="submit" className="submitBtnSearch" value="Search"/>
                </form>
        </div>
            
       
    );
}
export default Search;
