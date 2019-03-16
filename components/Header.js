import React, { Component } from 'react';
import { Menu, Form, Button } from 'semantic-ui-react';
import { Link } from '../routes';
import medical from '../ethereum/medical';
import web3 from '../ethereum/web3';

class Header extends Component{

    onAddPatient = async (event) => {
        event.preventDefault();
        alert("")
        try{
            const accounts = await web3.eth.getAccounts();
            await medical.methods.AddNewPatient().send({
                from:accounts[0]
            });
        }catch(err){
            alert("You are already patient");
        }
    };

    onAddDoctor = async (event) => {
        event.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            await medical.methods.AddNewDoctor().send({
                from:accounts[0]
            });
        }catch(err){
            alert("You are already doctor");
        }
    };


// export default () => {

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
                    {/* <Link route='/'> */}
                        {/* <a className='item'>Add Doctor</a>
                    </Link> */}
                    {/* <Link route='/campaigns/new'> */}
                    
                        {/* <a className='item'>Add Patient</a>
                    </Link> */}
                </Menu.Menu>
            </Menu>
        );
    };
}

export default Header;