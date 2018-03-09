import React from 'react';


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      form: "adsads"
    }
  }


  render() {
    const anecdotes = this.props.store.getState()


    anecdotes.sort(function (a, b) {
      return b.votes - a.votes
    })

    const addAnecdote = (event) => {
      event.preventDefault()
      const anecdoteObject = {
        content: this.state.form
      }
      this.state.store.dispatch({ type: "NEW", data: { content: "asd" } })
    }

    const test = (event) => {
      console.log("called?")
      event.preventDefault()
      this.setState({ form: event.target.value })
    }

    let handlePasswordChange = (event) => {
      this.setState({ form: event.target.value })
    }




    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.props.store.dispatch({ type: "VOTE", data: { id: anecdote.id } })}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>

        <form>
          <input
            onChange={this.handlePasswordChange}
          />
          <button type="submit">tallenna</button>
        </form>



      </div>
    )
  }
}

export default App