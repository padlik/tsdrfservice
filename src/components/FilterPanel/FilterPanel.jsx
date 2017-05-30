import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {apiRequestSummary, summarySearchChanged, SummarySearchClear} from "redux/actions/searchActions";
import FilterView from "../FilterView/FilterView";

class FilterPanel extends Component {
    constructor(props) {
        super(props);
        this.search = {
            search: this.props.search.search,
            month: this.props.search.month
        };
        this.searchChanged = this.props.actions.summarySearchChanged;

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

    render() {
        return (
            <FilterView text={this.props.search.search || ''}
                        month={this.props.search.month || ''}
                        onSearchChange={this.handleText}
                        onMonthChange={this.handleMonth}
                        onClearSearch={this.handleClearSearch}
            />
        )
    }


}


const mapStateToProps = state => {
    return {
        search: state.search.summary_search, //search parameters
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({apiRequestSummary, summarySearchChanged, SummarySearchClear}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel)

