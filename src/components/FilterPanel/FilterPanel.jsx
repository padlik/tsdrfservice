import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import FilterView from "./FileterView";
import {summaryRequest} from "redux/actions/summaryActions";
import {searchChanged} from "redux/actions/searchActions";
import {bindActionCreators} from "redux";

class FilterPanel extends Component {


    handleSearch = search => {
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.props.actions.searchChanged({search: search});
        this.promise = setTimeout(() => this.props.actions.summaryRequest(search), 500)
    };


    render() {
        return <FilterView text={this.props.search.search} onChange={this.handleSearch}/>
    }
}
;

FilterPanel.Proptypes = {
    search: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        search: state.search/*,
         summary: state.summary*/
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({summaryRequest, searchChanged}, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterPanel)
