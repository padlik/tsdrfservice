import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import "./react-bootstrap-table.min.css";
import {SUMMARY_VIEW, viewChanged} from "redux/actions/uiActions";

class TablePanel extends Component {
    componentDidMount() {
        this.props.actions.viewChanged(SUMMARY_VIEW);
    }

    render() {

        return <div>
            <BootstrapTable data={this.props.summary.summary} striped hover condensed>
                <TableHeaderColumn isKey dataField='id' width='10%'>#</TableHeaderColumn>
                <TableHeaderColumn dataField='sugar_uname' width='40%' dataSort={ true }>Sugar Name</TableHeaderColumn>
                <TableHeaderColumn dataField='team' width='20%' dataSort={ true }>Team</TableHeaderColumn>
                <TableHeaderColumn dataField='timesheets_sum' dataSort={ true }>Hrs.</TableHeaderColumn>
            </BootstrapTable>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        summary: state.summary
    }
};

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({viewChanged}, dispatch)
});


TablePanel.PropTypes = {
    summary: PropTypes.node.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(TablePanel);