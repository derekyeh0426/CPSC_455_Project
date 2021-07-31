import React from 'react'
import Sidebar from "./Sidebar"
import { MY_ACCOUNT_VIEWS } from "../../constants"

export class MyAccountDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currView: Object.keys(MY_ACCOUNT_VIEWS)[0]}
    }

    handleCurrentView = (key) => {
        this.setState({currView: key})
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <Sidebar handleCurrentView={this.handleCurrentView}/>
                    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center
                        pb-2 mb-3 border-bottom">
                            <h1 className="h2">{MY_ACCOUNT_VIEWS[this.state.currView].title}</h1>
                        </div>
                        {MY_ACCOUNT_VIEWS[this.state.currView].component}
                    </main>
                </div>
            </div>
        )
    }
}

export default MyAccountDisplay