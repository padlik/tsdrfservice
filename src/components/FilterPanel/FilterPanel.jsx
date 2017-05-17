import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import FilterView from "./FileterView";
import {summaryRequest} from "redux/actions/summaryActions";
import {searchChanged} from "redux/actions/searchActions";
import {bindActionCreators} from "redux";

class FilterPanel extends Component {
    constructor(props) {
        super(props);
        this.search_params = {
            search: this.props.search.search,
            date_from: this.props.search.date_from,
            date_to: this.props.search.date_to
        };

    }

    updateSearch = () => {
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.props.actions.searchChanged(this.search_params);
        this.promise = setTimeout(() => this.props.actions.summaryRequest(), 500)
    };

    handleText = text => {
        this.search_params.search = text;
        this.updateSearch();
    };

    handleDateFrom = (rawDate, formattedDate) => {
        this.search_params.date_from = formattedDate;
        this.updateSearch();
    };

    handleDateTo = (rawDate, formattedDate) => {
        this.search_params.date_to = formattedDate;
        this.updateSearch();
    };

    handleClearSearch = () => {
        this.search_params = {};
        this.updateSearch();
    };

    render() {
        return <FilterView text={this.search_params.search || ''}
                           date_from={this.search_params.date_from}
                           date_to={this.search_params.date_to}
                           onSearchChange={this.handleText}
                           onDateFromChange={this.handleDateFrom}
                           onDateToChange={this.handleDateTo}
                           onClearSearch={this.handleClearSearch}
        />
    }
}
FilterPanel.Proptypes = {
    search: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        search: state.search
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({summaryRequest, searchChanged}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel)
