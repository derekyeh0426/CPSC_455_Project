import React, { useState } from "react";
import { Button } from 'react-bootstrap'
import Paypal from "./Paypal"

const CheckOut = () => {
    const [checkout, setCheckOut] = useState(false);

    return (
        <div className="checkout">
            {checkout
                ? <Paypal />
                :
                <Button
                    style={{margin: 5}}
                    variant="outline-dark"
                    onClick={() => { setCheckOut(true); }}
                >
                    CheckOut
                </Button>
            }
        </div>
    );
}

export default CheckOut;