import React, { Component } from 'react';
import Layout from '../../components/Layout';
import { Card } from 'semantic-ui-react';
import medical from '../../ethereum/medical';
import web3 from '../../ethereum/web3';
import { Link } from '../../routes';

class Doctor extends Component{

    static async getInitialProps(){
        const accounts = await web3.eth.getAccounts();
        const doctoraddress = accounts[0];
        const patientAddresArray = await medical.methods.getPatientAddressArray().call();
        const count = await medical.methods.getPatientCount().call();
        var IsDelegationArray = [];
        
        for(var i=0;i<count;i++)
        {
            try{
                var isDelegate = await medical.methods.PatientIsDelegate(doctoraddress, patientAddresArray[i]).call();
                IsDelegationArray.push(isDelegate);
            }catch(err){
                console.log(err);
            }
        }
        return { patientAddresArray, doctoraddress, count, IsDelegationArray };
    }

    renderList() {
        var counter = 0;
        const items = this.props.patientAddresArray.map(address => {
            if(this.props.IsDelegationArray[counter++]){
                return {
                    header: address,
                    description: (<Link route={`/category/${address}`}><a>View Patient Detail</a></Link>),                   
                    fluid: true
                };
            }else{
                return "";
            }
            
        });
        return <Card.Group items={items}/>;
    }

    render () {
        return (
            <Layout>
                <h1>Doctor's Patient list</h1>
                {this.renderList()}
            </Layout>
        );
    }
}
export default Doctor;