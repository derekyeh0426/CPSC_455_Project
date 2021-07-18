import React from 'react'
import {Nav} from "react-bootstrap"
import { MY_ACCOUNT_VIEWS } from "../../constants"

const Sidebar = (props) => {
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                {Object.keys(MY_ACCOUNT_VIEWS).map((key) => {
                    let currView = MY_ACCOUNT_VIEWS[key]
                    return (
                        <Nav.Link key={key}
                                  onClick={() => {props.handleCurrentView(key)}}
                        >
                            {/*<a className="nav-link active">*/}
                                <span style={{paddingRight: "6px"}}><i className={currView.icon}/></span>
                                {currView.title}
                            {/*</a>*/}
                        </Nav.Link>
                    )
                })}
            </div>
        </nav>
    )
}

export default Sidebar