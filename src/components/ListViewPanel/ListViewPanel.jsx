import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {apiRequest, listSearchChanged} from "redux/actions/searchActions";
import {DETAIL_LIST_VIEW, viewChanged} from "redux/actions/uiActions";


class ListViewPanel extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.viewChanged(DETAIL_LIST_VIEW);
        let {date_from, date_to} = this.props.search.summary_search;
        let userid = this.props.match.params.userid;
        this.props.actions.listSearchChanged({search: '', date_from, date_to, userid});
        this.props.actions.apiRequest();
    }


    render() {
        return <div>Sub for Timesheets List View:<strong>{this.props.match.params.userid}</strong></div>
    }
}

const mapStateToProps = state => {
    return {
        search: state.search,
        ui: state.ui
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({viewChanged, listSearchChanged, apiRequest}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(ListViewPanel);