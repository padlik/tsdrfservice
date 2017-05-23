import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {apiRequest, listSearchChanged} from "redux/actions/searchActions";
import {DETAIL_LIST_VIEW, viewChanged} from "redux/actions/uiActions";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";


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
        return <div>
            <BootstrapTable data={this.props.details} striped hover condensed>
                <TableHeaderColumn isKey dataField='key' hidden>#</TableHeaderColumn>
                <TableHeaderColumn dataField='activity_date' width='8%' dataSort={ true }>Date</TableHeaderColumn>
                <TableHeaderColumn dataField='name' dataSort={ true }>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='source' width='7%' dataSort={ true }>Source</TableHeaderColumn>
                <TableHeaderColumn dataField='time_spent' width='4%' >Time</TableHeaderColumn>
                <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
            </BootstrapTable>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        search: state.search,
        ui: state.ui,
        details: state.detail.details
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({viewChanged, listSearchChanged, apiRequest}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(ListViewPanel);