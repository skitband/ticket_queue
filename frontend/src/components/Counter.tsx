import React, {useState} from 'react'

function Counter(props: any) {
  
    const counter_number = props.number;

    const [isOnline, setIsOnline] = useState<boolean>(props.status) 

    const [nextTicket, setNextTicket] = useState<number>()

    const updateCounterStatus = async () => {
        const data = {
            counter_no: counter_number,
            status: !isOnline,
            isOnline: !isOnline
        }
        const request = {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data)
        };
        try {
            const fetchResponse = await fetch(`http://localhost:5000/api/updateCounter`, request);
            const data = await fetchResponse.json();
            setIsOnline(current => !current);
        } catch (err) {
            return err;
        }
    }

    const callNext = async () => {
        let response = await fetch(`http://localhost:5000/api/callNext/${counter_number}`)
        const data = await response.json()
        if(data.length > 0){
            setNextTicket(data[0].queue_number)
            console.log(nextTicket)
        }else{
            return alert("No tickets in the waiting queue");
        }
    }

    const completeTicket = async () => {
        let response = await fetch(`http://localhost:5000/api/completeTicket/${counter_number}`)
        const data = await response.json()
    }

    return (
        <div>
            <h3>Counter {counter_number} </h3>
            <button onClick={updateCounterStatus}>{ isOnline ? 'Go Offline' : 'Go Online'}</button>
            <button onClick={completeTicket}>Complete Current </button>
            <button onClick={callNext}>Call Next</button>
        </div>
    )
}

export default Counter