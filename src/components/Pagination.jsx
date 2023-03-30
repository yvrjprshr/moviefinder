import React, {useState} from 'react'

function Pagination(props) {
  let {page, next, prev} = props;
  console.log("props",typeof(props) === 'object'&&Array.isArray(props)===false);
  return (
    <div className='flex justify-center my-4'>
        <div onClick={prev} className='cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>Previous</div>
        <div className=' text-center font-bold py-2 px-4'>{page}</div>
        <div onClick={next} className='cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded'>Next</div>
    </div>
  )
}

export default Pagination
