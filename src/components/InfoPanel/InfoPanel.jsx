import React, {Component} from "react";
/**/
import InfoPanelView from "components/InfoPanelView";
import {connect} from "react-redux";

class InfoPanel extends Component {
    render() {
        return (
            <InfoPanelView fullName="Paul Pronko" total={this.props.stat.total}
                           overtime={this.props.stat.overtime}
                           jira={this.props.stat.jira}/>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let details = state.detail.details.filter(row => {
        return row.userid === ownProps.match.params.userid
    });
    let stat = {total: 0, overtime: 0, jira: 0};
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
        stat: stat
    }
};

export default connect(mapStateToProps)(InfoPanel);