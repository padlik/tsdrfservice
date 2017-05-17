/**
 * Created by paul on 5/4/17.
 */
import React, {Component} from "react";
import Grid from "react-bootstrap/lib/Grid";
import Navbar from "react-bootstrap/lib/Navbar";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import SummaryPanel from "components/SummaryPanel";
import ListViewPanel from "components/ListViewPanel";

import "./bootstrap.css";
import "./react-bootstrap-table.min.css";


class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to='/'>Timesheets</Link>
                            </Navbar.Brand>
                        </Navbar.Header>
                    </Navbar>
                    <Grid>
                        <Switch>
                            <Route exact path="/" component={SummaryPanel}/>
                            <Route path="/:userid" component={ListViewPanel}/>
                        </Switch>
                    </Grid>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;