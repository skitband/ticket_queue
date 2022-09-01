
import React from 'react'

function ClientCounter(props: any) {

    const propsData = {
        counter_number: props.number,
        counter_status: props.status,
        on_queue: props.on_queue,
        isOnline: props.isOnline
    }

    return (
        <div className={propsData.isOnline ? "counter_box" : "counter_box offline"}>
            <div className='counter_status' style={{backgroundColor: propsData.counter_status ? 'green' : 'red'}}></div>
            <h3>Counter {propsData.counter_number} </h3>
            <span>{propsData.isOnline ? propsData.on_queue : 'offline' }</span>
        </div>
    )
}

export default ClientCounter