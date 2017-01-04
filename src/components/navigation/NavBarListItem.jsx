

import React from 'react'; 

export default class NavBarListItem extends React.Component {

    handleClick = (e) => {
        console.log("TopBar点击：" + e.currentTarget.text);
        var uid = e.currentTarget.dataset["id"];
        if (this.props.onTopClick) {
            this.props.onTopClick(uid);
        }
        e.stopPropagation();
    }

    handleOver = (e) => {
        this.refs.Dropdown.className = "dropdown open";
    }

    handleOut = (e) => {
        this.refs.Dropdown.className = "dropdown";
    }

    render() {
        return (
            <li key={this.props.id} className="dropdown" ref="Dropdown" onMouseOver={this.handleOver} onMouseOut={this.handleOut}>
                <a href="#" className="dropdown-toggle navbar-brand glyphicon" data-id={this.props.id} data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                    {this.props.name}<span className="caret"></span>
                </a>
                <ul className="dropdown-menu navbar-inverse">
                    {
                        this.props.subModules.map(sm =>
                            <li key={sm.ID}>
                                <a href="#" data-id={sm.ID} onClick={this.handleClick}>{sm.Name}</a>
                            </li>
                        )
                    }

                </ul>
            </li>
        );
    }

}