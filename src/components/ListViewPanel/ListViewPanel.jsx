import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {apiRequestDetail, listSearchChanged} from "redux/actions/searchActions";
import {DETAIL_LIST_VIEW, onMessage, viewChanged} from "redux/actions/uiActions";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";


class ListViewPanel extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.actions.viewChanged(DETAIL_LIST_VIEW);
        let {month} = this.props.search.summary_search;
        this.props.actions.listSearchChanged({search: '', month, userid: this.props.match.params.userid});
        this.props.actions.apiRequestDetail();
    }

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
    search: PropTypes.string,
    ui: PropTypes.object,
    details: PropTypes.node,
    viewChanged: PropTypes.func.isRequired,
    listSearchChanged: PropTypes.func.isRequired,
    apiRequestDetail: PropTypes.func.isRequired,
    onMessage: PropTypes.func.isRequired

};

const mapStateToProps = (state, ownProps) => {
    return {
        search: state.search,
        ui: state.ui,
        details: state.detail.details.filter(row => {
            return row.userid === ownProps.match.params.userid
        })
    }
};


const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({viewChanged, listSearchChanged, apiRequestDetail, onMessage}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(ListViewPanel);