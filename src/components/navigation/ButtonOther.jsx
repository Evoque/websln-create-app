
import React from 'react';
import  {Modal, Button} from 'react-bootstrap';

export default class ButtonOther extends React.Component {
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
                    <a href="#" className="glyphicon navbar-brand" onClick={this.open}>其他</a>
                
                

                <Modal show={this.state.showModal} onHide={this.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>关于</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <dl className="dl-horizontal">
                                <dt>Created by</dt>
                                <dd>
                                    <strong>
                                        <span style={{ color: 'cadetblue' }}>北京科技大学 www.ustb.edu.cn </span>
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