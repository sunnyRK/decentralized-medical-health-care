import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Input } from 'semantic-ui-react';
import medical from '../../../ethereum/medical';
import web3 from '../../../ethereum/web3';
import { Link } from '../../../routes';

class Addmeeting extends Component{
     static async getInitialProps(props){
        const address = props.query.address;
        return {address};
    }

    state = {
        expense: 0,
        diseases: '',
        medicineName: ''
    };
    
    onSubmit = async (event) => {
        event.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            await medical.methods.AddPatientMeetingInfo(
                this.props.address,
                this.state.diseases,
                this.state.expense,
                this.state.medicineName
            ).send({
                from:accounts[0]
            });
            alert("Meeting Added");
            // Router.pushRoute(`/category/${this.props.address}/meetings`);
        }catch(err){
        }
    };

    render(){
        return(
            <Layout>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <Input 
                            value={this.state.diseases}
                            onChange={event => this.setState({
                                diseases: event.target.value
                            })}
                            label="Diseases" labelPosition="right"/>
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            value={this.state.medicineName}
                            onChange={event => this.setState({
                                medicineName: event.target.value
                            })}
                            label="Medicine Name" labelPosition="right"/>
                    </Form.Field>

                    <Form.Field>
                        <Input 
                            value={this.state.expense}
                            onChange={event => this.setState({
                                expense: event.target.value
                            })}
                            label="Treatment cost" labelPosition="right"/>
                    </Form.Field>
                    <Button primary>
                        Add Meeting!
                    </Button>
                </Form>
                </Layout>
        );
    }
}

export default Addmeeting;