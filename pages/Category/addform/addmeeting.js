import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Input } from 'semantic-ui-react';
import medical from '../../../ethereum/medical';
import web3 from '../../../ethereum/web3';
import { Link } from '../../../routes';

class Addmeeting extends Component{
    //  static async getInitialProps(props){
    //     // this.onSubmit = this.onSubmit.bind(this);
    //     const address = props.query.address;
    //     return {address};
    // }

    // state = {
    //     expense: 0,
    //     diseases: '',
    //     medicineName: ''
    // };
    onSubmit = async event => {
        event.preventDefault();

        console.log("sunny");
        try{
            const accounts = await web3.eth.getAccounts();
            await medical.methods.AddPatientMeetingInfo(
                this.props.address
            ).send({
                from:accounts[0]
            });
            // Router.pushRoute(`/category/${this.props.address}/meetings`);
        }catch(err){
        }

    };

    render(){
        return(
            <Layout>
                <div>

                <h1>Add New Meeting with patient</h1>
                <Form onSubmit={this.onSubmit}>
                    <Button primary>
                        Add Meeting!
                    </Button>
                </Form>
            
            </div>
            </Layout>
        );
    }
}

export default Addmeeting;