
import React from 'react';


/**
 *  这里要实现 DnD
 */
export default class TabBarItem extends React.Component {

    handleClick = (e) => {
        e.preventDefault();
        e.stopPropagation(); 
        if (this.props.onTabBarClick) {
            this.props.onTabBarClick();
        }
    }

    handleOver = (e) => {
        if (!this.props.isActive) {
            this.refs.r_close.style.display = "inline-block";
        }

    }
    handleOut = (e) => {
        if (!this.props.isActive) {
            this.refs.r_close.style.display = "none";
        } 
    }

    handleClose = (e) => { 
        if (this.props.onCloseClick) {
            this.props.onCloseClick();
        }
    }


    render() {
        return (
            <li role="presentation" className={this.props.isActive ? "active" : ""} data-uid={this.props.uid}
                onMouseOver={this.handleOver} onMouseOut={this.handleOut}>
                <a href="#" onClick={this.handleClick} >
                    {this.props.name}
                    <span className="glyphicon glyphicon-remove" ref="r_close"
                        style={{ marginLeft: ".5em", display: this.props.isActive ? "inline" : "none" }}
                        onClick={this.handleClose}
                        >
                    </span>
                </a>
            </li>
        );
    } 

}