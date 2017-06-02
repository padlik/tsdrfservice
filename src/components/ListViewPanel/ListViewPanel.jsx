import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {DETAIL_LIST_VIEW, onMessage, viewChanged} from "redux/actions/uiActions";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";


class ListViewPanel extends Component {

    overtimeFormatter(row) {
        return row.description.indexOf(`vertime:`) !== -1 ? 'danger' : 'normal';
    }

    render() {
        return <div>
            <BootstrapTable data={(this.props.details.length === 0) ? [] : this.props.details[0].sheets} striped hover
                            condensed trClassName={this.overtimeFormatter}>
                <TableHeaderColumn isKey dataField='key' hidden>#</TableHeaderColumn>
                <TableHeaderColumn dataField='activity_date' width='8%' dataSort={ true }>Date</TableHeaderColumn>
                <TableHeaderColumn dataField='name' dataSort={ true }>Name</TableHeaderColumn>
                <TableHeaderColumn dataField='source' width='7%' dataSort={ true }>Source</TableHeaderColumn>
                <TableHeaderColumn dataField='time_spent' width='4%'>Time</TableHeaderColumn>
                <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
            </BootstrapTable>
        </div>
    }
}

ListViewPanel.PropTypes = {
    details: PropTypes.node
};

const mapStateToProps = (state, ownProps) => {
    return {
        details: state.detail.details.filter(row => {
            return row.userid === ownProps.match.params.userid
        })
    }
};

export default connect(mapStateToProps)(ListViewPanel);