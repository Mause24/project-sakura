import React from 'react'
import '../../../styles/Table.css'

const DataTable = ({ headers = [], data = [] }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    {
                        headers.map((item, index) => <th key={`th-${index}`}  id={item.value} itemID={item.value} headers={item.value} >{item.label}</th>)
                    }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => (
                        <tr key={`row-${index}`} >
                            {
                                Object.entries(item).sort().map((val, i) =>
                                    <td key={`${index}-${i}`} id={val[0]} >{val[1]}</td>
                                )
                            }
                        </tr>
                    )
                    )
                }
            </tbody>
        </table>
    )
}

export default DataTable