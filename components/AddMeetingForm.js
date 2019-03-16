// import React , { Component } from 'react';
// import { Form, Input, Message, Button } from 'semantic-ui-react';
// import Campaign from '../ethereum/campaign';
// import web3 from '../ethereum/web3';
// import Router from '../routes';

// class ContributeForm extends Component{

//     state = { 
//         value:''
//     };

//     onSubmit = async (event) => {
//         event.preventDefault();
//         console.log("sunny");
//     };

//     render(){
//         return(
//             <Form onSubmit={this.onSubmit}>
//                 <Form.Field>
//                     <Input 
//                         value={this.state.value}
//                         onChange={event => this.setState({
//                             value: event.target.value
//                         })}
//                         label="ether" labelPosition="right"/>
//                 </Form.Field>
//                 <Button primary >
//                     Contribute!
//                 </Button>
//             </Form>
//         );
//     }
// }

// export default ContributeForm;