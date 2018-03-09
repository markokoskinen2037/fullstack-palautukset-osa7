import React from 'react'
import ReactDOM from 'react-dom'
import counterReducer from "./reducer"
import { createStore } from 'redux'

const store = createStore(counterReducer)

store.subscribe(() => {
    const storeNow = store.getState()
    console.log(storeNow)
})

const Statistiikka = () => {
    const palautteita = store.getState().good + store.getState().ok + store.getState().bad
    

    if (palautteita === 0) {
        return (
            <div>
                <h2>stataistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    const keskiarvo = (store.getState().good * 1 + store.getState().bad * -1) / palautteita
    const positiivisia = store.getState().good/palautteita

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{store.getState().good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{store.getState().ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{store.getState().bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{keskiarvo}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{positiivisia}</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={() => store.dispatch({ type: 'ZERO'})}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {


    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={() => store.dispatch({ type: 'GOOD' })}>hyvä</button>
                <button onClick={() => store.dispatch({ type: 'OK' })} > neutraali</button>
                <button onClick={() => store.dispatch({ type: 'BAD' })} > huono</button>
                <Statistiikka />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)