import React from 'react'
import './IndexBox.css'
import { Link } from 'react-router-dom'
export default function IndexBox({title , href}) {
  return (
    
        <Link to={href} className='col-4 main-link'>{title}</Link>
  )
}
