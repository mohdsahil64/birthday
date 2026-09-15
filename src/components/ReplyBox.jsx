import { useState } from 'react'
import { motion } from 'framer-motion'
import { sendReply } from '../lib/track'

// A little reply box shown under the cake — Saima can write anything
// (any length) and it gets delivered to your Telegram.
export default function ReplyBox() {
  const [text, setText] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const submit = async (e) => {
    e.preventDefault()
    if (!text.trim() || status === 'sending') return
    setStatus('sending')
    const ok = await sendReply(text.trim())
    if (ok) {
      setStatus('sent')
      setText('')
    } else {
      setStatus('error')
    }
  }

  return (
    <motion.form
      onSubmit={submit}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6 }}
      className="mt-6 w-full max-w-md text-left"
    >
      <label className="mb-2 block font-script text-2xl text-romance-rose text-center">
        Kuch kehna hai Kuch Mujhse ?
      </label>

      {status === 'sent' ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-white/15 bg-white/5 px-5 py-4 text-center font-body text-white/90 backdrop-blur-sm"
        >
          Sended ✅
          <br />
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="mt-2 block w-full text-xs text-white/50 underline underline-offset-4"
          >
            Ek aur message bhejna hai?
          </button>
        </motion.p>
      ) : (
        <>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Type here anything....."
            className="w-full resize-y rounded-2xl border border-white/20 bg-white/5 px-4 py-3 font-body text-white placeholder-white/40 outline-none backdrop-blur-sm transition focus:border-romance-pink focus:ring-2 focus:ring-romance-pink/40"
          />
          <button
            type="submit"
            disabled={!text.trim() || status === 'sending'}
            className="glow-btn mt-3 w-full rounded-full bg-gradient-to-r from-romance-pink to-romance-purple px-6 py-3 font-body font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === 'sending' ? 'Bhej raha hai...' : 'Submit'}
          </button>
          {status === 'error' && (
            <p className="mt-2 text-center font-body text-sm text-romance-rose">
              Oops, bhej nahi payee. Thodi der baad try karna.
            </p>
          )}
        </>
      )}
    </motion.form>
  )
}
