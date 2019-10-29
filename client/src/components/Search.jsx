// Imports
import React, { Component } from 'react';
//Import React Script Libraray to load Google object
import Script from 'react-load-script';
import { Form, Input } from 'antd';


class Search extends Component {
  
  // Define Constructor
  constructor(props) {
    super(props);

    // Declare State
    this.state = {
      city: '',
      query: ''
    };

    this.handleScriptLoad = this.handleScriptLoad.bind(this);
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleScriptLoad() {
    const options = { types: ['(cities)'] };

    /*global google*/
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), options);

    this.autocomplete.setFields(['address_components', 'geometry', 'formatted_address']);
    
    this.autocomplete.setComponentRestrictions({'country': ['us', 'ca']});
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect() {
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    // debugger
    console.log(addressObject);
    let lat = addressObject.geometry.location.lat();
    let long = addressObject.geometry.location.lng();
    this.props.setPlace(lat, long);

    if (address) {
        this.setState({ 
            city: address[0].long_name,
            query: addressObject.formatted_address
        });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div style={{ display: "inline" }}>
        <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyDXUfh33aw2G1mkGsGcNkw8iFgasKeWzwQ&libraries=places"          
            onLoad={this.handleScriptLoad} />
        <Form.Item>
        <Input 
            value={this.state.query}
            id="autocomplete"
            onChange={e => this.setState({ query: e.target.value })}
            className="Searchinput"
            placeholder="City"
            ref={(input) => {this.nameInput = input;}}
        />
        </Form.Item>
      </div>
    );
  }
}

export default Search;