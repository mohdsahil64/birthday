
export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    return res
      .status(500)
      .json({ ok: false, error: 'Server not configured (missing env vars)' })
  }

  // Read the event label sent from the browser
  let body = req.body
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body)
    } catch {
      body = {}
    }
  }
  const stage = (body && body.stage) || 'unknown'
  const visit = Number(body && body.visit) || 1
  const deviceId = (body && body.deviceId ? String(body.deviceId) : 'unknown').slice(0, 40)

  // Kya hua — chhoti clear line
  const actions = {
    opened: '🔓 Website OPEN ki',
    final_wish: '🎂 FINAL WISH tak pahunch gayi',
  }

  const when = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  // Sabse upar ek saaf header: NAYA ya DUPLICATE
  const header =
    visit <= 1
      ? '🆕 NAYA PHONE ne website kholi'
      : `🔁 DUPLICATE — yehi phone pehle bhi dekh chuka (${visit} baar)`

  let text
  if (stage === 'reply') {
    // Free-text reply written by Saima. Trim & cap to avoid abuse.
    const raw = (body && body.message ? String(body.message) : '').trim()
    const msg = raw.slice(0, 3000)
    if (!msg) {
      return res.status(400).json({ ok: false, error: 'Empty message' })
    }
    text = `💌 REPLY aaya:\n"${msg}"\n\n${header}\n🕒 ${when}`
  } else {
    const action = actions[stage] || `ℹ️ ${stage}`
    text = `${header}\n\n${action}\n🕒 ${when}`
  }

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      },
    )
    const data = await tgRes.json()
    if (!data.ok) {
      return res.status(502).json({ ok: false, error: data.description })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err) })
  }
}
