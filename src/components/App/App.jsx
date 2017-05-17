/**
 * Created by paul on 5/4/17.
 */
import React, {Component} from "react";
import Grid from "react-bootstrap/lib/Grid";
import Navbar from "react-bootstrap/lib/Navbar";
import {BrowserRouter, Link, Route} from "react-router-dom";
import FilterPanel from "components/FilterPanel";
import TablePanel from "components/TablePanel";

import "./bootstrap.css";


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
                        <Route exact path="/" component={FilterPanel}/>
                        {'  '}
                        <hr />
                        <Route path="/" component={TablePanel}/>
                    </Grid>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;