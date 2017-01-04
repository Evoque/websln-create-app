
import React from 'react';
import {Modal, Button } from 'react-bootstrap';

export default class ButtonLogout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        }
    }

    close = () => {
        this.setState({ showModal: false })
    }

    open = () => {
        this.setState({ showModal: true });
    }

    // 执行退出
    confirm = () => {  
        this.props.onLogout();
    }

    render() {
        return (
            <li>
                <a href="#" className="glyphicon navbar-brand" onClick={this.open}>
                  退出
                </a> 

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title className="center">确定要退出？</Modal.Title>
                    </Modal.Header> 
                    <Modal.Footer>
                        <Button onClick={this.confirm} >YES</Button>
                        <Button onClick={this.close}>CANCEL</Button>
                    </Modal.Footer>
                </Modal>

            </li>
        );
    }
}  