import React, {PropTypes} from "react";
import Panel from "react-bootstrap/lib/Panel";
import Label from "react-bootstrap/lib/Label";
/**/

const InfoPanelView = ({fullName, total, overtime, jira}) => {

    const jiraStyle = (jira) ? "info" : "default";
    const overStyle = (overtime) ? "danger" : "default";
    return (
        <Panel>{' '}<strong>{fullName}:</strong>{'   '}
            <Label bsStyle="primary">Total: {total}</Label>{'   '}
            <Label bsStyle={overStyle}>Overtime: {overtime}</Label>{'   '}
            <Label bsStyle={jiraStyle}>JIRA: {jira}</Label>{'   '}
        </Panel>
    );

};

InfoPanelView.PropTypes = {
    fullName: PropTypes.text,
    total: PropTypes.text,
    overtime: PropTypes.text,
    jira: PropTypes.text
};

export default InfoPanelView;