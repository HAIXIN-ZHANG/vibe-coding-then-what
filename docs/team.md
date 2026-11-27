# Team

**Current mode: dual (Codex + Claude).** Codex has no quota at the moment, so its tasks wait. Claude does not take them over unless the author says so.

This page says which AI wears each role right now ([PDR-008](decisions/pdr-008-roles-and-modes.md)). To switch modes, change only the mode line and the table below.

| Role | Held by now | Card |
| --- | --- | --- |
| PM | Claude | [pm](roles/pm.md) |
| Designer | Claude | [designer](roles/designer.md) |
| Delivery Lead | Claude | [delivery-lead](roles/delivery-lead.md) |
| Writer | Codex. Claude writes revision plans and reference samples | [writer](roles/writer.md) |
| Developer | Codex | [developer](roles/developer.md) |
| Audience panel | The model that did not write the piece | [audience-panel](roles/audience-panel.md) |
| Author | Jason Zhang (pen name 缸子太子与世界) | — |

## Other modes

| Mode | Change to make |
| --- | --- |
| Codex only | Codex holds every role. Use a separate session per role, and never review in the session that did the work. Review records say "same model, fresh session" |
| Claude only | Claude holds every role, under the same rule |

## Starting a session

1. State the role you are wearing.
2. Read its card, the roadmap's **Now** section and your task file.
3. If the role you are asked to take is not held by your tool in the current mode, say so and stop.
