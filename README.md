# Cassidy Harman static travel blog

A standalone HTML, CSS, and JavaScript site inspired by the Cassidy Harman
Squarespace fluid demo. It keeps the design close to the original's quiet blog
archive style with restrained typography, simple post lists, archive search,
and a static newsletter form interaction.

## Structure

- `index.html` - homepage with five latest travel posts and five latest food posts
- `pages/travel.html` - full travel archive
- `pages/food.html` - full food archive
- `pages/about.html` - standalone About page
- `pages/post.html` - shared reader page for individual blog posts
- `feed.xml` - RSS feed for anonymous updates without email signup
- `pictures/` - place future site images here
- `styles.css` and `script.js` - shared static styling and interactions

## Newsletter privacy setup

The email signup is connected through FormSubmit, a no-registration static form
relay. It forwards subscriber emails to the address configured by
`data-signup-recipient-token` on the homepage newsletter form.

To collect subscribers while keeping the site owner's identity separate:

1. Create an email alias with an alias provider such as SimpleLogin, DuckDuckGo
   Email Protection, Firefox Relay, or a dedicated Proton alias.
2. Use a no-card form relay that can forward submissions to that alias, such as
   FormSubmit.
3. Base64-encode the destination alias and set it as the homepage form's
   `data-signup-recipient-token` in `index.html`.
4. Submit the form once on the live site and confirm the activation email sent
   by FormSubmit.

Example:

```html
<form
  class="newsletter-form"
  id="newsletterForm"
  method="post"
  data-signup-recipient-token="eW91ci1uZXdzbGV0dGVyLWFsaWFzQGV4YW1wbGUuY29t"
  novalidate
>
```

Generate a token locally with:

```bash
printf '%s' 'your-newsletter-alias@example.com' | base64
```

This keeps any personal inbox or payment details out of the repository. The RSS
feed remains available for readers who do not want to submit an email address.

## Run locally

Open `index.html` directly in a browser, or serve the directory with any static
server:

```bash
python3 -m http.server 8000
```
