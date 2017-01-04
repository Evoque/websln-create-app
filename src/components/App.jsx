
import React from 'react';
import Navigation from './navigation/Navigation';
import ContentArea from './contentArea/ContentArea';

export default class App extends React.Component {

    state = {
        sideModules: []
    }

    handleTopClick = (modules) => {
        console.dir(modules);
        this.setState({
            sideModules: modules
        });
    }

    render() { 
        return (
            <div className="bodyZone">
                <Navigation onTopClick={this.handleTopClick} />
                <ContentArea sideModules={this.state.sideModules} />
            </div>
        );
    }


}
