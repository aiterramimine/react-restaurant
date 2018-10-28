import React, {Component} from 'react'

function Restaurant(props) {
    return (
        <tr>  
            <td>{props.name}</td>
            <td>{props.cuisine}</td>
            <td>
                <button onClick={() => props.removeRestaurant(props.id)}>Supprimer</button>
            </td>
        </tr>
        );
}

export default Restaurant