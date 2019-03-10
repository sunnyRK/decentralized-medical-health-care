import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card } from 'semantic-ui-react';
import medical from '../../ethereum/medical';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class Patients extends Component{

    static async getInitialProps(){
        const doctoraddressArray = await medical.methods.getDoctorAddressArray().call();
        return { doctoraddressArray };
    }

    renderList()
    {
        const items = this.props.doctoraddressArray.map(address => {
            return {
                header: address,
                description: (<Link route={`/category/${address}/doctordetail`}><a>View Doctor Detail</a></Link>),                   
                fluid: true
            };
        });
        return <Card.Group items={items}/>;
    }

    render () {
        return (
            <Layout>
                <div>
                <h1>Doctor List</h1>
                    {this.renderList()}
                </div>
            </Layout>
        );
    }
}
export default Patients;