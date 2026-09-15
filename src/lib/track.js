// Sends a tracking "stage" event to our serverless function,
// which forwards a Telegram message.
//
// Behaviour:
//  - Har visit pe notification AAYEGA (koi de-dup nahi).
//  - Har device/browser ko ek unique ID diya jaata hai (localStorage).
//    => Same phone dobara khole to wahi ID + badha hua visit count jaayega,
//       jisse Telegram message me pata chalega "same phone, visit #2".
//    => Naya device => nayi ID => "NAYA device".
//  - Per-tab-session dedup taaki ek hi page-load pe double na bheje.

const sentThisLoad = new Set()

const DEVICE_KEY = 'saima_bday_device_id'
const VISIT_KEY = 'saima_bday_visit_count'

// Ek stable device id (localStorage me save, clear na ho tab tak same rahega)
function getDeviceId() {
  try {
    let id = localStorage.getItem(DEVICE_KEY)
    if (!id) {
      id =
        'dev_' +
        Math.random().toString(36).slice(2, 8) +
        Math.random().toString(36).slice(2, 6)
      localStorage.setItem(DEVICE_KEY, id)
    }
    return id
  } catch {
    return 'dev_unknown'
  }
}

// Is device ne kitni baar khola — count badhta rahega
function getVisitCount() {
  try {
    const n = parseInt(localStorage.getItem(VISIT_KEY) || '0', 10) + 1
    localStorage.setItem(VISIT_KEY, String(n))
    return n
  } catch {
    return 1
  }
}

// Visit count ek page-load pe ek hi baar badhe
let cachedVisit = null
function visitForThisLoad() {
  if (cachedVisit == null) cachedVisit = getVisitCount()
  return cachedVisit
}

function send(payloadObj) {
  const payload = JSON.stringify(payloadObj)
  // Sirf fetch use karte hain (sendBeacon + fetch dono chalne se double
  // message aa sakta tha). Ek hi request => ek hi notification.
  try {
    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: payload,
      keepalive: true,
    }).catch(() => {})
  } catch {
    /* give up silently — never break the UX */
  }
}

export function track(stage) {
  // Same page-load pe dobara na bheje (StrictMode double-render se bachao)
  if (sentThisLoad.has(stage)) return
  sentThisLoad.add(stage)

  send({
    stage,
    deviceId: getDeviceId(),
    visit: visitForThisLoad(),
  })
}

// Saima ka free-text reply Telegram pe bhejta hai. Returns true on success.
export async function sendReply(message) {
  try {
    const res = await fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        stage: 'reply',
        message,
        deviceId: getDeviceId(),
        visit: visitForThisLoad(),
      }),
    })
    const data = await res.json().catch(() => ({}))
    return !!(res.ok && data.ok)
  } catch {
    return false
  }
}
