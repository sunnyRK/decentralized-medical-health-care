import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import medical from '../../ethereum/medical';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class Detail extends Component{

    static async getInitialProps(props){
        const address = props.query.address;
        const patientsRecords = await medical.methods.getPatientInfo(address).call();
        console.log(patientsRecords[0] + "record");
        return {
            address: props.query.address,
            patientId: patientsRecords[0],
            patientFullName: patientsRecords[1],
            aadharCardNumber: patientsRecords[2],
            IsPatient: patientsRecords[3],
            passCode: patientsRecords[4],
            IsDelegatedPatient: patientsRecords[5],
            meetingIdArrayLength: patientsRecords[6],
        };
    }

    renderDetails()
    {
        const {
            patientId,
            patientFullName,
            aadharCardNumber,
        } = this.props;

        const items = [
            {
                header: patientId,
                meta: "Patient id of patient",
                description: "Through patient id you can track record of health patient.",
                style: { overflowWrap: 'break-word' }
            },
            {
                header: patientFullName,
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
  
  

    render () {
        return (
            <Layout>
                <div>
                    <h1>Patient's Full Details</h1>
                    
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderDetails()}
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/category/${this.props.address}/meetings`}>
                                <a>
                                    <Button primary>View Past Meetings</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
                </div>
            </Layout>
        );
    }
}

export default Detail;