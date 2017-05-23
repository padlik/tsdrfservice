import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import FilterView from "../FilterView/FilterView";
import {apiRequest, summarySearchChanged, SummarySearchClear} from "redux/actions/searchActions";
import {bindActionCreators} from "redux";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {SUMMARY_VIEW, viewChanged} from "redux/actions/uiActions";
import {Link} from "react-router-dom";


class SummaryPanel extends Component {
    constructor(props) {
        super(props);
        this.search = {
            search: this.props.search.search,
            date_from: this.props.search.date_from,
            date_to: this.props.search.date_to
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
        this.promise = setTimeout(() => this.props.actions.apiRequest(), 500)
    };

    handleText = text => {
        this.search.search = text;
        this.updateSearch();
    };

    handleDateFrom = (rawDate, formattedDate) => {
        this.search.date_from = formattedDate;
        this.updateSearch();
    };

    handleDateTo = (rawDate, formattedDate) => {
        this.search.date_to = formattedDate;
        this.updateSearch();
    };

    handleClearSearch = () => {
        this.search = {search: '', date_from: '', date_to: ''};
        this.updateSearch();
    };

    linkFormatter(cell) {
        return <Link to={`/${cell}`}>{cell}</Link>
    }

    render() {
        return <div>
            <FilterView text={this.search.search || ''}
                        date_from={this.search.date_from}
                        date_to={this.search.date_to}
                        onSearchChange={this.handleText}
                        onDateFromChange={this.handleDateFrom}
                        onDateToChange={this.handleDateTo}
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
    actions: bindActionCreators({apiRequest, summarySearchChanged, viewChanged, SummarySearchClear}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryPanel)
