/**
 * Created by paul on 5/4/17.
 */
import React, {Component} from "react";
import Grid from "react-bootstrap/lib/Grid";
import Navbar from "react-bootstrap/lib/Navbar";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import SummaryPanel from "components/SummaryPanel";
import ListViewPanel from "components/ListViewPanel";
import LoadingOverlay from "components/LoadingOverlay";
import {connect} from 'react-redux';
import {apiRequestSummary, summarySearchClear} from "redux/actions/searchActions";
import {bindActionCreators} from "redux";

import "./bootstrap.css";
import "./react-bootstrap-table.min.css";
import "./loader.css";


class App extends Component {

    componentDidMount() {
        if (this.props.data.length === 0) {
            this.props.actions.summarySearchClear();
            this.props.actions.apiRequestSummary();
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to='/'>Sugar Timesheets</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Navbar.Text>
                                {this.props.ui.message}
                            </Navbar.Text>
                            <Navbar.Text pullRight>
                                {(this.props.ui.loading) ? 'Loading...' : ((this.props.ui.errors.message) ? this.props.ui.errors.message : 'Success')}
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                    <LoadingOverlay isLoading={this.props.ui.loading}/>
                    <Grid>
                        <Switch>
                            <Route exact path="/" component={SummaryPanel}/>
                            <Route path="/ts/:userid" component={ListViewPanel}/>
                        </Switch>
                    </Grid>
                </div>
            </BrowserRouter>
        );
    }
}


const mapStateToProps = state => ({
    ui: state.ui,
    data: state.summary.summary
});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators({apiRequestSummary, summarySearchClear}, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(App);
