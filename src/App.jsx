import { useEffect, useMemo, useState } from 'react'
import Spline from '@splinetool/react-spline'

const BACKEND = import.meta.env.VITE_BACKEND_URL || ''

const africanCountries = [
  'Nigeria','South Africa','Kenya','Ghana','Egypt','Ethiopia','Morocco','Algeria','Tunisia','Uganda','Tanzania','Rwanda','Ivory Coast','Senegal','Cameroon','Zambia','Zimbabwe','Botswana','Namibia','Mozambique','Angola','Sudan','South Sudan','Somalia','DR Congo','Congo','Gabon','Benin','Togo','Burkina Faso','Mali','Niger','Liberia','Sierra Leone','Guinea','Guinea-Bissau','Gambia','Cape Verde','Mauritania','Eritrea','Djibouti','Madagascar','Seychelles','Mauritius','Comoros','Lesotho','Eswatini','Central African Republic','Equatorial Guinea','Burundi']

function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7851A9] to-[#D4AF37] flex items-center justify-center shadow-lg">
              <span className="text-white font-black">H</span>
            </div>
            <div className="leading-tight">
              <div className="text-white font-extrabold tracking-wide text-lg drop-shadow">Heritage x Hustle</div>
              <div className="text-[11px] text-purple-100/90">African Professionals Network</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-white/90">
            <a href="#search" className="hover:text-white transition">Find Talent</a>
            <a href="#events" className="hover:text-white transition">Events</a>
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#feed" className="hover:text-white transition">Social Feed</a>
          </nav>
          <button className="md:hidden inline-flex items-center justify-center px-3 py-1.5 rounded-md bg-white/10 text-white border border-white/10 text-sm">
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}

function Hero({ onSearch }) {
  const [q, setQ] = useState('')
  const [country, setCountry] = useState('')

  function submit(e){
    e.preventDefault()
    onSearch({ q, state: country })
  }

  return (
    <section id="search" className="relative h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/JqBuM4DcZiGXqO-1/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.20),transparent_60%)]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 h-full flex items-center">
        <div className="text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-lg">
            Heritage x Hustle
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-purple-100/90 max-w-2xl">
            A community of African networking professionals championing culture, collaboration, and world-class execution.
          </p>
          <form onSubmit={submit} className="mt-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 sm:p-4 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                value={q}
                onChange={(e)=>setQ(e.target.value)}
                placeholder="Search by role, skill or name (e.g. Product Manager, Cloud, Ayo)"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
              <select
                value={country}
                onChange={(e)=>setCountry(e.target.value)}
                className="px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#7851A9]"
              >
                <option value="">All Countries</option>
                {africanCountries.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <button type="submit" className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#7851A9] text-white font-semibold shadow-lg hover:opacity-95">
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

function SectionTitle({ eyebrow, title, subtitle }){
  return (
    <div className="text-center mb-8">
      <div className="text-[#D4AF37] font-semibold tracking-wider uppercase text-xs">{eyebrow}</div>
      <h2 className="mt-1 text-3xl sm:text-4xl font-black text-gray-900">{title}</h2>
      {subtitle && <p className="mt-2 text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  )
}

function ProfessionalsGrid({ items }){
  if (!items || items.length === 0){
    return (
      <div className="text-center text-gray-600">No professionals found yet.</div>
    )
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p, idx)=> (
        <div key={p._id || idx} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7851A9] to-[#D4AF37] text-white font-bold flex items-center justify-center">
              {p.name?.[0] || 'H'}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{p.name || 'Unnamed'}</div>
              <div className="text-sm text-gray-600">{p.title || 'Professional'}</div>
            </div>
          </div>
          {p.skills?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {p.skills.slice(0,6).map((s,i)=> (
                <span key={i} className="text-xs px-2 py-1 rounded-full bg-purple-50 text-[#7851A9] border border-purple-100">{s}</span>
              ))}
            </div>
          ) : null}
          <div className="mt-4 text-sm text-gray-500">
            {(p.city? p.city + ', ' : '') + (p.state || '')}
          </div>
        </div>
      ))}
    </div>
  )
}

function EventsList({ items }){
  if (!items || items.length === 0){
    return <div className="text-center text-gray-600">No upcoming events yet.</div>
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((e, idx)=> (
        <div key={e._id || idx} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          {e.cover_image ? (
            <img src={e.cover_image} alt={e.title} className="w-full h-40 object-cover" />
          ) : (
            <div className="w-full h-40 bg-gradient-to-br from-purple-100 to-yellow-100" />
          )}
          <div className="p-5">
            <div className="text-sm text-[#7851A9] font-semibold">{new Date(e.start_time).toLocaleString()}</div>
            <div className="mt-1 font-bold text-gray-900">{e.title}</div>
            <div className="mt-1 text-sm text-gray-600 line-clamp-3">{e.description}</div>
            {e.location && <div className="mt-3 text-sm text-gray-500">{e.location}{e.state? ` • ${e.state}`:''}</div>}
            {e.registration_url && <a href={e.registration_url} target="_blank" className="mt-3 inline-block text-sm font-semibold text-[#7851A9] hover:underline">Register</a>}
          </div>
        </div>
      ))}
    </div>
  )
}

function FeedList({ items }){
  if (!items || items.length === 0){
    return <div className="text-center text-gray-600">No posts yet.</div>
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((p, idx)=> (
        <div key={p._id || idx} className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
          {p.media_urls?.length ? (
            <img src={p.media_urls[0]} alt={p.title} className="w-full h-48 object-cover" />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-yellow-100" />
          )}
          <div className="p-5">
            <div className="text-xs uppercase tracking-wide text-[#D4AF37] font-semibold">{p.kind}</div>
            <div className="mt-1 font-bold text-gray-900">{p.title}</div>
            {p.body && <div className="mt-1 text-sm text-gray-600 line-clamp-3">{p.body}</div>}
            <div className="mt-3 text-xs text-gray-500">{p.published_at ? new Date(p.published_at).toLocaleDateString(): ''}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function App(){
  const [loading, setLoading] = useState(false)
  const [professionals, setProfessionals] = useState([])
  const [events, setEvents] = useState([])
  const [posts, setPosts] = useState([])

  async function fetchProfessionals(params={}){
    setLoading(true)
    try {
      const u = new URL(BACKEND + '/api/professionals')
      if (params.q) u.searchParams.set('q', params.q)
      if (params.state) u.searchParams.set('state', params.state)
      const res = await fetch(u)
      const data = await res.json()
      setProfessionals(data.items || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function fetchEvents(){
    try {
      const res = await fetch(BACKEND + '/api/events?only_future=true')
      const data = await res.json()
      setEvents(data.items || [])
    } catch (e) { console.error(e) }
  }

  async function fetchPosts(){
    try {
      const res = await fetch(BACKEND + '/api/posts')
      const data = await res.json()
      setPosts(data.items || [])
    } catch (e) { console.error(e) }
  }

  useEffect(()=>{
    fetchProfessionals({})
    fetchEvents()
    fetchPosts()
  },[])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50/40 to-white">
      <Header />
      <Hero onSearch={fetchProfessionals} />

      <main className="relative z-10 -mt-12">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-purple-100/60 shadow-xl">
            <SectionTitle eyebrow="Network" title="Meet the Professionals" subtitle="Search and discover African experts ready to collaborate." />
            {loading ? (
              <div className="text-center py-10 text-gray-600">Loading...</div>
            ) : (
              <ProfessionalsGrid items={professionals} />
            )}
          </div>
        </section>

        <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <SectionTitle eyebrow="Events" title="Upcoming Events" subtitle="Workshops, mixers, and conferences across the continent and diaspora." />
          <EventsList items={events} />
        </section>

        <section id="about" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-br from-[#7851A9]/10 to-[#D4AF37]/10 border border-purple-100 rounded-2xl p-8">
            <SectionTitle eyebrow="About" title="About Heritage x Hustle" />
            <p className="text-gray-700 leading-relaxed">
              Heritage x Hustle is a community of African professionals dedicated to elevating our craft and our culture. We connect talent across industries, create opportunities through events and mentorship, and showcase excellence rooted in heritage. Professional, bold, and proudly African.
            </p>
          </div>
        </section>

        <section id="feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-20">
          <SectionTitle eyebrow="Stories" title="Social Feed" subtitle="Past events, blogs, and media from our community." />
          <FeedList items={posts} />
        </section>
      </main>

      <footer className="border-t mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-sm text-gray-600">© {new Date().getFullYear()} Heritage x Hustle</div>
          <div className="text-sm text-gray-600">Built with pride in gold and royal purple</div>
        </div>
      </footer>
    </div>
  )
}
