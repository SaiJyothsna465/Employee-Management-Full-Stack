import React, { Component } from 'react';

class FooterComponent extends Component {
    render() {
        return (
            <div>            
                <nav className='navbar fixed-bottom navbar-light bg-dark navbar-text'>
                    <span className='text-muted navbar-nav navbar-center'>App credits goes to Sai Jyothsna</span>
                </nav>
            </div>
        );
    }
}

export default FooterComponent;