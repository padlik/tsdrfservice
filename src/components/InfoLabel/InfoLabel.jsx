import React, {Component, PropTypes} from "react";
import Label from "react-bootstrap/lib/Label";
import {connect} from "react-redux";


class InfoLabel extends Component {
    render() {
        return (

            <span>{(this.props.ui.loading) ? <Label
                bsStyle="default">Loading...</Label> : ((this.props.ui.errors.message) ?
                <Label bsStyle="danger"> {this.props.ui.errors.message} </Label> :
                <Label bsStyle="success">Success</Label>)}</span>

        )
    }
}

InfoLabel.PropTypes = {
    ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    ui: state.ui,
});

export default connect(mapStateToProps)(InfoLabel);

