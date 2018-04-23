import React, {Component} from 'react';
import {connect} from "react-redux";

import './List.css';
import Spinner from "../../../../components/UI/Spinner/Spinner";
import * as listAction from '../../../../store/List/List.action';
import ListItem from "../../../../components/List/ListItem";

class List extends Component {

    componentDidMount() {
        this.props.fetchLists(this.props.user.userName);
    }

    onViewHandler = (listId) => {
        this.props.history.push(`/app/${listId}`);
    };

    onEditHandler = (itemId) => {

    };

    onRemoveHandler = (itemId) => {

    };

    render() {
        let content = <Spinner/>;

        if (!this.props.loadingLists) {
            const items = this.props.lists.map((item) => (
                <ListItem
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    onView={() => this.onViewHandler(item.id)}
                    onEdit={() => this.onEditHandler(item.id)}
                    onRemove={() => this.onRemoveHandler(item.id)}/>
            ));
            content = (
                <div className="list-container">
                    {items}
                </div>
            );
        }

        return content;
    }
}

const mapStateToProps = state => {
    return {
        user: state.authentication.user,
        loadingLists: state.list.loadingLists,
        lists: state.list.lists
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLists: (user) => dispatch(listAction.fetchLists(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);