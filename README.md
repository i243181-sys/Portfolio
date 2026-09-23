# Mughees Hiader — Portfolio

A responsive portfolio built with the supplied Figma community template, React, TypeScript, Tailwind CSS, and Motion.

## Run locally

```sh
npm install
npm run dev
```

## Validate and build

```sh
npm run typecheck
npm run build
npm run preview
```

The production output is in `dist/`. Deploy it to any static host. For a subdirectory deployment, use `npm run build -- --base=/your-path/`.

## Content and design

- Content source: `../Mughees_Haider_AI_Engineer_CV_2Page_Final.pdf`. The download in `public/Mughees_Hiader_CV.pdf` corrects the name to Mughees Hiader as requested; all other CV text is unchanged. The original supplied PDF is preserved.
- Structured project and skill content: `src/app/data/portfolio.ts`.
- Design source: the supplied export of [AI Engineer Portfolio Website (Community)](https://www.figma.com/design/ns8aAitI7a6ok515xZYuXV/AI-Engineer-Portfolio-Website--Community-).
- Retains the template’s dark navy palette, gradient headings, split about/contact sections, project grid, timeline, and neural background. The hero pairs the introduction with the supplied portrait and stacks them on mobile.
- Project illustrations are abstract icon treatments, not product screenshots. The supplied photo is stored in `src/assets/mughees.png` and displayed in the hero and About section.
- The hero portrait follows mouse movement with a spring-smoothed tilt, subtle image parallax, and lighting. It resets on pointer exit and respects reduced-motion preferences and the existing pause control; touch scrolling remains native.
- Experience is explicitly project-based. The CV contains no employment, publications, or certifications.
- No repository, demo, or social-profile URLs were supplied; project buttons open accessible detail dialogs.
- The contact form prepares a `mailto:` draft in the visitor’s email app. It does not claim to send mail from the website. Direct email and copy-email actions are available.
- Scroll reveals respect reduced-motion preferences. The ambient canvas can be paused, stops in hidden tabs, and is static for reduced motion.

## Verification

`npm run typecheck` and `npm run build` pass. Chrome browser checks cover eight viewport sizes (320–1440px), project filtering, all six detail dialogs, keyboard navigation and focus restoration, additional-project disclosure, CV download integrity, contact validation, clipboard copying, encoded email drafts, scroll reveals, and motion controls.

No horizontal overflow, JavaScript/console errors, failed HTTP responses, or automated WCAG A/AA violations were found in those checks. Automated accessibility checks supplement manual keyboard and visual review; they are not a conformance certification.

Screenshots and the check report are saved in `artifacts/`. Browser testing used temporary Playwright and axe-core tooling outside the application dependencies. No email was sent during testing.

The enhanced design includes an interactive hero focus selector, six distinct abstract project illustrations, pointer lighting, reading progress, and ambient motion that respects both reduced-motion settings and the pause control.

The motion update takes inspiration from [Creative Mints’ Portfolio / Animation](https://dribbble.com/shots/24003762-Portfolio-Animation): masked, staggered headings, luminous orbital accents around the portrait, artwork reveals on project hover, and staged section entrances. It also adds magnetic hero buttons, a moving discipline ribbon, and animated project filtering. The photo and project content remain original to this portfolio; no reference artwork is embedded.

A floating pause button and the footer motion control share the same state. The live reduced-motion preference disables decorative motion, pointer effects, and animated layout changes; touch devices show project artwork without needing hover. Scrolling uses the browser’s native behavior.
