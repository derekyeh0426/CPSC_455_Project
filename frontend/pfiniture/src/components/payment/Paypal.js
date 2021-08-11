import { useEffect, useRef } from "react";

export default function Paypal(props) {
    const paypal = useRef()

    useEffect(() => {
        console.log(props.address);
        console.log(props.total);
        let total = props.total
        console.log(total);
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units:[
                        {
                            description: "test object",
                            amount:{
                                currency_code: "CAD",
                                value: total,
                            },
                        },
                    ]
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