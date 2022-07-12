const API_KEY = process.env.NEXT_PUBLIC_MAILCHIMP_API_KEY
const API_SERVER = process.env.NEXT_PUBLIC_MAILCHIMP_API_SERVER
const AUDIENCE_ID = process.env.NEXT_PUBLIC_MAILCHIMP_AUDIENCE_ID

const base64ApiKey = Buffer.from(`anystring:${API_KEY}`).toString("base64")

export default async (req, res) => {
  const { email } = req.body

  if (!email || !email.length) {
    return res.status(400).json({ error: "Email is required" })
  }

  const fetchUrl = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`

  const fetchOptions = {
    method: "POST",
    headers: {
      Authorization: `apiKey ${base64ApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_address: email,
      status: "subscribed",
    }),
  }

  try {
    const response = await fetch(fetchUrl, fetchOptions)
    console.log(response)

    if (response.status >= 400) {
      return res.status(400).json({
        error: `There was an error subscribing to the newsletter.`,
      })
    }
    return res.status(201).json({ message: "success" })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
}
