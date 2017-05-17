import React, {Component} from "react";

class ListViewPanel extends Component {
    render() {
        return <div>Sub for Timesheets List View:<strong>{this.props.match.params.userid}</strong></div>
    }
}

export default ListViewPanel;