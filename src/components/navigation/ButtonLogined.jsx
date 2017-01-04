
import React from 'react';
import { Modal, Button } from 'react-bootstrap';


/**
 * 已登录用户信息
 */
export default class ButtonLogined extends React.Component {
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

    render() {
        return (
            <li>
                <a href="#" className="glyphicon glyphicon-user" onClick={this.open}>&nbsp;{this.props.currentUser}</a>

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>关于</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <dl className="dl-horizontal">
                                <dt>大家好！</dt>
                                <dd>
                                    <strong>
                                        <span style={{ color: 'cadetblue' }}>我的名字叫{this.props.currentUser}</span>
                                    </strong>
                                </dd>
                            </dl>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>OK</Button>
                    </Modal.Footer>
                </Modal>
            </li>

        );
    }
}  