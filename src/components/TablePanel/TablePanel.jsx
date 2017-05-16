import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "./react-bootstrap-table.min.css";

class TablePanel extends Component {
    render() {

        return <div>
            <BootstrapTable data={this.props.summary.summary} striped hover condensed>
                <TableHeaderColumn isKey dataField='id' width='10%'>ID</TableHeaderColumn>
                <TableHeaderColumn dataField='sugar_uname' width='40%'>Sugar Name</TableHeaderColumn>
                <TableHeaderColumn dataField='team' width='20%'>Team</TableHeaderColumn>
                <TableHeaderColumn dataField='timesheets_sum'>Hrs.</TableHeaderColumn>
            </BootstrapTable>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        summary: state.summary
    }
};

TablePanel.PropTypes = {
    summary: PropTypes.node.isRequired
};


export default connect(mapStateToProps)(TablePanel);