import React, {Component} from 'react'

function Restaurant(props) {
    return (
        <tr>  
            <th scope="row">{props.index}</th>
            <td>{props.name}</td>
            <td>{props.cuisine}</td>
        </tr>
        );
}

export default Restaurant