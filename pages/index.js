import React, { Component } from 'react';
import { Card, Button, Form, Input } from 'semantic-ui-react';
import medical from '../ethereum/medical';
import web3 from '../ethereum/web3';
// import Layout from '../components/Layout';
import { Link } from '../routes';

class CampaignIndex extends Component{

    state = {
        idchange: ''
    };

    static async getInitialProps(){
        const id = await medical.methods.getID().call();
        return { id };
    }

    
    onSubmit = async event => {
        console.log("ss");
        event.preventDefault();

        try{
            const accounts = await web3.eth.getAccounts();
            await medical.methods.setId(this.state.idchange).send({
                from: accounts[0]
            });

            Router.pushRoute('/');
        }catch(err){
            
        }
    };

    render(){
        return (
                <Form onSubmit={this.onSubmit}>
                
                    {/* <Form.Field>
                        
                        <Input label="wei" labelPosition="right" value={ this.state.idchange }
                            onChange = { event => this.setState({ idchange:event.target.value }) }
                        />
                    </Form.Field> */}

                    <Link route='/campaigns/new'>
                        <a>
                            <Button 
                                floated="right" 
                                content="Create Campaign" 
                                icon="add circle" 
                                primary 
                            />
                        </a>
                    </Link>
                
                    <Button primary>set!</Button>
                </Form>
        );
    }
}
export default CampaignIndex;