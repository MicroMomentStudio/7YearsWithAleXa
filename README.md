# AleXa 7th Debut Anniversary Digital Card

## Files
- `index.html` — page structure
- `style.css` — responsive styling
- `script.js` — clickable letter list and letter display
- `letters.json` — fan submissions

## Preview locally
Because the page loads `letters.json` with `fetch()`, open it through a local web server rather than double-clicking `index.html`. If you have Python installed, open a terminal in this folder and run:

    python -m http.server 8000

Then visit `http://localhost:8000`.

## Publish with GitHub Pages
1. Create a new GitHub repository.
2. Upload all four files to the repository's root folder.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save.
5. After GitHub Pages publishes the site, use the URL it provides.

## Editing submissions
Add or edit entries in `letters.json`. Each entry has `name`, `address` (the name the fan chose to use for AleXa), `year`, `songs` (up to three), and `message`. The page escapes submitted text before displaying it, so ordinary punctuation and emoji are fine.

## Notes
- This draft includes the 14 submissions supplied in the conversation.
- The response from `alex !` only contained two favourite songs, so the third slot is simply omitted.
- Please double-check the fan submissions for typos before publishing; messages have been kept close to the submitted wording.
