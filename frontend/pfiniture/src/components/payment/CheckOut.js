import React, { useState } from "react";
import Paypal from "./Paypal"



const CheckOut = () =>{
    const [checkout, setCheckOut] = useState(false);

    return(
        <div className = "checkout">
            {checkout?(
            <Paypal/>
            ) : (
                <button
                onClick = { () => {
                    setCheckOut(true);
                }}
                >
                    CheckOut
                </button>
            ) 
            }
        </div>
    );
}

export default CheckOut;