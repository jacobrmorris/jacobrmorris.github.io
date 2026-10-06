# jacobrmorris.com

Personal academic website, built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages. Pushing to `master` publishes the site, and GitHub rebuilds it in about a minute.

All content lives in **`_data/`**, so most updates mean editing a short YAML file. You won't need to touch the HTML.

## Where things live

| To change…                                 | Edit                                     |
| ------------------------------------------ | ---------------------------------------- |
| Bio, title, email, photo, profile links    | `_data/profile.yml`                      |
| Papers (titles, abstracts, PDFs, figures)  | `_data/research.yml`                     |
| Coauthor websites                          | `_data/coauthors.yml`                    |
| Teaching (hidden until this file has entries) | `_data/teaching.yml`                  |
| Letter writers (shown in job-market mode)  | `_data/references.yml`                   |
| CV                                         | replace `JacobMorris_cv.pdf` (same name) |
| Colors, fonts, spacing                     | top of `assets/css/site.css`             |

```
_data/          content (YAML)
_includes/      page sections: head, header, paper, research, teaching, …
_layouts/       the page shell
_figures/       vector originals of figures (not published)
assets/         css, js, fonts, images and web-ready figures
index.html      the home page (the whole site): profile column + research column
404.html        "page not found"
research.html, teaching.html, cv.html   redirects that keep old links and /cv working
```

## Job-market mode

In `_data/profile.yml`, set `job_market.enabled: true` and check `season`. That switch:

- adds an "On the 2027–2028 academic job market" badge above your bio;
- pulls the paper marked `jmp: true` in `research.yml` to the top as **Job Market Paper**, with its abstract shown, and adds a **Job Market Paper** link above your email and CV in the left column;
- shows the **References** section, using `_data/references.yml`.

Before turning it on, make sure that the JMP entry has `jmp: true` and a `links` entry pointing to the PDF (the first link is what the title and the left-column link point to), that `references.yml` is filled in, and that the CV is current. Job-market mode also changes the page title and search description to say you're on the market.

Two habits that most candidate sites miss:

- **Date the draft.** Add `note: Latest version October 2027` to the JMP entry, and update it whenever you replace the PDF.
- **Switch it off afterwards.** Once you've placed, set `enabled: false` and update `position`. Several 2025–26 candidates' sites still said "on the job market" a year later.

## Posting a paper

1. Put the PDF in `papers/`, using a short, permanent name such as `papers/morris-advance-notice.pdf`.
2. Add it to the paper in `research.yml`:
   ```yaml
   links:
     - label: Paper
       url: /papers/morris-advance-notice.pdf
     - label: Slides
       url: /papers/morris-advance-notice-slides.pdf
   ```
3. **Never rename or move a posted PDF. Overwrite it with the new draft instead.** GitHub Pages can't redirect a moved file, so links break and Google Scholar loses the paper.

Google Scholar indexes PDFs linked from this page when the PDF meets these conditions:
- the title is in large type at the top of page 1, with the authors on the line below;
- it has a "References" section;
- it's text-based rather than scanned, and under 5 MB.

Use exactly the same title and author name everywhere you post it (SSRN, Scholar profile, CV).

## Figures

Export the figure from Stata as a PDF into `_figures/`, then make the web version:

```sh
pdftoppm -png -r 300 -singlefile _figures/NAME.pdf /tmp/NAME
cwebp -lossless -z 9 /tmp/NAME.png -o assets/figures/NAME.webp
```

Then reference it under `figures:` in `research.yml`, with `alt` text that describes what the figure shows.

## Preview locally

One-time setup:

```sh
brew install ruby@3.3
export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"
bundle install
```

Then, from this folder:

```sh
export PATH="/opt/homebrew/opt/ruby@3.3/bin:/opt/homebrew/lib/ruby/gems/3.3.0/bin:$PATH"
bundle exec jekyll serve --livereload
```

Open <http://localhost:4000>. Edits to `_data/` reload automatically; edits to `_config.yml` need a restart. The `Gemfile` pins the same Jekyll version GitHub Pages uses, so what you see locally is what gets published.

## Publishing

Commit and push to `master`. You can follow the build under the repository's **Actions** tab ("pages build and deployment"). If a build fails, the previous version stays live.

## Credits

Headings are set in [Newsreader](https://github.com/productiontype/Newsreader) (SIL Open Font License, `assets/fonts/OFL.txt`), and the icons come from [Lucide](https://lucide.dev) (ISC License).
