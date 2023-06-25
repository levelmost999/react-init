import React, { useState } from "react"

const Home = () => {
    const [state, setState] = useState<number>(0)
    const aa = () => {
        setState(state + 1)
    }
    return (
        <div>
            <h1 onClick={aa}> Home {state} Hello World </h1>
        </div>
    )
}
export default Home
