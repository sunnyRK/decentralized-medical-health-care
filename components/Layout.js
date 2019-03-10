import React from 'react';
import Header from './Header';
import Head from 'next/head';
import { Container } from 'semantic-ui-react';

export default props => {
    return(
        <Container>
            <Head>
                <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.0/dist/semantic.min.css"></link>
            </Head>
            <Header/>
            {props.children}
            <hr></hr>
            {/* <h1>Footer</h1> */}
        </Container>
    );
};