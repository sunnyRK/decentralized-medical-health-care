import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card } from 'semantic-ui-react';
import medical from '../../ethereum/medical';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class Doctor extends Component{

    static async getInitialProps(){
        const patientAddresArray = await medical.methods.getPatientAddressArray().call();
        return { patientAddresArray };
    }

    renderList()
    {
        const items = this.props.patientAddresArray.map(address => {
            return {
                header: address,
                description: (<Link route={`/category/${address}`}><a>View Patient Detail</a></Link>),                   
                fluid: true
            };
        });
        return <Card.Group items={items}/>;
    }

    render () {
        return (
            <Layout>
                <div>
                    <h1>Doctor's Patient list</h1>
                    {this.renderList()}
                </div>
            </Layout>
        );
    }
}
export default Doctor;