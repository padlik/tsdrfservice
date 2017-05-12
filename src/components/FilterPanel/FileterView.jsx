import React, {Component, PropTypes} from "react";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";


class FilterView extends Component {
    render() {
        const {text, onChange} = this.props;
        return (
            <Form inline>
                <FormGroup controlId="formSearchText">
                    <ControlLabel>Search</ControlLabel>
                    {' '}
                    <FormControl type="text"
                                 placeholder="Search Text"
                                 value={text}
                                 onChange={e => onChange(e.target.value)}
                    />
                </FormGroup>
            </Form>
        );
    }

}

FilterView.propTypes = {
    text: PropTypes.string,
    onChange: PropTypes.func.isRequired
};


export default FilterView;