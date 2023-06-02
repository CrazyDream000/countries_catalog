import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

function Pagination(props) {

  const [curPage, setCurPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const prevProps = useRef(props);

  useEffect(()=>{
    console.log(props);
    setCurPage(props.curPage);
    setTotalPage(props.totalPage);
  })
  let pagiContent = [];
  let isSkiped = false;
  const pageNumbers = [...Array(totalPage + 1).keys()].slice(1)
  pageNumbers.map((pageNumber) => {
    if(pageNumber == curPage)
    {
        isSkiped = false;
        pagiContent = [...pagiContent, (<div className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600  cursor-pointer" onClick={()=>props.setCurPage(pageNumber)}>{pageNumber}</div>)];
        }
        else if(pageNumber == 1 || pageNumber == totalPage || (pageNumber >= curPage - 1 && pageNumber <= curPage + 1)){
        pagiContent = [...pagiContent, (<div className="relative items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 inline-flex cursor-pointer" onClick={()=>props.setCurPage(pageNumber)}>{pageNumber}</div>)];
        }
        else{
        if(!isSkiped)
            pagiContent = [...pagiContent, (<span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>)];
        isSkiped = true;
    }
  });
    
  return (
    <div className="flex justify-center items-center w-full border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div className=' w-full'>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <div className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer"  onClick={()=>{curPage>1?props.setCurPage(curPage - 1):props.setCurPage(curPage)}}>
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            {pagiContent}
            <div className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 cursor-pointer" onClick={()=>{curPage<totalPage?props.setCurPage(curPage + 1):props.setCurPage(curPage)}}>
              <span className="sr-only">Previous</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
