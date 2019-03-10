import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
    return (
        <Menu style={{ marginTop : '10px'}}>
            <Link route='/'>
                <a className='item'>Medical Health Care</a>
            </Link>

            <Menu.Menu position="right">
                <Link route='/'>
                    <a className='item'>Add Doctor</a>
                </Link>
                <Link route='/campaigns/new'>
                    <a className='item'>Add Patient</a>
                </Link>
            </Menu.Menu>
        </Menu>
    );
};