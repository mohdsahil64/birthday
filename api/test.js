// Diagnostic endpoint — kholo: https://<your-site>.vercel.app/api/test
// Ye batayega ki env variables set hain ya nahi, aur ek TEST message
// bhejne ki koshish karega. Telegram ka poora response bhi dikhayega.
//
// SETUP hone ke baad is file ko delete kar dena (security ke liye).

export default async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  const report = {
    tokenSet: !!token,
    tokenPreview: token ? token.slice(0, 8) + '…' : null,
    chatIdSet: !!chatId,
    chatIdValue: chatId || null,
  }

  if (!token || !chatId) {
    return res.status(200).json({
      ok: false,
      problem: 'MISSING ENV VARS — Vercel me variables add karo aur REDEPLOY karo.',
      report,
    })
  }

  try {
    const tgRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: '✅ TEST message — agar ye Telegram pe aaya, to sab set hai!',
        }),
      },
    )
    const data = await tgRes.json()
    return res.status(200).json({
      ok: data.ok === true,
      report,
      telegramResponse: data,
      hint: data.ok
        ? 'SUCCESS! Telegram pe message aa gaya hoga. Ab is /api/test file ko delete kar do.'
        : 'Telegram ne reject kiya. Neeche "description" padho (aksar: chat not found = bot ko pehle Hi bhejo, ya galat chat id).',
    })
  } catch (err) {
    return res.status(200).json({ ok: false, report, error: String(err) })
  }
}
