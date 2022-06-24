import React from 'react'
import '../../../styles/Inputs.css'

const Input = (props) => {
    return (
        <input
            id={props.id}
            className={props.className}
            type={props.type}
            value={props.value}
            onChange={props.onChange}
            {...props}
        />
        





  )
}

export default Input;