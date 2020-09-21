import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions'
import { clearErrors } from '../actions/errorActions'
import { Chart } from "react-google-charts";

class LoginModal extends Component {
    state = {
        modal: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };


    toggle = () => {

        this.setState({
            modal: !this.state.modal
        });
    };




    render() {
        return (

            <div>
                <NavLink onClick={this.toggle} href="#">
                    Sales
                </NavLink>

                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Sales</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <formGroup>
                                <strong>Total Revenue: £143.5</strong>
                                <div>
                                    <Chart
                                        chartType="PieChart"
                                        data={[["Product", "Number sold"], ["Skyrim", 5], ['Baker Street 12"', 12], ["Banana", 3]]}
                                        width="100%"
                                        height="400px"
                                        legendToggle
                                    />
                                    <Chart
                                        width={'100%'}
                                        height={'400px'}
                                        chartType="LineChart"
                                        loader={<div>Skyrim Sales</div>}
                                        data={[
                                            ['x', '1'],
                                            [0, 0],
                                            [1, 10],
                                            [2, 23],
                                            [3, 17],
                                            [4, 18],
                                            [5, 9],
                                            [6, 11],
                                            [7, 27],
                                            [8, 33],
                                            [9, 40],
                                            [10, 32],
                                            [11, 35],
                                        ]}
                                        options={{
                                            hAxis: {
                                                title: 'Time (hours)',
                                            },
                                            vAxis: {
                                                title: 'Items Sold',
                                            },
                                        }}
                                        legendToggle
                                    />

                                </div>
                            </formGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(LoginModal);