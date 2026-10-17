# VESPER / 01

A cinematic automotive design study with interactive finishes and detail exploration.

Автомобильная презентация: оригинальный AI-рендер, четыре световых этюда, три детали, экспорт выбранного варианта.

![Original AI-generated concept render (not a browser screenshot)](dist/assets/vesper-hero.webp)

*Original AI-generated concept render (not a browser screenshot).*

## Explore

- [Public demo](https://safal207.github.io/vesper-automotive-concept/)
- [Portfolio and learning paths](https://safal207.github.io/test-it-python/ai-path/)
- [Scope, contribution and evidence](PORTFOLIO.md)

## Features

- Four visual grading treatments on one original render
- Three detail views with accessible pressed states
- JSON export of selected finish and detail
- Responsive editorial layout and reduced-motion support

## Run locally

No package installation, API keys or CDN are required. Serve the static directory:

```bash
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. Opening index.html directly as file:// is not supported because the application uses browser modules.

## Validate

```bash
npm run check
```

Checks cover local links, unique HTML IDs, JavaScript syntax and relevant state/export contracts. This is not a browser-rendering certification.

## Scope and limitations

- Fictional visual concept, not a production automobile.
- Finish selection is image grading, not a physically accurate paint configurator.
- No engineering specifications, customers or commercial results are claimed.

## Credits and licensing

Code and vector artwork are original project work, created with AI assistance. VESPER uses an original AI-generated fictional vehicle render.

Creative direction and implementation: Alexey Safonov, with AI assistance. Code under MIT; preserve all third-party notices. Inspiration: the supplied Meng To visual references. No commercial relationship or endorsement is implied.
