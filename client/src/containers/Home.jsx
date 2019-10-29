import React, { Component } from 'react';
import '../App.css';
import Search from '../components/Search';
import { Redirect } from "react-router-dom";
import { Form, Input, Button, Layout, Typography } from 'antd';

const { Header } = Layout;
const { Title } = Typography;


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      manufacturer: '',
      model: '',
      year: '',
      latitude: '',
      longitude: '',
      radius: 10,
      submit: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({ submit: true });
  }

  handlePlace = (lat, long) => {
    this.setState({ latitude: lat, longitude: long });
  }

  render() {

    const {
      manufacturer,
      model,
      year,
      submit
    } = this.state;

    var queryString = Object.keys(this.state).map(key => key + '=' + this.state[key]).join('&');

    return (
      <div className="home">
        <Layout style={{ backgroundColor: "rgba(0, 0, 0, 0)" }}>
          <Header className="carver-header">
            <div className="logo">
              <img src="https://github.com/mahimabhayana/mahimabhayana.github.io/blob/master/images/Carver.png?raw=true" 
                alt="" style={{ width: "100px" }} />
            </div>
          </Header>
          
          <div id="home-body">
            <Title id="home-title">Find your next car with Carver.</Title>
            <Form layout="inline">
              <Form.Item>
                <Input 
                  name="manufacturer"
                  placeholder="Make"
                  type="text"
                  value={manufacturer}
                  onChange={this.handleInputChange} />
              </Form.Item>

              <Form.Item>
                <Input 
                  name="model"
                  placeholder="Model"
                  type="text"
                  value={model}
                  onChange={this.handleInputChange} />
                </Form.Item>

              <Form.Item>
                <Input 
                  name="year"
                  placeholder="Year"
                  type="number"
                  value={year}
                  onChange={this.handleInputChange} />
                </Form.Item>

              <Search setPlace={this.handlePlace}/>
              <Button onClick={this.handleSubmit}>Search</Button>
            </Form>
            { submit ? <Redirect to={`/results?${queryString}`} /> : <p></p>}
        </div>
      </Layout>
    </div>
    );
  }
}

export default Home;