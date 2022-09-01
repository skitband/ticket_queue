import React, {useState, useEffect} from 'react'
import Counter from './components/Counter'

function Admin() {

    const [counter, setCounter] = useState<any>()

    useEffect(() => {
        const getCounterList = async () => {
          let response = await fetch('http://localhost:5000/api/listCounter')
          const data = await response.json()
          setCounter(data)
        }
    
        getCounterList()
    }, [])

    return (
        <div>
            <h1>Counter Management</h1>
            <div className='window_three'>
                <div className="counter_box">
                    {counter?.map((val: any, index: number) => {
                        return <Counter key={index} number={val.counter_no} status={val.counter_status} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Admin