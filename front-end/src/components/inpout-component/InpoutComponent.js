import React, { useEffect, useReducer } from 'react'
import './InpoutComponent.css'
import validator from '../../validators/validator'



const validation= (state , action)=>{
    switch (action.type) {
        case 'CHANGE' :{
            return {
                ...state ,
                value :action.value,
                isValid: validator(action.value , action.validations)
            }
        }
        default:
            return state
    }
}


export default function InpoutComponent(props) {

    const [mainInput , dispatch]= useReducer(validation ,{
        value:'',
        isValid: false
    })

    const {value , isValid}= mainInput
    const { id }= props
    useEffect(()=>{
        props.onInputHandler(id , value, isValid)
    }, [value])



    const onChangeInout = (event)=>{
        
        dispatch({
            type : 'CHANGE',
            value : event.target.value,
            validations : props.validations,
            isValid : true
            
            
        }
        )
        
    }


    const element = props.element === 'input' ? (
        <input
         type={props.type}
         placeholder={props.placeholder}
        className={`${props.className} ${mainInput.isValid ? 'success' : 'error'}`}
        onChange={onChangeInout}
        value={mainInput.value}
        ></input>

    ): (
        <textarea
         className={props.className} 
         placeholder={props.placeholder}
         onChange={onChangeInout}  
         value={mainInput.value} 
         ></textarea>
    )



  return (
    <div>
        {element}

    </div>
  )
}
