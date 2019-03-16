import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card, Grid, Button } from 'semantic-ui-react';
import medical from '../../ethereum/medical';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class Meetings extends Component{
    static async getInitialProps(props){
        const address = props.query.address;
        //const meetingIds = await medical.methods.getMeetingsIds(address).call();
        const meetingLength = await medical.methods.getMeetingCount().call();
        // const meetingInfo = await medical.methods.getMeetingInfo(0).call();
        
        var meetingArray = []; 
        for(var i=0;i<meetingLength;i++)
        {
            const meetingInfo = await medical.methods.getMeetingInfo(i).call();
            meetingArray.push({ diseases: meetingInfo[0],
                 medicineName: meetingInfo[1],
                  patientAddess:meetingInfo[2],
                  doctorAddress:meetingInfo[3],
                  expense:meetingInfo[4],
                  meetingID:meetingInfo[5],
                  IsDelegatedPatient: meetingInfo[6]});
        }
        return { 
            address: props.query.address,
            meetingArray 
        };
    }

    renderMeetings(){
        // const items = [];

        const items = this.props.meetingArray.map(array => {
            return {
                header: array.meetingID,
                meta: array.diseases,
                description: "Doctor Given " + array.medicineName +" at this cost "+array.expense,
                style: { overflowWrap: 'break-word' }
            };
        });
        return <Card.Group items={items}/>;

    }

    render () {
        return (
            <Layout>
                <div>

                <Grid>
                <Grid.Row>
                        <Grid.Column width={10}>
                        <h1>Patient Meetings with Doctor</h1>
                        </Grid.Column>
                    </Grid.Row>
            
                    <Grid.Row>
                        <Grid.Column width={15}>
                             {this.renderMeetings()}
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/category/${this.props.address}/addform/addmeeting`}>
                                <a>
                                    <Button primary>Add meeting</Button>
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

export default Meetings;