import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {apiRequestSummary, summarySearchChanged, SummarySearchClear} from "redux/actions/searchActions";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {onMessage, SUMMARY_VIEW, viewChanged} from "redux/actions/uiActions";
import {Link} from "react-router-dom";


class SummaryPanel extends Component {


    linkFormatter(cell) {
        return <Link to={`/ts/${cell}`}>{cell}</Link>
    }

    render() {
        return (
            <BootstrapTable data={this.props.summary.summary} striped hover condensed>
                <TableHeaderColumn isKey dataField='id' hidden>#</TableHeaderColumn>
                <TableHeaderColumn dataField='sugar_uname' width='40%' dataSort={ true }
                                   dataFormat={this.linkFormatter}>Sugar Name</TableHeaderColumn>
                <TableHeaderColumn dataField='team' width='20%' dataSort={ true }>Team</TableHeaderColumn>
                <TableHeaderColumn dataField='timesheets_sum' dataSort={ true }>Hrs.</TableHeaderColumn>
            </BootstrapTable>
        )

    }
}
SummaryPanel.Proptypes = {
    summary: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        summary: state.summary //table data
    }
};

export default connect(mapStateToProps,)(SummaryPanel)
