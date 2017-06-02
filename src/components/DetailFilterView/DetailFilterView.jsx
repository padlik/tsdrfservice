import React, {Component, PropTypes} from "react";
/**/
import FormGroup from "react-bootstrap/lib/FormGroup";
import ControlLabel from "react-bootstrap/lib/ControlLabel";
import FormControl from "react-bootstrap/lib/FormControl";
import Checkbox from "react-bootstrap/lib/Checkbox";


class DetailFilterView extends Component {

    render() {
        const {text, month, onSearchChange, onMonthChange, inheritSearch, onInheritSearchChange} = this.props;
        return (
            <FormGroup controlId="formSearchText">
                <ControlLabel>Timesheet Search:</ControlLabel>
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
                <Checkbox inline checked={inheritSearch} onChange={(e) => onInheritSearchChange(e)}>Inherit from
                    Summary</Checkbox>
            </FormGroup>
        );
    }

}

DetailFilterView.propTypes = {
    text: PropTypes.string,
    onSearchChange: PropTypes.func.isRequired,
    onMonthChange: PropTypes.func.isRequired,
    month: PropTypes.string,
    inheritSearch: PropTypes.bool,
    onInheritSearchChange: PropTypes.func
};


export default DetailFilterView;