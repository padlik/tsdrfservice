import React, {Component, PropTypes} from "react";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";


class FilterView extends Component {


    render() {
        const {text, month, onSearchChange, onMonthChange, onClearSearch} = this.props;
        return (
            <Form inline>
                <FormGroup controlId="formSearchText">
                    <ControlLabel>Search</ControlLabel>
                    {'  '}
                    <FormControl type="text"
                                 placeholder="Search Text"
                                 value={text}
                                 onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {'  '}
                    <ControlLabel>Target Month</ControlLabel>
                    {'  '}
                    <FormControl type="month" value={month} onChange={(e) => onMonthChange(e.target.value)}/>
                    {'  '}
                    {(text || month) ? <Button onClick={onClearSearch}>Clear</Button> : ''}
                </FormGroup>
            </Form>
        );
    }

}

FilterView.propTypes = {
    text: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func,
    month: PropTypes.string
};


export default FilterView;