import React, { useState, useEffect, useRef } from 'react';

function CountryShowModal(props) {
    const [curShowData, setCurShowData] = useState();
    useEffect(()=>{
        console.log(props.curShowData);
        setCurShowData(props.curShowData);
    })
    let modalContent = [];
    if(curShowData!=undefined)
    {
        modalContent = (
        <div className='w-full '>
            <div className='w-full flex justify-end'>
                Close
            </div>
            <div className='flex space-x-4 items-center py-3'>
                <img className='w-16 h-10  border-[1px]' src={curShowData.flags.png} alt={curShowData.flags.alt}></img>
                <div className='text-xl font-bold'>{curShowData.name.common}</div>
            </div>
            <div className='grid grid-cols-4 py-3 border-t-2 border-b-black'>
                <div className='col-span-2 px-4'>Region:</div>
                <div className='col-span-2 px-4'>{curShowData.region!=undefined?curShowData.region:("")}</div>
            </div>
            <div className='grid grid-cols-4 py-3 border-t-[1px] border-b-gray-400'>
                <div className='col-span-2 px-4'>Area:</div>
                <div className='col-span-2 px-4'>{curShowData.area!=undefined?curShowData.area.toLocaleString():("")} Km<sup>2</sup> </div>
            </div>
            <div className='grid grid-cols-4 py-3 border-t-[1px] border-b-gray-400'>
                <div className='col-span-2 px-4'>Population:</div>
                <div className='col-span-2 px-4'>{curShowData.population!=undefined?curShowData.population.toLocaleString():("")}</div>
            </div>
            <div className='grid grid-cols-4 py-3 border-t-[1px] border-b-gray-400'>
                <div className='col-span-2 px-4'>TimeZones:</div>
                <div className='col-span-2 px-4'>{curShowData.timezones!=undefined?curShowData.timezones[0]:("")}</div>
            </div>
            <div className='grid grid-cols-4 py-3 border-t-[1px] border-b-gray-400'>
                <div className='col-span-2 px-4'>Capital City:</div>
                <div className='col-span-2 px-4'>{curShowData.capital!=undefined?curShowData.capital.map((item)=>(item + " ")):("")}</div>
            </div>
        </div>);
    }
    return (
        <div className="rounded-none md:rounded-xl w-full md:w-[400px] lg:w-[500px] h-[500px] bottom-0 absolute md:h-[400px] md:relative bg-white fadeshow px-2 md:px-10 py-4 z-[101]">
            {modalContent}
        </div>
    );
  }
  
  export default CountryShowModal;






