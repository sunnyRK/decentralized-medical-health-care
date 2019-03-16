import React, { Component } from 'react';
import { Card, Button, Form, Input } from 'semantic-ui-react';
import medical from '../ethereum/medical';
import web3 from '../ethereum/web3';
import { Link } from '../routes';
import Layout from '../components/Layout';

class MedicalIndex extends Component{
    render(){
        return (
                <Layout>
                    <div>
                    <h1>Select who you are?</h1>
                    <Link route='/category/doctor'>
                        <a>
                            <Button 
                                content="Press If You Doctor" 
                                icon="add circle" 
                                primary 
                            />
                        </a>
                    </Link>
                    <h1>or</h1>
                    <Link route='/category/patients'>
                        <a>
                            <Button 
                                content="Press If You Patient" 
                                icon="add circle" 
                                primary 
                            />
                        </a>
                    </Link>
                    </div>
                </Layout>
        );
    }
}
export default MedicalIndex;