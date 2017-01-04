

import React from 'react'; 

export default class NavBarItem extends React.Component {

    handleClick = (e) => {
        console.log("TopBar点击："+e.currentTarget.text);
        var uid = e.currentTarget.dataset["id"]; 
        if (this.props.onTopClick) {
            this.props.onTopClick(uid);
        }
        e.stopPropagation();
    }

    handleOver = (e) => {
        this.refs.Dropdown.className = "open";
    }

    handleOut = (e) => {
        this.refs.Dropdown.className = "";
    }

    render() {
        return (
            <li key={this.props.id}>
                <a href="#" data-id={this.props.id} className="navbar-brand glyphicon" onClick={this.handleClick} >
                    {this.props.name}
                </a>
            </li>
        );
    }


    /** 暂留不用 */
    renderDropdown = () => {
        return (
            <section ref="Dropdown">
                <a href="#" className="dropdown-toggle navbar-brand glyphicon"
                    id={this.props.id}
                    data-toggle="dropdown"
                    role="button"
                    aria-haspopup="true" aria-expanded="false">
                    {this.props.name}<span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                    {
                        this.props.subModules.map(sm =>
                            <li key={sm.ID}>
                                <a href="#" data-id={sm.ID} onClick={this.handleClick}>{sm.Name}</a>
                            </li>
                        )
                    }

                </ul>
            </section>
        );
    }

}