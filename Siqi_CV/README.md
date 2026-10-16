# CV source

`main.tex` is the editable LaTeX source for the 2027 RA / research internship CV.
It retains the original resume template and can be uploaded to the existing
Overleaf project. The Overleaf-hosted copy must be synced separately.

Compile with pdfLaTeX (Overleaf) or Tectonic:

```sh
tectonic main.tex
```

After rendering and checking both pages, copy `main.pdf` to
`../assets/resume_2027.pdf`. The homepage links to that PDF from
`_pages/includes/intro.md`. Older PDF filenames are historical versions.

Keep facts consistent with `_data/internships.yml`, `_data/projects.yml`, and
the homepage. In particular, ResMerge is listed as `Under Review` without a
conference affiliation, and the ego-view pipeline is described as incomplete.
