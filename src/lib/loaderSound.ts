// A single shared <audio> instance for the loader's glitch sound.
//
// Browsers block audio-with-sound from playing until the page has received a
// real user gesture (click, keydown, touch) at least once. We can't
// guarantee that's happened before the loader's own hold window ends on a
// truly cold first visit - but once *any* gesture happens anywhere in the
// session (a nav click, a keypress, tapping to skip a later loader replay),
// this same element stays "unlocked" for the rest of the session. So we
// arm it as early and as broadly as possible instead of only listening
// during the loader itself.

const sound = typeof Audio !== 'undefined' ? new Audio('/loader-glitch.wav') : null

let unlocked = false
let armed = false

function unlock() {
  if (unlocked || !sound) return
  unlocked = true
  sound.play().then(() => {
    sound.pause()
    sound.currentTime = 0
  }).catch(() => {
    // still locked (e.g. no real gesture yet) - next gesture will retry
    unlocked = false
  })
}

export function armLoaderSoundUnlock() {
  if (armed || typeof window === 'undefined') return
  armed = true
  const events: (keyof WindowEventMap)[] = ['pointerdown', 'keydown', 'touchstart']
  const handler = () => {
    unlock()
    events.forEach(e => window.removeEventListener(e, handler))
  }
  events.forEach(e => window.addEventListener(e, handler, { capture: true }))
}

export function playLoaderSound() {
  if (!sound) return
  sound.currentTime = 0
  sound.play().catch(() => {
    // no gesture yet anywhere in the session - sound skipped, dissolve
    // continues regardless
  })
}
