import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import medical from '../../ethereum/medical';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class DoctorDetail extends Component{

    static async getInitialProps(props){
        const patientaddress = props.query.address;
        const accounts = await web3.eth.getAccounts();
        console.log(accounts[0]+ " "+patientaddress);
        const DoctorRecords = await medical.methods.getDoctorList(accounts[0],patientaddress).call();
        console.log(DoctorRecords[3] + "record");
        return {
            patientaddress: props.query.address,
            doctorId: DoctorRecords[0],
            doctorFullName: DoctorRecords[1],
            aadharCardNumber: DoctorRecords[2],
            IsDelegatedPatient: true
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
                meta: "Patient id of patient",
                description: "Through patient id you can track record of health patient.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: doctorFullName,
                meta: "Patient Full name",
                description: "This is the patient full name"
            },
            {
                header: aadharCardNumber,
                meta: "Aadharcard Number",
                description: "This is the Aadharcard number of patient. Which will be unique to each person."
            }
        ];

        return <Card.Group items={items}/>;
    }
  
    ButtoSet() {
        const {
            IsDelegatedPatient
        } = this.props;

        if (true) {
          return (
            <div>
              <Button primary>Revoke</Button>
            </div>
          );
        } else {
          return (
            <div>
              <Button primary>Grant</Button>
            </div>
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
                            {this.ButtoSet()}
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                </div>
            </Layout>
        );
    }
}

export default DoctorDetail;