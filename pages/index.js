import React, { Component } from 'react';
import { Card, Button, Form, Input } from 'semantic-ui-react';
import medical from '../ethereum/medical';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
import Layout from '../components/Layout';

class MedicalIndex extends Component{

    state={
        isDoctor: false,
        isPatient: false
    };
    
    onIsDoctor = async (event) => {
        event.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            const isDoctor = await medical.methods.getUserIsDoctor(accounts[0]).call();
            if(isDoctor){
                alert(isDoctor);
                Router.pushRoute(`/category/doctor`);
            }else{
                alert("You are not Doctor");
            }
        }catch(err){
        }
    };

    onIsPatient = async (event) => {
        event.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            const isPatient = await medical.methods.getUserIsPatient(accounts[0]).call();
            if(isPatient){
                alert(isPatient);
                Router.pushRoute(`/category/patients`);
            }else{
                alert("You are not Patient");
            }
        }catch(err){
        }
    };

    render(){
        return (
                <Layout>
                    <div>
                    <h1>Select who you are?</h1>
                    {/* <Link route='/category/doctor'> */}
                        {/* <a> */}
                        <Form onSubmit={this.onIsDoctor}>
                            <Button 
                                content="Press If You Doctor" 
                                icon="add circle" 
                                primary 
                            />
                        </Form>
                        {/* </a> */}
                    {/* </Link> */}
                    <h1>or</h1>
                    {/* <Link route='/category/patients'>
                        <a> */}
                        <Form onSubmit={this.onIsPatient}>
                            <Button 
                                content="Press If You Patient" 
                                icon="add circle" 
                                primary 
                            />
                        </Form>
                        {/* </a>
                    </Link> */}
                    </div>
                </Layout>
        );
    }
}
export default MedicalIndex;