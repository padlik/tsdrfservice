/**
 * Created by paul on 5/4/17.
 */
import React, {PropTypes} from "react";
import Row from "react-bootstrap/lib/Row";
import Col from "react-bootstrap/lib/Col";
import Grid from "react-bootstrap/lib/Grid";
import Navbar from "react-bootstrap/lib/Navbar";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import SummaryPanel from "components/SummaryPanel";
import ListViewPanel from "components/ListViewPanel";
import FilterPanel from "components/FilterPanel";
import LoadingOverlay from "components/LoadingOverlay";
import DetailFilterPanel from "components/DetailFilterPanel";
import InfoLabel from "components/InfoLabel";
import {connect} from "react-redux";


import "./bootstrap.css";
import "./react-bootstrap-table.min.css";
import "./loader.css";


//TODO: https://medium.com/@Scarysize/syncing-redux-stores-across-browser-tabs-fff04f975423
//Storage for actions to support tabs

//TODO: Cashing and updating

const App = ({ui}) => {
    
    return (
        <BrowserRouter>
            <Row>
                <Col md={12}>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to='/'>Sugar Timesheets</Link>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Navbar.Form pullLeft>
                                <Route exact path="/" component={FilterPanel}/>
                                <Route path="/ts/:userid" component={DetailFilterPanel}/>
                            </Navbar.Form>
                            <Navbar.Text pullRight>
                                <InfoLabel/>
                            </Navbar.Text>
                        </Navbar.Collapse>
                    </Navbar>
                    <Grid>
                        <LoadingOverlay isLoading={ui.loading}/>
                        <Switch>
                            <Route exact path="/" component={SummaryPanel}/>
                            <Route path="/ts/:userid" component={ListViewPanel}/>
                        </Switch>
                    </Grid>
                </Col>
            </Row>
        </BrowserRouter>
    );

};

App.PropTypes = {
    ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    ui: state.ui
});

//Disabled so will not flood the redux state
//scheduler();

export default connect(mapStateToProps)(App);
