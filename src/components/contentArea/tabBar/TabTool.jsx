
import React from 'react';


export default class TabTool extends React.Component {
 

    handleCloseOther = () => {
        this.props.onCloseOther();
    }

    handleCloseAll = () => {
        this.props.onCloseAll();
    }
  
    /**
     *  内容页settings 
     *  PS: 关闭全部 & 关闭其他
     */
    render() {
        return (
            <li className="dropdown" role="presentation">
                <a className="dropdown-toggle" style={{ color: "purple" }} href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                    <span className="glyphicon glyphicon-cog"></span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <li><a href="#" className="glyphicon glyphicon-asterisk" onClick={this.handleCloseAll}> 关闭所有</a></li>
                    <li><a href="#" className="glyphicon glyphicon-minus" onClick={this.handleCloseOther}> 关闭其他</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#"><span className="caret"></span></a></li>
                </ul>
            </li>
        );
    }


}