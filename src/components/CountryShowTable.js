import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import Fuse from 'fuse.js'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

function CountryShowTable(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [countriesData, setCountriesData] = useState(undefined); //displaying countriesdata
    const [curPage, setCurPage] = useState(1);
    const [filterTxt, setFilterTxt] = useState("");
    const [searchData, setSearchData] = useState("");
   

    useEffect(() => {
        //initially loading countries data
        getCountriesData();
        return () => {
          // This code will be executed just before unmounting the component, similar to componentWillUnmount
        };
    }, []); 

    const getCountriesData = async () => {
        setIsLoading(true);
        const result = await axios.get(
            `https://restcountries.com/v3.1/all`
        );
        
        //Sort countries data by name
        result.data.sort((a, b) => {
            if ( a.name.common < b.name.common ){
                return -1;
            }
            if ( a.name.common > b.name.common ){
                return 1;
            }
            return 0;
        });
        
        //set up fuse module for search the countries by Name
        const fuse =  new Fuse(result.data, {minMatchCharLength:0, keys:["name.common"]});
        //diplay all countries data at first
        setCountriesData(result.data);
        setSearchData(fuse);
        setIsLoading(false);
    };

    const handleInputChange = (event) => {
        let newValue = event.target.value;
        if(newValue == "")
            setCountriesData(searchData._docs);
        else
            setCountriesData(searchData.search(newValue));
        setFilterTxt(newValue);
        // Do something with the input value...
    };

    let pcListContent = [];
    let mobileListContent = [];
    if(countriesData != undefined && countriesData.length != 0)
    {
        let indexOfLastRecord = countriesData.length < curPage * 25 ? countriesData.length : curPage * 25;
        let indexOfFirstRecord = (curPage - 1) * 25;

        const currentRecords = countriesData.slice(indexOfFirstRecord, indexOfLastRecord);
        currentRecords.map((index) =>{
            let countryCode = "";
            let countryItem = {};
            //set Item
            if(filterTxt == "")
                countryItem = index;
            else
                countryItem = index.item;

            //get country code
            if(countryItem.idd.suffixes != undefined)
                countryCode = countryItem.idd.root + countryItem.idd.suffixes[0];
            else if(countryItem.idd.root != undefined)
                countryCode = countryItem.idd.root;
            //to get Native Name
            let officialData = [];
            for (let key in countryItem.name.nativeName) {
                officialData = (countryItem.name.nativeName[key]["common"]);
            }

            //display countries Data on PC
            pcListContent = [...pcListContent, (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  cursor-pointer">
                    <td className="p-4 w-18">
                        <img className="w-10 h-10 rounded-full" src={countryItem.flags.png} alt={countryItem.flags.alt}/>
                    </td>
                    <td className="flex flex-col justify-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-base font-semibold">{countryItem.name.common}</div>
                        <div className="font-normal text-gray-500">{countryItem.cca2}</div>
                    </td>
                    <td className="px-3 py-4">
                        {officialData}
                    </td>
                    <td className="px-3 py-4">
                        {countryItem.name.official}
                    </td>
                    <td className="px-3 py-4 w-20 flex overflow-hidden whitespace-nowrap text-ellipsis">
                        {countryCode}
                    </td>
                </tr>
            )];
            //display countries Data on Mobile
            mobileListContent =[...mobileListContent, (
                <li className="pb-3 sm:pb-4 transition delay-[40] hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center space-x-6">
                        <div className="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={countryItem.flags.png} alt={countryItem.flags.alt}/>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-base font-semibold">{countryItem.name.common}</div>
                            <div className="font-normal text-gray-500">{countryItem.cca2}</div>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            {countryCode}
                        </div>
                    </div>
                </li>
            )];
        });
    }
    
    return (
        <div className="p-0 md:p-10 h-full">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg h-full bg-white">
               
                <div className="flex items-center justify-between p-4 dark:bg-gray-800 z-10">
                    <div className="hidden md:block md:text-xl">Country Catalog</div>
                    <div className="relative w-full md:w-80 flex">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="table-search-users" className="w-full block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for countries" onChange={handleInputChange} value={filterTxt}/>
                    </div>
                </div>
                
                <div className="hidden md:block">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Native Name
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Alternative Name
                            </th>
                            <th scope="col" className="px-3 py-3">
                                Calling Code
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {pcListContent}
                    </tbody>
                </table>
                </div>
                <div className="block md:hidden bg-white">
                    <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 p-4">
                        {mobileListContent}
                    </ul>
                </div>
                <div className="flex justify-center items-center w-full border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                    <div className="flex items-center justify-between">
                        <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <a
                            href="#"
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                            <a
                            href="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            1
                            </a>
                            <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                            2
                            </a>
                            <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                            >
                            3
                            </a>
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                            ...
                            </span>
                            <a
                            href="#"
                            className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                            >
                            8
                            </a>
                            <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                            9
                            </a>
                            <a
                            href="#"
                            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                            10
                            </a>
                            <a
                            href="#"
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                            >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </a>
                        </nav>
                        </div>
                    </div>
                    </div>
                {isLoading?(
                <div className="w-full h-full bg-white flex justify-center items-center absolute top-0 left-0 z-100">
                    <PulseLoader
                        color="#E2E8F0"
                        loading
                        size={15}
                        speedMultiplier={1}
                    />
                </div>):(<div></div>)}
            </div>
        </div>
    );
  }
  
  export default CountryShowTable;





