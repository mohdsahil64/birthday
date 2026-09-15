// Vercel Serverless Function — sends a Telegram notification.
// Token & chat id are read from environment variables (never exposed to the browser).
//
// Set these in Vercel -> Project -> Settings -> Environment Variables:
//   TELEGRAM_BOT_TOKEN  = <your bot token from @BotFather>
//   TELEGRAM_CHAT_ID    = <your chat id from @userinfobot>

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

  // Human-friendly messages per stage
  const messages = {
    opened: '🔓 Saima ne SURPRISE khol liya! (Website opened)',
    final_wish: '🎂❤️ Saima ne FINAL WISH dekh li! (Poori website complete)',
  }

  const when = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  let text
  if (stage === 'reply') {
    // Free-text reply written by Saima. Trim & cap to avoid abuse.
    const raw = (body && body.message ? String(body.message) : '').trim()
    const msg = raw.slice(0, 3000)
    if (!msg) {
      return res.status(400).json({ ok: false, error: 'Empty message' })
    }
    text = `💌 Saima ne REPLY bheja hai:\n\n"${msg}"\n\n🕒 ${when} (IST)`
  } else {
    text = (messages[stage] || `ℹ️ Event: ${stage}`) + `\n🕒 ${when} (IST)`
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
