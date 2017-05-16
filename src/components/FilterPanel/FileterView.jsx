import React, {Component, PropTypes} from "react";
import Form from "react-bootstrap/lib/Form";
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import DatePicker from "react-bootstrap-date-picker";
import Button from "react-bootstrap/lib/Button";


class FilterView extends Component {


    render() {
        const {text, date_from, date_to, onSearchChange, onDateFromChange, onDateToChange, onClearSearch} = this.props;
        return (
            <Form inline>
                <FormGroup controlId="formSearchText">
                    <ControlLabel>Search</ControlLabel>
                    {' '}
                    <FormControl type="text"
                                 placeholder="Search Text"
                                 value={text}
                                 onChange={(e) => onSearchChange(e.target.value)}
                    />
                    {' '}
                    <ControlLabel>Start Date</ControlLabel>
                    {' '}
                    <DatePicker id="picker-from" dateFormat="YYYY-MM-DD" value={date_from} onChange={onDateFromChange}/>
                    {' '}
                    <ControlLabel>End Date</ControlLabel>
                    {' '}
                    <DatePicker id="picker-to" dateFormat="YYYY-MM-DD" value={date_to} onChange={onDateToChange}/>
                    {'  '}
                    {(text || date_from || date_to) ? <Button onClick={onClearSearch}>Clear</Button> : ''}
                </FormGroup>
            </Form>
        );
    }

}

FilterView.propTypes = {
    text: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired,
    onDateFromChange: PropTypes.func.isRequired,
    onDateToChange: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func,
    date_from: PropTypes.string,
    date_to: PropTypes.string
};


export default FilterView;