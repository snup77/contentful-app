import { useState, useRef } from "react"

export default function SignupForm() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState("idle")
  const [errorMsg, setErrorMsg] = useState(null)

  const inputRef = useRef(null)

  const subscribeUser = async (e) => {
    e.preventDefault()

    const fetchUrl = "/api/subscribe"

    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: inputRef.current.value,
      }),
    }

    try {
      const response = await fetch(fetchUrl, fetchOptions).then((response) =>
        response.json()
      )
      console.log(response)
      setState('Success')
      setEmail('')
    } catch (e) {
      console.log(e.response.data.error)
      setErrorMsg(e.response.data.error)
      setState('Error')
    }


  }

  return (
    <form onSubmit={subscribeUser}>
      <div>
        <input
          required
          id="email-input"
          name="email"
          type="email"
          placeholder="What's your email address"
          ref={inputRef}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <button
          disabled={state === "Loading"}
          type="submit"
          className="form-btn"
        >
          Subscribe
        </button>
      </div>
      {state === "Error" && (
        <p>{errorMsg}</p>
      )}
      {state === "Success" && (
        <p>Awesome, you've been subscribed!</p>
      )}
    </form>
  )
}
