import React, {Component} from "react";
import {SUMMARY_VIEW, viewChanged} from "redux/actions/uiActions";

class ListViewPanel extends Component {

    componentDidMount() {

    }

    render() {
        return <div>Sub for Timesheets List View:<strong>{this.props.match.params.userid}</strong></div>
    }
}


export default ListViewPanel;