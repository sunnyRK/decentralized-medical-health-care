import React, { Component } from 'react';
import { Menu, Form, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import medical from '../ethereum/medical';
import web3 from '../ethereum/web3';

class Header extends Component{
    
    onAddPatient = async (event) => {
        event.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            // alert(accounts[0]);
            await medical.methods.AddNewPatient().send({
                from: accounts[0]
            });
            alert("You registered as a Patient");
        }catch(err){
            alert("You are already Patient");
            // alert(err);
        }
    };

    onAddDoctor = async (event) => {
        event.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            // alert(accounts[0]);
            await medical.methods.AddNewDoctor().send({
                from: accounts[0]
            });
            alert("You registered as a Doctor");
        }catch(err){
            // alert(err);
            alert("You are already Doctor");
        }
    };

    render () {
        return (
            <Menu style={{ marginTop : '10px'}}>
                <Link route='/'>
                    <a className='item'>Medical Health Care</a>
                </Link>
                <Menu.Menu position="right">
                    <Form onSubmit={this.onAddDoctor}>
                        <Button primary style={{ marginTop : '2px', color:"#fff"}}>
                            Become Doctor
                        </Button>
                    </Form>
                    <Form onSubmit={this.onAddPatient}>
                        <Button primary style={{ marginTop : '2px', color:"#fff"}}>
                            Become Patient
                        </Button>
                    </Form>
                </Menu.Menu>
            </Menu>
        );
    };
}

export default Header;