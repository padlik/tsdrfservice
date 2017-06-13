import React, {Component, PropTypes} from "react";
import Panel from "react-bootstrap/lib/Panel";
import Label from "react-bootstrap/lib/Label";
/**/

class InfoPanelView extends Component {

    render() {
        const {fullName, total, overtime, jira} = this.props;
        const jiraStyle = (jira) ? "info" : "default";
        const overStyle = (overtime) ? "danger" : "default";
        return (
            <Panel>{' '}<strong>{fullName}:</strong>{'   '}
                <Label bsStyle="primary">Total: {total}</Label>{'   '}
                <Label bsStyle={overStyle}>Overtime: {overtime}</Label>{'   '}
                <Label bsStyle={jiraStyle}>JIRA: {jira}</Label>{'   '}
            </Panel>
        );
    }
}

InfoPanelView.PropTypes = {
    fullName: PropTypes.text,
    total: PropTypes.text,
    overtime: PropTypes.text,
    jira: PropTypes.text
};

export default InfoPanelView;