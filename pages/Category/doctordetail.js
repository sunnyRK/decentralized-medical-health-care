import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card, Grid, Button, Form } from 'semantic-ui-react';
import medical from '../../ethereum/medical';
import web3 from '../../ethereum/web3';

class DoctorDetail extends Component{

    static async getInitialProps(props){
        const doctoraddress = props.query.address;
        const accounts = await web3.eth.getAccounts();
        const DoctorRecords = await medical.methods.getDoctorList(doctoraddress,accounts[0]).call();
        alert(DoctorRecords[3]);
        return {
            doctoraddress: props.query.address,
            doctorId: DoctorRecords[0],
            doctorFullName: DoctorRecords[1],
            aadharCardNumber: DoctorRecords[2],
            IsDelegatedPatient: DoctorRecords[3]
        };
    }

    renderDetails()
    {
        const {
            doctorId,
            doctorFullName,
            aadharCardNumber,
        } = this.props;

        const items = [
            {
                header: doctorId,
                meta: "Doctor id of patient",
                description: "Through Doctor id you can track record of health Doctor.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: doctorFullName,
                meta: "Doctor Full name",
                description: "This is the Doctor full name"
            },
            {
                header: aadharCardNumber,
                meta: "Aadharcard Number",
                description: "This is the Aadharcard number of Doctor. Which will be unique to each person."
            }
        ];

        return <Card.Group items={items}/>;
    }

    onDelegate = async (event) => {
        event.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            await medical.methods.delegatePatient(
                this.props.doctoraddress,1234
            ).send({
                from:accounts[0]
            });
            // Router.pushRoute(`/category/${this.props.doctoraddress}/meetings`);
        }catch(err){
        }
    };

    OnRevoke = async (event) => {
        event.preventDefault();
        try{
            const accounts = await web3.eth.getAccounts();
            await medical.methods.RevokedelegatePatient(
                this.props.doctoraddress,1234
            ).send({
                from:accounts[0]
            });
            // Router.pushRoute(`/category/${this.props.doctoraddress}/meetings`);
        }catch(err){
        }
    };

    renderButton(){
        if(this.props.IsDelegatedPatient)
        { 
            return (
                <Form onSubmit={this.OnRevoke}>
                    <Button primary>Revoke</Button>
                </Form>
            );
        }
        else 
        {
            return (
                <Form onSubmit={this.onDelegate}>
                    <Button primary>Accept</Button>
                </Form>
            );
        }
    }

    render () {
        return (
            <Layout>
                <div>
                    <h1>Doctor Full Details</h1>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                {this.renderDetails()}
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column>
                                {this.renderButton()}
                            </Grid.Column>
                        </Grid.Row>

                    </Grid>
                </div>
            </Layout>
        );
    }
}

export default DoctorDetail;