import React from 'react'
import ArrowDownUp from './../components/arrowDownUp'
import ArrowDown from './../components/arrowDown'
import SearchElement from './searchElement'

const Table = ({sortData, data, onSearchSend}) => {
    return(
        <div>
            <SearchElement onSearchSend = {onSearchSend}/>
            <table className="table">
            <thead style={{cursor:"pointer"}}>
            <tr>
                <th onClick={()=>{sortData('countriesAndTerritories')}}>
                    Country {<ArrowDown/>}</th>
                <th onClick={()=>{sortData('dateRep')}}>
                    Date {<ArrowDownUp/>}</th>
                <th onClick={()=>{sortData('cases')}}>
                    Cases {<ArrowDownUp/>}</th>
                <th onClick={()=>{sortData('deaths')}}>
                    Deaths {<ArrowDownUp/>}</th>
            </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id
                }>
                <td>{item.countriesAndTerritories}</td>
                <td>{item.dateRep}</td>
                <td>{item.cases}</td>
                <td>{item.deaths}</td>
                </tr> ))}
            </tbody>
            </table>
        </div>
    )

}
export default Table