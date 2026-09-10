# NIGHTTOONS INDIA — Complete Admin + Public Site

Next.js + Supabase anime catalog with owner-only OTP admin access.

## Included
- Owner Gmail OTP login
- Protected admin dashboard
- Anime create/edit/delete
- Poster image upload to Supabase Storage
- Unlimited anime links
- Readable slugs
- Search by anime name
- Browser-only wishlist
- 3 Telegram channel cards
- Analytics for 24h / 7d / 30d / lifetime
- Public Home, Search, Wishlist, About, Telegram and anime detail pages
- Mobile responsive UI

## Setup
1. Create a Supabase project.
2. Run `supabase/schema.sql` in Supabase SQL Editor.
3. Enable Email authentication/OTP in Supabase Auth.
4. Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
OWNER_EMAIL=nighttoonsindia@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

5. Install dependencies: `npm install`
6. Start: `npm run dev`
7. Open `/admin/login` for owner access.

Never expose `SUPABASE_SERVICE_ROLE_KEY` to browser/client code.


## Production OTP redirect (Netlify)

In Supabase Dashboard → Authentication → URL Configuration set:

- Site URL: `https://nighttoons-india.netlify.app`
- Redirect URL: `https://nighttoons-india.netlify.app/auth/callback`
- Keep local development redirect: `http://localhost:3000/auth/callback`

The owner login sends OTP and also supports the email verification link. The verification callback redirects to `/admin/dashboard` after a valid session is created.
