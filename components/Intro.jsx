import React, { useEffect, useState } from 'react'
import { BiSearchAlt } from 'react-icons/bi'
import Image from 'next/image'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { useSelector } from 'react-redux';
import JobsCard from './JobsCard';

export default function Intro() {
  const [search, setSearch] = useState('');
  const jobData = useSelector(state => state.Job.JobData);
  const [filterJobs, setFilteredJobs] = useState([])
  const [doneSearch , setDoneSearch] = useState(false)




  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = search?.toLowerCase().trim();
    
    // Advanced filtering: partial match, case-insensitive, and searching across multiple fields
    const filteredJobs = jobData?.filter((job) => {
      let jobCategory = job?.job_category?.toLowerCase();
      let jobTitle = job?.job_title?.toLowerCase();
      let companyName = job?.company_name?.toLowerCase();
  
      // Use regex for partial matching
      const regex = new RegExp(searchQuery, 'i');
      
      return (
        regex.test(jobCategory) || 
        regex.test(jobTitle) || 
        regex.test(companyName)
      );
    });

    console.log(filteredJobs);
    
    setFilteredJobs(filteredJobs);
    setDoneSearch(true);
  };
  

  return (
    <>
      <div className='w-full  h-full flex items-center lg:justify-start py-24 justify-center flex-wrap  '>
        <div className='lg:w-3/6 w-full sm:p-2 h-full my-2 flex items-center justify-center px-4 md:items-start md:justify-start md:p-20 flex-col '>
          <h1 className='md:text-6xl text-2xl sm:text-2xl font-extrabold mb-4 text-black '>To get <span className='text-indigo-600'>Dream Jobs.</span> </h1>
          <p className='md:text-lg sm:text-sm text-xs mb-20 text-gray-400'>3025 Peoples are daily search in this portal, 112 user added job portal!</p>
          <div className='bg-white flex-col mb-6 w-full md:px-4   py-4 flex sm:flex-row items-center justify-center rounded-xl'>
            <BiSearchAlt className='text-2xl text-indigo-600 mx-2 hidden sm:flex' />
            <form action="" className='flex w-full'>
            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Jobs with Job categories like marketing ...' className='xs:w-full w-3/4  h-full px-2 bg-gray-200 text-base py-3 outline-none' />
            <button onClick={handleSearch} className='px-3 py-2 my-2 sm:my-0 border border-indigo-600 rounded uppercase tracking-widest mx-4   text-white bg-indigo-600 transition-all duration-700 hover:bg-transparent font-semibold text-base hover:text-indigo-600'>Search</button>
            </form>
          </div>
          <div className=' w-full px-2 py-2 flex items-center justify-start flex-wrap'>
            <div className='flex items-center justify-center'>
              <BsFillBookmarkFill className='text-indigo-600 text-xl mx-2' />
              <h1 className='font-semibold text-lg'>Suggest Tag : </h1>
            </div>
            <div className='flex   items-center justify-center px-4 flex-wrap'>
              <p className='px-2  text-gray-600'>Software</p>
              <p className='px-2  text-gray-600'>Marketing</p>
              <p className='px-2  text-gray-600'>UI/UX Design</p>
            </div>
          </div>
        </div>
        <div className='w-3/6 my-2 h-full bg-gray-200 hidden items-center justify-center flex-col p-20 lg:flex'>
          <Image width={600} height={700} src="/intro1.png" alt="no-image-found" />
        </div>
      </div>
      {
        doneSearch && (
          <div className='w-full flex flex-wrap items-center justify-center py-2 px-2'>
            {
              Array.isArray(filterJobs) && filterJobs.length > 0 ? filterJobs?.map((job) => {
                return (
                  <JobsCard job={job} key={job?._id} />
                )
              }) : <p className='text-sm text-center font-semibold  text-red-500'>Sorry No such Categories Job Available Right Now</p>
            }
          </div>
        )
      }
    </>
  )
}


