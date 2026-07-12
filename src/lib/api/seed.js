// One-time content seeding from the bundled static data (src/data/site.js).
// Runs only when a table is empty and an admin is signed in (RLS enforces the
// latter). Image references keep their original filenames so the public site's
// img() helper resolves them from the local asset bundle.
import { supabase, isSupabaseConfigured } from '../supabase'
import {
  PROJECTS,
  SERVICE_CATEGORIES,
  TESTIMONIALS,
  PARTNERS,
  COMPANY,
  STATS,
} from '../../data/site'
import { logActivity } from '../activity'

async function isEmpty(table) {
  const { count } = await supabase.from(table).select('*', { count: 'exact', head: true })
  return (count || 0) === 0
}

async function seedProjects() {
  if (!(await isEmpty('projects'))) return 0
  let order = 0
  for (const p of PROJECTS) {
    const { data, error } = await supabase
      .from('projects')
      .insert({
        title: p.name,
        slug: p.slug,
        category: p.category,
        location: p.location,
        completion_date: `${p.year}-06-01`,
        short_desc: p.blurb,
        full_desc: p.blurb,
        cover_url: p.cover,
        status: p.status?.toLowerCase().includes('complete') ? 'Completed' : 'Ongoing',
        // Honor an explicit `featured` flag from site.js; otherwise feature the first few.
        featured: p.featured != null ? p.featured : order < 3,
        display_order: order++,
        details: {
          year: p.year,
          scope: p.scope || [],
          size: p.size,
          duration: p.duration,
          budget: p.budget,
          challenge: p.challenge,
          solution: p.solution,
        },
      })
      .select()
      .single()
    if (error) throw error
    const gallery = p.gallery?.length ? p.gallery : [p.cover]
    await supabase
      .from('project_images')
      .insert(gallery.map((url, sort) => ({ project_id: data.id, url, sort })))
  }
  return PROJECTS.length
}

async function seedServices() {
  if (!(await isEmpty('services'))) return 0
  const rows = SERVICE_CATEGORIES.map((s, i) => ({
    name: s.title,
    slug: s.slug,
    icon: s.icon,
    short_desc: s.blurb,
    full_desc: (s.items || []).join('\n'),
    featured: i < 3,
    display_order: i,
  }))
  const { error } = await supabase.from('services').insert(rows)
  if (error) throw error
  return rows.length
}

async function seedTestimonials() {
  if (!(await isEmpty('testimonials'))) return 0
  const rows = TESTIMONIALS.map((t, i) => ({
    quote: t.quote,
    name: t.name,
    role: t.role,
    rating: t.rating || 5,
    photo_url: t.photo,
    featured: true,
    display_order: i,
  }))
  const { error } = await supabase.from('testimonials').insert(rows)
  if (error) throw error
  return rows.length
}

async function seedPartners() {
  if (!(await isEmpty('partners'))) return 0
  const rows = PARTNERS.map((name, i) => ({ name, display_order: i }))
  const { error } = await supabase.from('partners').insert(rows)
  if (error) throw error
  return rows.length
}

async function seedSettingsAndHomepage() {
  if (await isEmpty('site_settings')) {
    await supabase.from('site_settings').insert({
      id: 1,
      value: {
        company: COMPANY.full,
        tagline: COMPANY.tagline,
        email: COMPANY.email,
        phone: COMPANY.phone,
        phone2: COMPANY.phone2,
        whatsapp: COMPANY.whatsapp,
        address: COMPANY.address,
        hours: COMPANY.hours,
        socials: COMPANY.socials,
      },
    })
  }
  if (await isEmpty('homepage_content')) {
    await supabase.from('homepage_content').insert([
      { key: 'hero', value: { tagline: COMPANY.tagline } },
      { key: 'stats', value: { items: STATS } },
    ])
  }
}

// Seed everything that's empty. Returns a summary map of inserted counts.
export async function seedAllContent() {
  if (!isSupabaseConfigured) throw new Error('Supabase is not configured')
  const summary = {
    projects: await seedProjects(),
    services: await seedServices(),
    testimonials: await seedTestimonials(),
    partners: await seedPartners(),
  }
  await seedSettingsAndHomepage()
  await logActivity('seeded', 'content', null, summary)
  return summary
}

// True if there's no project content yet (used to prompt first-run seeding).
export async function needsSeeding() {
  if (!isSupabaseConfigured) return false
  return isEmpty('projects')
}
