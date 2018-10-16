import React, {Component} from 'react'

class RestaurantsCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: ['McDonalds', 'Kfc']
        }
    }

    componentWillMount() {
        console.log('Component will mount');
        this.getDataFromServer();
    }

    componentWillUnmount() {

    }

    getDataFromServer() {
        console.log('--- GETTING DATA ---');
        fetch('http://localhost:8080/api/restaurants')
            .then(response => {
                return response.json();
            })
            .then(data => {
                let restaurants = [];
                data.data.forEach((e1) => {
                    restaurants.push(e1);
                }); 
                
                this.setState({
                    restaurants: restaurants
                });

                console.log('Restaurants fetched successfully: ' + restaurants);
            })
            .catch(err => {
                console.log('Error getting the restaurants: ' + err);                
            });
    }

    render() {
        
        console.log('Render');
        let list = this.state.restaurants.map(
            (el) => {
                return <li>{el.name}</li>
            }
        );
        
        return (
            <div className="App">
                <h3>Liste des restaurants: </h3>
                <input
                    type="text"
                    ref={(input) => {this.input = input}}
                />
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
} 

export default RestaurantsCatalog;