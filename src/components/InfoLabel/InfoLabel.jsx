import React, {PropTypes} from "react";
import Label from "react-bootstrap/lib/Label";
import {connect} from "react-redux";


const InfoLabel = ({ui}) => {

    return (

        <span>{(ui.loading) ? <Label
            bsStyle="default">Loading...</Label> : ((ui.errors.message) ?
            <Label bsStyle="danger"> {ui.errors.message} </Label> :
            <Label bsStyle="success">{ui.message ? ui.message : 'Success' }</Label>)}</span>

    )

};

InfoLabel.PropTypes = {
    ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    ui: state.ui,
});

export default connect(mapStateToProps)(InfoLabel);

