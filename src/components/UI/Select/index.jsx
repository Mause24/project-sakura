import React, { useRef } from 'react'
import '../../../styles/Inputs.css'
import { ArrowDropDown } from '@mui/icons-material';
import { isEmpty } from '../../../utils/object';

const Select = ({ className, name = "", id = "", options = [], defaultOption = "", onChange = () => { }, maxWidth, value = {}, disabled = false }) => {
    return (
        <label style={{ maxWidth: `${maxWidth}px` }} className='select'>
            <select key={`k-${id}`} disabled={disabled} name={name} id={id} className={className} onChange={onChange}>
                {
                    isEmpty(value) ?
                        <>
                            <option value="" >{defaultOption}</option>
                            {options.map(item => <option key={`o-${item.value}`} value={item.value}>{item.label}</option>)}
                        </>
                        :
                        <>
                            <option value={value.value} selected>{value.label}</option>
                            {options.filter(item => item.value !== value.value).map(item => <option key={`o-${item.value}`} value={item.value}>{item.label}</option>)}
                        </>
                }
            </select>
            <ArrowDropDown />
        </label>
    )
}

export default Select