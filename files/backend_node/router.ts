import Event from './event'

export default function router(loadRoute, db) {
  loadRoute('/events', new Event(db))
}
