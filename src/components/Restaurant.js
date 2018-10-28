import React, {Component} from 'react'

function Restaurant(props) {
    return (
        <tr>  
            <th scope="row">{props.index}</th>
            <td>{props.name}</td>
            <td>{props.cuisine}</td>
            <td>
                <button>Modifier</button>
                <button>Supprimer</button>
            </td>
        </tr>
        );
}

export default Restaurant