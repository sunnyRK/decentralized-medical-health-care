import React, { Component } from 'react';
import Layout from '../../../components/Layout';
import { Button, Form, Input } from 'semantic-ui-react';
import medical from '../../../ethereum/medical';
import web3 from '../../../ethereum/web3';
import ipfs from '../../../ethereum/ipfs';
import { Router } from '../../../routes';
// var aes256 = require('aes256');

class Addmeeting extends Component{
     static async getInitialProps(props){
        const address = props.query.address;
        return {address};
    }

    state = {
        expense: 0,
        diseases: '',
        medicineName: '',
        ipfsHash:null,
        buffer:'',
        ethAddress:'',
        blockNumber:'',
        transactionHash:'',
        gasUsed:'',
        txReceipt: ''  
    };

    captureFile =(event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)    
      };
    
    convertToBuffer = async(reader) => {
        const buffer = await Buffer.from(reader.result);
        this.setState({buffer});
    };

    onSendIpfs = async (event) => {
        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
       
        console.log('Sending from Metamask account: ' + accounts[0]);
        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
          alert("Report uploaded(Hash Value): " + ipfsHash[0].hash);
          console.log(err,ipfsHash);
          this.setState({ ipfsHash:ipfsHash[0].hash });
        }) 
      }; 

    
    onSubmit = async (event) => {
        event.preventDefault();
        try{
            alert("hi1");
            // var key = "#1234@dance";
            // var cipher = aes256.createCipher(key);
            const accounts = await web3.eth.getAccounts();
            alert(accounts[0]);
            // alert(this.state.diseases);
            await medical.methods.AddPatientMeetingInfo(
                this.props.address,
                this.state.diseases,
                this.state.expense,
                this.state.medicineName,
                this.state.ipfsHash
                // cipher.encrypt(this.props.address),
                // cipher.encrypt(this.state.diseases),
                // cipher.encrypt(this.state.expense),
                // cipher.encrypt(this.state.medicineName),
                // cipher.encrypt(this.state.ipfsHash)
            ).send({
                from:accounts[0]
            });
            alert("Meeting Added");
            Router.pushRoute(`/category/${this.props.address}/meetings`);
        }catch(err){
            alert(err);
        }
    };

    render(){
        return(
            <Layout>
                <Form onSubmit={this.onSubmit}>
                    <Form.Field>
                        <Input 
                            value={this.state.diseases}
                            onChange={event => this.setState({
                                diseases: event.target.value
                            })}
                            label="Diseases" labelPosition="right"/>
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            value={this.state.medicineName}
                            onChange={event => this.setState({
                                medicineName: event.target.value
                            })}
                            label="Medicine Name" labelPosition="right"/>
                    </Form.Field>
                    <Form.Field>
                        <Input 
                            value={this.state.expense}
                            onChange={event => this.setState({
                                expense: event.target.value
                            })}
                            label="Treatment cost" labelPosition="right"/>
                    </Form.Field>


                    <Button primary>
                        Add Meeting!
                    </Button>
                </Form>
                
                <h3> Choose file to send to IPFS </h3>

                <Form onSubmit={this.onSendIpfs}>
                    <Form.Field>
                        <Input 
                        type = "file"
                        onChange = {this.captureFile}
                        />
                    </Form.Field>

                    <Button 
                        bsStyle="primary" 
                        type="submit"> 
                        Upload Report
                    </Button>
                </Form>

                </Layout>
        );
    }
}

export default Addmeeting;