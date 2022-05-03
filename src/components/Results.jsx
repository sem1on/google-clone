import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import { useResultContext } from '../contexts/ResultContextProvider';

import Loading from './Loading';


const Results = () => {
    const { getResults, isLoading, searchTerm, results } = useResultContext();
    const location = useLocation();

    useEffect(() => {
        if(searchTerm) {
            getResults(`${location.pathname}/q=${searchTerm}&num=40`)
        }
    }, [searchTerm, location.pathname]);

    if(isLoading) return <Loading/>;

    switch (location.pathname) {
        case '/search':
            return (
                <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
                    {results?.map((res, index) => (
                        <div key={index} className='md:w-2/5 w-full'>
                            <a href={res.link} target='_blank' rel='noreferrer'>
                                <p className='text-sm'>
                                    {res.link.lenght > 30 ? res.link.substring(0, 30) : res.link}
                                </p>
                                <p className='text-lg hover:underline dark:text-blue-300 text-blue-700'>
                                    {res.title}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            )
        case '/image':
            return (
                <div className='flex flex-wrap justify-center items-center'>
                    {results?.map((res, index) => (
                        <a className='sm:p-3 p-5' href={res.link?.href} key={index} target='_blank' rel='noreferrer'>
                            <img src={res.image?.src} alt={res.link.title} loading='lazy' />
                            <p className='w-36 break-words text-sm mt-2'>
                                {res.link.title}
                            </p>
                        </a>
                    ))}

                </div>
            )    
        case '/news':
            return (
                <div className='flex flex-wrap justify-between space-y-6 sm:px-56 items-center'>
                    {results?.map((news) => (
                        <div key={news?.id} className='md:w-2/5 w-full'>
                            <a href={news?.link} target='_blank' rel='noreferrer' className='hover:underline'>
                                <p className='text-lg dark:text-blue-300 text-blue-700'>
                                    {news?.title}
                                </p>
                            </a>
                            <div className='flex gap-4'>
                                <a href={news?.source?.href} target='_blank' rel='noreferrer'>
                                    {news?.source?.href}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )  
        case '/video':
            return (
                <div className='flex flex-wrap'>
                    {results.map((video, index) => (
                        <div key={index} className='p-2'>
                            {video?.link && <ReactPlayer url={video?.link} controls width='355px' height='200px'/>}
                        </div>
                    ))}
                </div>
            )                  
        default:
            break;
    }
};

export default Results;