import React, {Component} from 'react'
import Restaurant from './components/Restaurant'

class RestaurantsCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        }
    }

    componentWillMount() {
        console.log('Component will mount');
        this.getDataFromServer();
    }

    componentWillUnmount() {

    }

    removeRestaurant(restaurantName) {
        console.log('Removing the restaurant' + restaurantName);
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

    removeRestaurant() {
        
    }

    render() {
        
        console.log('Render');
        let list = this.state.restaurants.map(
            (el) => {
                return <li>{el.name}</li>
            }
        );
        
        let restos =
            this.state.restaurants.map((el, index) => {
                return <Restaurant
                    name={el.name}
                    key={index}
                    index={index}
                    cuisine={el.cuisine}
                    removeRestaurant = {this.removeRestaurant.bind(this)}
                    />
            });

        return (
            <div className="App">
                
                <div class="container">

                    <div class="row">
                            <h3>Liste des restaurants : </h3>
                    </div>                
                    <div class="row">
                        <button>Add Restaurant</button>
                    </div>
                    <div class="row">
                        <div class="col-sm-8">
                            <div class="row">
                                <input
                                    type="text"
                                    ref={(input) => {this.input = input}}
                                    />
                            </div>            
                            <div class="row">
                                <table class="table col-sm-8">

                                    <thead class="black white-text">
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Cuisine</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {restos}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            This is the form for adding a new restaurant.
                        </div>
                    </div>
                </div>

            </div>
        );
    }
} 

export default RestaurantsCatalog;