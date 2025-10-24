import { startTransition, useState, ViewTransition } from 'react'
import '$style/App.scss'
import { Spinner } from '../components/spinner'

function App() {

  return (
    <>
    <ViewTransition name="app-logo" onEnter={() => {
      startTransition(() => {})
    }} onShare={() => {
                console.log("shared transition")
            }}>
      <Spinner noAnim/>
    </ViewTransition>
    hello world
    </>
  )
}

export default App
