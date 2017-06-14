import React, {PropTypes} from "react";
/**/
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Button from "react-bootstrap/lib/Button";

const FilterView = ({text, month, onSearchChange, onMonthChange, onClearSearch}) => {


    return (
        <FormGroup controlId="formSearchText">
            <ControlLabel>Search:</ControlLabel>
            {' '}&nbsp;
            <FormControl type="text"
                         placeholder="Search Text"
                         value={text}
                         onChange={(e) => onSearchChange(e.target.value)}
            />
            {'  '}&nbsp;&nbsp;
            <ControlLabel>Target Month:</ControlLabel>
            {'  '}&nbsp;
            <FormControl type="month" value={month} onChange={(e) => onMonthChange(e.target.value)}/>
            &nbsp;
            {(text || month) ? <Button onClick={onClearSearch}>Clear</Button> : ''}
        </FormGroup>

    );


};


FilterView.propTypes = {
    text: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func,
    month: PropTypes.string

};


export default FilterView;