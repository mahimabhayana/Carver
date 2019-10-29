import React, { Component } from 'react';
// import Button from 'antd/es/button';
import '../App.css';
import axios from 'axios';
import { Layout, Menu, List, Carousel } from 'antd';

const { Header, Content, Sider } = Layout;


class Results extends Component {

  constructor(props) {
      super(props);
      this.state = { response: '' };
  }

  componentDidMount() {
    const {
      location
    } = this.props;

    const params = JSON.parse('{"' + decodeURI(location.search.substr(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');

    axios.get('/search', {
        params: params
      })
      .then(res => {
          const data = res.data;
          this.setState({
            response: JSON.parse(data.body),
            msg: JSON.stringify(data) 
        });
      });
  }
 
  render() {
    const { response } = this.state;

    let averagePrice = response ? 
        response.listings.reduce((prev, curr) => { 
            if (curr.hasOwnProperty("price")) { return prev + curr.price }
            if (curr.hasOwnProperty("ref_price")) { return prev + curr.ref_price }
            return prev;
        }, 0) : 0;

    const CarouselImages = ({ item }) => (
    <Carousel style={{ height: "205px", width: "272px" }}>
        {item.media.photo_links.map(url => <img className="carousel-image" src={url} key={item.id} alt=""></img>)}
    </Carousel>
    );

    const Description = ({ item }) => (
    <div>
        <h2 className="price">${item.price}</h2>
        <div className="result-descr">
        <p><b>Make</b>: {item.build.make} <b>Model</b>: {item.build.model} <b>Year</b>: {item.build.year}</p>
        <p><b>Transmission</b>: {item.build.transmission}</p>
        <p><b>Miles</b>: {item.miles || item.ref_miles || "N/A"}</p>
        <p><b>Used/New</b>: {item.inventory_type}</p>
        <p><b>Dealer</b>: <a href={item.dealer.website}>{item.dealer.name}</a></p>
        </div>
    </div>
    );

    return (
        <Layout style={{ height: "100vh" }}>
            <Header id="results-header">
              <div className="logo">
                <img src="https://github.com/mahimabhayana/mahimabhayana.github.io/blob/master/images/Carver.png?raw=true" style={{ width: "70px" }} alt="" />
              </div>
            </Header>
            <Layout>
                <Sider
                    breakpoint="lg"
                    theme="light"
                    collapsedWidth="0">
                    <Menu theme="light" mode="inline">
                        <Menu.Item key="1">
                        <span className="nav-text">Filters</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                        <span className="nav-text">Would</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                        <span className="nav-text">Go</span>
                        </Menu.Item>
                        <Menu.Item key="4">
                        <span className="nav-text">Here</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <h2 style={{ marginTop: "20px" }}>Results</h2>
                    { averagePrice ? <h3>Average Price: ${averagePrice}</h3> : null}
                    <Content style={{ margin: '15px 16px 0' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: 360, textAlign: "left" }}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                            pageSize: 5,
                            }}
                            dataSource={response ? response.listings : response}
                            renderItem={item => (
                            <List.Item
                                key={item.vin}
                                extra={<List.Item.Meta
                                    title={<a className="car-header" style={{ textTransform: "uppercase", fontSize: "26px" }} href={item.vdp_url}>{item.heading}</a>}
                                    description={<Description item={item} />} />}>
                                <div>{
                                    item.media.photo_links.length ? (<CarouselImages item={item} />) : <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
                                </div>  
                            </List.Item>
                            )}/>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
  }
}

export default Results;