import { useState, useEffect } from "react";
import { PulseLoader } from "react-spinners";
import axios from 'axios';
import Fuse from 'fuse.js'

function CountryShowTable(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [countriesData, setCountriesData] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterTxt, setFilterTxt] = useState("");
    const [searchData, setSearchData] = useState(undefined);
   

    useEffect(() => {
        //countries data
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
        console.log(result.data);
        const fuse =  new Fuse(result.data, { includeScore: true, keys:["name.common"]});
        
        setCountriesData(fuse.search(' '));
        setSearchData(fuse);
        setIsLoading(false);
    };

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        console.log(searchData);
        setCountriesData(searchData.search(newValue));
        setFilterTxt(newValue);
        // Do something with the input value...
    };

    let pcListContent = [];
    let mobileListContent = [];
    if(countriesData != undefined && countriesData.length != 0)
    {
        console.log(countriesData)
        for ( var i = (currentPage - 1) * 25 ; i < currentPage * 25 ; i ++ ){
            //get country code
            let countryCode = "";
            if(countriesData[i].item.idd.suffixes != undefined)
                countriesData[i].item.idd.suffixes.map((item)=>{
                    countryCode += countriesData[i].item.idd.root + item;  
                });
            else if(countriesData[i].item.idd.root != undefined)
                countryCode = "+ " + countriesData[i].item.idd.root;
            //to get Native Name
            let officialData = [];
            for (let key in countriesData[i].item.name.nativeName) {
                officialData = (countriesData[i].item.name.nativeName[key]["common"]);
            }
            pcListContent = [...pcListContent, (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600  cursor-pointer">
                    <td className="p-4">
                        <img className="w-10 h-10 rounded-full" src={countriesData[i].item.flags.png} alt={countriesData[i].item.flags.alt}/>
                    </td>
                    <td className="flex flex-col justify-center px-3 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="text-base font-semibold">{countriesData[i].item.name.common}</div>
                        <div className="font-normal text-gray-500">{countriesData[i].item.cca2}</div>
                    </td>
                    <td className="px-3 py-4">
                        {officialData}
                    </td>
                    <td className="px-3 py-4">
                        {countriesData[i].item.name.official}
                    </td>
                    <td className="px-3 py-4 flex">
                        {
                            countryCode
                        }
                    </td>
                </tr>
            )];

            mobileListContent =[...mobileListContent, (
        
                <li class="pb-3 sm:pb-4 transition delay-[40] hover:bg-gray-50 cursor-pointer">
                    <div class="flex items-center space-x-6">
                        <div class="flex-shrink-0">
                        <img className="w-10 h-10 rounded-full" src={countriesData[i].item.flags.png} alt={countriesData[i].item.flags.alt}/>
                        </div>
                        <div class="flex-1 min-w-0">
                            <div className="text-base font-semibold">{countriesData[i].item.name.common}</div>
                            <div className="font-normal text-gray-500">{countriesData[i].item.cca2}</div>
                        </div>
                        <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            {countryCode}
                        </div>
                    </div>
                </li>
       
            )];
        }
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
                        <button className="">Search</button>
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
                    <ul class="w-full divide-y divide-gray-200 dark:divide-gray-700 p-4">
                        {mobileListContent}
                    </ul>
                </div>

                {isLoading?(
                <div className="w-full h-full bg-white flex justify-center items-center absolute top-0 left-0 z-100">
                    <PulseLoader
                    color="#36d7b7"
                    cssOverride={{}}
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





