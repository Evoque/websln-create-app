
import React from 'react';
import ContentItem from './ContentItem';
import './content.css';

class ContentInfo extends React.Component {

    render() { 
        var MyComponent = this.props.MyComponent;
        return (
            <div className="contents">
                {
                    MyComponent
                        ? <MyComponent />
                        : null
                } 
            </div>
        );
    }

}

export default ContentInfo;