import React, {PropTypes} from "react";
import {connect} from "react-redux";
import {apiRequestSummary, summarySearchChanged, SummarySearchClear} from "redux/actions/searchActions";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {onMessage, SUMMARY_VIEW, viewChanged} from "redux/actions/uiActions";
import {Link} from "react-router-dom";


const SummaryPanel = ({summary}) => {


    const linkFormatter = (cell, row) => {
        return <Link to={`/ts/${row.sugar_uname}`}>{cell}</Link>
    };


    return (
        <BootstrapTable data={summary.summary} striped hover condensed>
            <TableHeaderColumn isKey dataField='id' hidden>#</TableHeaderColumn>
            <TableHeaderColumn dataField='full_name' width='40%' dataSort={ true }
                               dataFormat={linkFormatter}>Sugar Name</TableHeaderColumn>
            <TableHeaderColumn dataField='team' width='20%' dataSort={ true }>Team</TableHeaderColumn>
            <TableHeaderColumn dataField='timesheets_sum' dataSort={ true }>Hrs.</TableHeaderColumn>
        </BootstrapTable>
    )


};

SummaryPanel.Proptypes = {
    summary: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        summary: state.summary //table data
    }
};

export default connect(mapStateToProps)(SummaryPanel)
