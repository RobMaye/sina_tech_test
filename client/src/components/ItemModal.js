import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ReactSearchBox from 'react-search-box';

// Container is a component that is hooked to redux?

class ItemModal extends Component {
    state = {
        modal: false,
        name: ''
    };

    data = [
        {
            key: 'item1',
            value: 'Skyrim',
            type: 'Video game'
        },
        {
            key: 'item2',
            value: 'Baker Street 12"',
            type: 'Music'
        },
        {
            key: 'item3',
            value: 'Banana',
            type: 'Food'
        },
        {
            key: 'item4',
            value: 'abcdefghijklmnopqrstuvwxyz',
            type: 'misc'
        }
    ]

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = (e) => {
        this.state.name = e;
    };

    onSubmit = e => {
        e.preventDefault();

        // Quantity in the future? TODO
        const newItem = {
            name: this.state.name
        }

        // For now, if the item doesn't exist - don't add
        // Add item via addItem action
        for (var i = 0; i < this.data.length; i++) {
            if (this.state.name === this.data[i].value) {
                this.props.addItem(newItem);
            }
        }

        // Close modal
        this.toggle();
    };

    render() {
        return (
            <div>
                { this.props.isAuthenticated ?
                    <Button
                        color="dark"
                        style={{ marginBottom: '2rem' }}
                        onClick={this.toggle}
                    >Item Search</Button> : <h4 className="mb-3 ml-4">Please log in to add to the basket</h4>}

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Search for an item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <formGroup>
                                <Label for="item">Search</Label>

                                <ReactSearchBox
                                    placeholder="Search for an item"
                                    value=""
                                    data={this.data}
                                    callback={record => console.log(record)} /* Here we want to create a basket div to save items */
                                    onChange={record => this.onChange(record)}
                                />

                                <Button
                                    color="dark"
                                    style={{ marginTop: '2rem' }}
                                    block
                                >Add To Basket</Button>

                            </formGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    };
}

const mapStateToProps = state => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addItem })(ItemModal);