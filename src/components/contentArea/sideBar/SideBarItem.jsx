import React from 'react';  

export default class BarItem extends React.Component {
 
    handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
 
        if (this.props.onSideBarClick) { 
            this.props.onSideBarClick({
                id: this.props.uid,
                name: this.props.barName,
                url: e.currentTarget.href
            });
        } 
    }

    render() {

        return (
            <li className={this.props.isActive ? "active" : ""}>
                <a href={this.props.url} data-uid={this.props.uid} onClick={this.handleClick} >
                    {this.props.barName}
                </a>
            </li>
        );
    }
    
}