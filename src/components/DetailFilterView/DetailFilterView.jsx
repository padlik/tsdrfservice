import React, {PropTypes} from "react";
/**/
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";


const DetailFilterView = ({text, month, onSearchChange, onMonthChange, inheritSearch, onInheritSearchChange}) => {

    return (
        <FormGroup controlId="formSearchText">
            <ControlLabel>Search:</ControlLabel>
            {' '}&nbsp;
            <FormControl type="text"
                         placeholder="Search Text"
                         disabled={inheritSearch}
                         value={text}
                         onChange={(e) => onSearchChange(e.target.value)}
            />
            {'  '}&nbsp;&nbsp;
            <ControlLabel>Target Month:</ControlLabel>
            {'  '}&nbsp;
            <FormControl type="month" value={month} disabled={inheritSearch}
                         onChange={(e) => onMonthChange(e.target.value)}/>
            &nbsp;
            <Checkbox inline checked={inheritSearch} onChange={(e) => onInheritSearchChange(e)}>Same as
                Summary</Checkbox>
        </FormGroup>
    );


};

DetailFilterView.propTypes = {
    text: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    month: PropTypes.string,
    inheritSearch: PropTypes.bool,
    onInheritSearchChange: PropTypes.func
};


export default DetailFilterView;