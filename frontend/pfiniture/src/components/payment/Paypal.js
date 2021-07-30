import { useEffect, useRef } from "react";
import { ReactReduxContext } from "react-redux";

export default function Paypal() {
    const paypal = useRef()

    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units:[
                        {
                            description: "test object",
                            amount:{
                                currency_code: "CAD",
                                value: 500.0,
                            },
                        },
                    ],
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                console.log(order);
            },
            onError: (err) => {
                console.log(err)
            },
        }).render(paypal.current)
    }, [])

    return (
        <div>
            <div ref = {paypal}></div>
        </div>
    )
}