import React, { Component } from 'react';

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <nav className='navbar fixed-top navbar-expand-md navbar-dark bg-dark'>
                    <div ><a href="/" className='navbar-brand'>Employee Management App</a></div>
                </nav>

            </div>
        );
    }
}

export default HeaderComponent;