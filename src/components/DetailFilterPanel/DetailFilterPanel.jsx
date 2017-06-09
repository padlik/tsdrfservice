import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {apiRequestDetail, listSearchChanged} from "redux/actions/searchActions";
import DetailFilterView from "../DetailFilterView/DetailFilterView";


class DetailFilterPanel extends Component {

    constructor(props) {
        super(props);
        this.search = {
            search: '',
            month: '',
            userid: '',
            inherit: true
        }
    }


    componentDidMount() {
        if (this.props.detail_search.length === 0) {
            //there is no custom search, so we create it
            this.search = {
                search: '',
                month: this.props.summary_search.month,
                userid: this.props.match.params.userid,
                inherit: true
            };
        } else {
            this.search = {
                search: this.props.detail_search[0].search,
                month: (this.props.detail_search[0].inherit) ? this.props.summary_search.month : this.props.detail_search[0].month,
                userid: this.props.match.params.userid,
                inherit: this.props.detail_search[0].inherit
            };
        }
        console.log(this.props);
        this.updateSearch();
    }


    updateSearch = () => {
        this.props.actions.listSearchChanged(this.search);
        this.props.actions.apiRequestDetail(this.props.match.params.userid);
    };


    handleInheritSearchChange = (e) => {
        this.search.inherit = !this.search.inherit;
        if (this.search.inherit) {
            this.search.search = '';
            this.search.month = this.props.summary_search.month;
        }
        this.updateSearch();
    };

    handleMonthChange = month => {
        this.search.month = month;
        this.updateSearch();
    };

    handleSearchChange = search => {
        if (this.promise) {
            clearInterval(this.promise)
        }
        this.search.search = search;
        this.props.actions.listSearchChanged(this.search);
        this.promise = setTimeout(() => this.props.actions.apiRequestDetail(this.props.match.params.userid), 500)
    };


    render() {
        return (
            <DetailFilterView
                text={(this.props.detail_search.length === 0) ? this.search.search : this.props.detail_search[0].search}
                month={(this.props.detail_search.length === 0) ? this.search.month : this.props.detail_search[0].month}
                onSearchChange={this.handleSearchChange}
                onMonthChange={this.handleMonthChange}
                inheritSearch={(this.props.detail_search.length === 0) ? this.search.inherit : this.props.detail_search[0].inherit}
                onInheritSearchChange={this.handleInheritSearchChange}/>
        )
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        detail_search: state.search.list_search.searches.filter(row => {
            return row.userid === ownProps.match.params.userid
        }),
        summary_search: state.search.summary_search
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({apiRequestDetail, listSearchChanged}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(DetailFilterPanel)
