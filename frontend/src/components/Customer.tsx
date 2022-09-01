import React, {useState, useEffect} from 'react'
import ClientCounter from './ClientCounter'

function Customer() {

    const [counterNumber, setCounterNumber] = useState<number>()
    const [lastNumber, setlastNumber] = useState<number>()
    const [counter, setCounter] = useState<any>()

    useEffect(() => {

        const getCounterList = async () => {
            let response = await fetch('http://localhost:5000/api/listCounter')
            const data = await response.json()
            setCounter(data)
        }

        const nowServing = async () => {
            let response = await fetch('http://localhost:5000/api/nowServing')
            const data = await response.json()
            setCounterNumber(data[0].on_queue)
        }

        const lastNumber = async () => {
            let response = await fetch('http://localhost:5000/api/lastTicket')
            const data = await response.json()
            setlastNumber(data[0].queue_number)
        }

        // clear interval
        const counter = setInterval(() => {
            getCounterList()
            nowServing()
            lastNumber()
        }, 1000);
        return () => clearInterval(counter);

    }, [])
    
    const requestTicket = async () => {
        const requestNumber = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            }
        };
        try {
            const fetchResponse = await fetch(`http://localhost:5000/api/takeNumber`, requestNumber);
            const data = await fetchResponse.json();
            setTimeout(() => {
                return alert(`Your ticket number is: ${data.insertId}`)
            }, 0);
        } catch (e) {
            return e;
        } 
    }

    return (
        <div>
            <h1>Customer View</h1>
            <div className='window_one'>
                <h2>Now Serving: <span>{counterNumber}</span></h2>
                <h2>Last Number: <span>{lastNumber}</span></h2>
                <div className='window_one_button'>
                    <button className='btn_take_number' onClick={requestTicket}>Take a Number</button>
                </div>
            </div>
            <div className='window_two'>
                {counter?.map((val: any, index: number) => {
                    return <ClientCounter key={index} number={val.counter_no} status={val.counter_status} on_queue={val.on_queue} isOnline={val.isOnline} />
                })}
            </div>
        </div>
    )
}

export default Customer