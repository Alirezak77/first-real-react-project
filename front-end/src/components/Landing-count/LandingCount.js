import React from 'react'
import { useState , useEffect } from 'react'

export default function LandingCount({number}) {
    const [numberCounter , setNumberCounter]= useState(0)
    useEffect(()=>{
        let interval = setInterval(()=>{
            setNumberCounter(prevNumber=> prevNumber + 1)
        }, 1)

        if (numberCounter === number){
            clearInterval(interval)

        }

        return ()=> clearInterval(interval)
    }, [numberCounter])
  return (
    <span className='landing-status_count'>{numberCounter}</span>
  )
}
