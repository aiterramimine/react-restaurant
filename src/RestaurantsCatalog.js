import React, {Component} from 'react'
import Restaurant from './components/Restaurant'

class RestaurantsCatalog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            restaurants: []
        }
        this.handleFetchPage = this.handleFetchPage.bind(this);
        this.handleFetchRestaurantByName = this.handleFetchRestaurantByName.bind(this);
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

    getDataFromServer(page, name) {
        console.log('--- GETTING DATA ---');
        fetch('http://localhost:8080/api/restaurants?page=' + page + (name ? '&name=' + name : ''))
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

    removeRestaurant(id) {
        console.log('Removing restaurant of id: ' + id);
        fetch('http://localhost:8080/api/restaurants/' + id, {
            method: 'DELETE'
        }).then(res => {
            this.getDataFromServer();
        });
    }

    handleAddRestaurant(event) {
        event.preventDefault();

        const data = new FormData(event.target);
        fetch('http://localhost:8080/api/restaurants', {
            method: 'POST',
            body: data
        });

    }

    handleFetchPage(event) {
        if(event.which == 13) {
            let num = document.querySelector('#page-number').value;
            this.getDataFromServer(num)
        }
    }

    handleFetchRestaurantByName(event) {
            let name = document.querySelector("#restaurant-name").value;
            this.getDataFromServer(null, name);
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
                    id={el._id}
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
                        <div class="col-sm-8">
                            <div class="row">
                                <label>Recherchez les restaurants par nom pas besoin d'appuier sur entrer: </label>
                            </div>
                            <div class="row">
                                <input
                                    type="text"
                                    id="restaurant-name"
                                    onKeyUp={this.handleFetchRestaurantByName}
                                    />
                            </div>
                                
                            <div class="row">
                                <table class="table col-sm-8">

                                    <thead class="black white-text">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Cuisine</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {restos}
                                    </tbody>

                                </table>
                            </div>
                        </div>

                        <div class="col-sm-4">
                            <form >
                                <div class="from-group">
                                    <form onSubmit={this.handleAddRestaurant}>
                                        <input id="nom" name="nom" type="text" placeholder="Amine's restaurant" />
                                        <input id="cuisine" name="cuisine" type="text" placeholder="Amine's cuisine" />
                                        <br/>
                                        <button>Créer restaurant</button>
                                    </form>
                                </div>
                            </form>
                        </div>
                    </div>
                    <label>Veuillez entrer le numéro de la page puis appuiez sur entrer: </label><br/>
                    <input id="page-number" type="number" onKeyPress={this.handleFetchPage}></input>
                </div>

            </div>
        );
    }
} 

export default RestaurantsCatalog;