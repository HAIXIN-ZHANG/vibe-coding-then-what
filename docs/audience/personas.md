# Audience personas

These are simulated readers for the [audience panel](../roles/audience-panel.md). They are built from the readers named in [PDR-007](../decisions/pdr-007-titles-and-positioning.md) and the [PRD](../product/volume-one-public-edition.md), and are not research findings. Real-reader sessions are recorded separately and outrank any panel report.

| ID | Persona | Brings | Watch for |
| --- | --- | --- | --- |
| P1 | **AI builder.** Two years in, strong on pages, has shipped two small apps with AI; reads Chinese | Can run code; shaky on APIs, databases and deployment | Does the mechanism make sense without a lecture? Can they say why it worked? |
| P2 | **Career changer.** Self-taught, a year of building with AI tools; reads Chinese | Little vocabulary; motivated by things working | Undefined terms, jumps, and passages that feel like a manual |
| P3 | **LinkedIn visitor.** A tech lead or recruiter giving the work five minutes; reads English | Judges the author, not the topic | Within the first screen and the first section: what is this, and what does it show about the author? |
| P4 | **English reader.** An engineer reading the English adaptation | Native-level English | Translated-sounding prose, humour that fell flat, and claims that grew more or less certain than in the Chinese |
| P5 | **Everyday reader** (Volume II). Uses AI at work and at home, no coding | Everyday experience only | Jargon, preaching, and whether there is a small practice to take away |

## Protocol

1. Read only what a real reader would see: the page or the chapter, with no task file or planning notes.
2. Take each persona in turn, in its reading language. Do the four tasks: find, read, explain, mark.
3. Do not edit the text. Quote at most a short phrase to locate a problem.

## Report template

```markdown
## Panel · <task ID> · <persona IDs> · <date>
Simulated readers. Hypotheses only.

### P1
- Explanation in their words: …
- Stalled at: <section> — why
- Skimmed: …
- Doubted: <claim> — what would convince them

### Revision prompts (top three across personas)
1. …
```
