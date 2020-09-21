import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';
import ReactSearchBox from 'react-search-box';

class ShoppingList extends Component {

    currSearch = null;
    basket = [];

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }


    // Move this to MongoDB
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
    ]


    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    onChange = (record) => {
        this.currSearch = record;
    }

    addToBasket() {
        console.log("added");
        if (this.basket.length !== 0) {
            this.basket.push(', ' + this.currSearch);
        } else {
            this.basket.push(this.currSearch);
        }

        console.log(this.basket);
        // Bad practice
        this.forceUpdate();
    }

    render() {

        // return (
        //     <Container>

        //         <ReactSearchBox
        //             placeholder="Search for an item"
        //             value=""
        //             data={this.data}
        //             callback={record => console.log(record)} /* Here we want to create a basket div to save items */
        //             onChange={record => this.onChange(record)}
        //         />
        //         <Button onClick={() => this.addToBasket()}>Add to basket</Button>

        //         <div style={{ marginTop: '50px' }}>
        //             <h3>Basket:</h3>
        //             <h5>{this.basket}</h5>
        //         </div>

        //     </Container >
        // );


        const { items } = this.props.item;
        return (
            <Container>

                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {this.props.isAuthenticated ?
                                        <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;</Button> : null}
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>

            </Container>
        );
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem }
)(ShoppingList);