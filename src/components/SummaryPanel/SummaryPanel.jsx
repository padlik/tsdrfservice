import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import FilterView from "../FilterView/FilterView";
import {apiRequestSummary, summarySearchChanged, SummarySearchClear} from "redux/actions/searchActions";
import {bindActionCreators} from "redux";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {SUMMARY_VIEW, viewChanged, onMessage} from "redux/actions/uiActions";
import {Link} from "react-router-dom";


class SummaryPanel extends Component {
    constructor(props) {
        super(props);
        this.search = {
            search: this.props.search.search,
            month: this.props.search.month
        };
        this.searchChanged = this.props.actions.summarySearchChanged;

    }

    componentDidMount() {
        this.props.actions.viewChanged(SUMMARY_VIEW);
    }

    updateSearch = () => {
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.searchChanged(this.search);
        this.promise = setTimeout(() => this.props.actions.apiRequestSummary(), 500)
    };

    handleText = text => {
        this.search.search = text;
        this.updateSearch();
    };

    handleMonth = month => {
        this.search.month = month;
        this.updateSearch();
    };

    handleClearSearch = () => {
        this.search = {search: '', month: ''};
        this.updateSearch();
    };

    linkFormatter(cell) {
        return <Link to={`/ts/${cell}`}>{cell}</Link>
    }

    render() {
        return <div>
            <FilterView text={this.search.search || ''}
                        month={this.props.search.month || ''}
                        onSearchChange={this.handleText}
                        onMonthChange={this.handleMonth}
                        onClearSearch={this.handleClearSearch}
            />
            {'  '}
            <hr />
            <BootstrapTable data={this.props.summary.summary} striped hover condensed>
                <TableHeaderColumn isKey dataField='id' hidden>#</TableHeaderColumn>
                <TableHeaderColumn dataField='sugar_uname' width='40%' dataSort={ true }
                                   dataFormat={this.linkFormatter}>Sugar Name</TableHeaderColumn>
                <TableHeaderColumn dataField='team' width='20%' dataSort={ true }>Team</TableHeaderColumn>
                <TableHeaderColumn dataField='timesheets_sum' dataSort={ true }>Hrs.</TableHeaderColumn>
            </BootstrapTable>
        </div>
    }
}
SummaryPanel.Proptypes = {
    search: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    summary: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        search: state.search.summary_search, //search parameters
        summary: state.summary //table data
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({apiRequestSummary, summarySearchChanged, viewChanged, SummarySearchClear, onMessage}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPanel)
