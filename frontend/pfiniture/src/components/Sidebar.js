import React from 'react'

const Sidebar = () => {
    return (
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active" href="#">
                                    <span style={{paddingRight: "6px"}}>
                                        <i className="fas fa-home"></i>
                                    </span>
                            Dashboard <span className="sr-only">(current)</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                                    <span style={{paddingRight: "6px"}}>
                                        <i className="fas fa-barcode"></i>
                                    </span>
                            Orders
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                                    <span style={{paddingRight: "6px"}}>
                                        <i className="fas fa-shopping-cart"></i>
                                    </span>
                            Cart
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">
                                    <span style={{paddingRight: "6px"}}>
                                        <i className="fas fa-couch"></i>
                                    </span>
                            My Furnitures
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Sidebar