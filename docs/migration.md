# Migration checklist

Keep account details, domain names, DNS values, provider credentials, and deadlines in private operational notes.

- [x] Copy the frontend, retaining source attribution.
- [x] Remove the learning-project visitor counter.
- [x] Adapt frontend tests for static hosting.
- [x] Add CI checks and a GitHub Pages deployment workflow publishing only `frontend/`.
- [ ] Enable Pages and test its temporary URL.
- [ ] Back up the existing DNS configuration privately.
- [ ] Verify domain ownership and configure the custom domain.
- [ ] Prepare replacement website DNS and preserve email records.
- [ ] Check DNSSEC delegation before changing nameservers.
- [ ] Switch DNS only after the replacement configuration is ready.
- [ ] Verify HTTPS, email, and automatic deployments.
- [ ] Keep the previous hosting available through propagation and rollback testing.
- [ ] Disable obsolete deployment workflows and back up infrastructure state privately.
- [ ] Retire previous infrastructure after verification, removing state storage last.
- [ ] Check remaining resources and final billing.
- [ ] Archive the learning project after cleanup.
