import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {DETAIL_LIST_VIEW, onMessage, viewChanged} from "redux/actions/uiActions";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import InfoPanelView from "components/InfoPanelView";

class ListViewPanel extends Component {

    overtimeFormatter(row) {
        return row.description.indexOf(`vertime:`) !== -1 ? 'danger' : 'normal';
    }

    render() {
        return <div>
            <InfoPanelView fullName={this.props.stat.fullName}
                           total={this.props.stat.total}
                           overtime={this.props.stat.overtime}
                           jira={this.props.stat.jira}/>
            <BootstrapTable data={(!this.props.details.length) ? [] : this.props.details[0].sheets} striped hover
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
    let details = state.detail.details.filter(row => {
        return row.userid === ownProps.match.params.userid
    });

    let stat = {fullName: "", total: 0, overtime: 0, jira: 0};

    let summary = state.summary.summary.filter(row => {
        return row.sugar_uname === ownProps.match.params.userid
    });

    if (summary.length){
        stat.fullName = summary[0].full_name;
    }

    if (details.length) {
        stat = details[0].sheets.reduce(
            (stat, ts) => {
                let desc = ts.description === null ? "" : ts.description;
                let src = ts.source === null ? "" : ts.source;
                stat.total += ts.time_spent;
                if (desc.indexOf(`vertime:`) !== -1) {
                    stat.overtime += ts.time_spent;
                }
                if (src.indexOf(`JIRA`) !== -1) {
                    stat.jira += ts.time_spent;
                }
                return stat;
            }, stat);
    }
    return {
        stat: stat,
        details: details
    }
};

export default connect(mapStateToProps)(ListViewPanel);