# 🚀 Quick Deployment Reference

## Vercel Deployment

### One-Command Deploy
```bash
vercel --prod
```

### What Happens Automatically
1. ✅ Runs `npm install`
2. ✅ Runs `npm run build:rs-ssr`
3. ✅ Deploys to Vercel with SSR enabled
4. ✅ Routes all traffic through `api/index.js`

---

## Configuration Summary

### vercel.json
- **Build**: `npm run build:rs-ssr`
- **Output**: `dist/`
- **Function**: `api/index.js` (handles all SSR)
- **Memory**: 1024 MB
- **Timeout**: 10 seconds

### Routes (All SSR-enabled)
- `/` - Landing page
- `/login` - Login
- `/register` - Register
- `/home` - Home (auth required)
- `/add` - Add item (auth required)
- `/setting` - Settings (auth required)
- `/detail/:id` - Item detail

---

## Testing Before Deploy

```bash
# Build production bundle
npm run build:rs-ssr

# Test locally
npm run preview:rs-ssr

# Visit http://localhost:80
```

---

## Troubleshooting

### Build fails?
- Check: `npm run build:rs-ssr` works locally
- Move production deps from `devDependencies` to `dependencies`

### No SSR (blank View Source)?
- Check Vercel function logs
- Verify `dist/server/index.js` exists after build
- Check function timeout (increase if needed)

### Static files 404?
- Verify `dist/static/` folder exists
- Check `outputDirectory: "dist"` in `vercel.json`

---

## Environment Variables

### Add on Vercel Dashboard:
1. Go to: Project → Settings → Environment Variables
2. Add your variables
3. Redeploy

---

## Deployment Checklist

- [ ] Test build locally: `npm run build:rs-ssr`
- [ ] Test server locally: `npm run preview:rs-ssr`
- [ ] Commit `vercel.json` changes
- [ ] Push to Git (for Git integration) OR run `vercel --prod`
- [ ] Verify SSR working (View Source should show content)
- [ ] Check all routes work
- [ ] Monitor Vercel function logs

---

## Key Files

| File | Purpose |
|------|---------|
| `vercel.json` | Vercel configuration |
| `api/index.js` | SSR serverless function |
| `prod-server.mjs` | Local production server (not used on Vercel) |
| `dist/` | Build output directory |
| `dist/server/index.js` | Server-side render bundle |
| `dist/index.html` | HTML template |

---

## Performance

- ✅ SSR for SEO and fast first paint
- ✅ Client-side hydration for interactivity
- ✅ Global CDN distribution
- ✅ Automatic HTTPS
- ✅ Static asset caching

---

## Support

- 📚 [Full Deployment Guide](./VERCEL_DEPLOYMENT.md)
- 🔗 [Vercel Docs](https://vercel.com/docs)
- 🔗 [RSbuild Docs](https://rsbuild.dev/)

---

**Last Updated**: 2024