const { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType, ShadingType, BorderStyle, AlignmentType, PageBreak } = require("docx");
const fs = require("fs");

const MAROON = "4C0014";
const ORANGE = "FE4701";
const WHITE = "FFFFFF";

function h1(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_1, spacing: { before: 400, after: 200 } });
}
function h2(text) {
  return new Paragraph({ text, heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 150 } });
}
function p(text, opts = {}) {
  return new Paragraph({ children: [new TextRun({ text, ...opts })], spacing: { after: 150 } });
}
function bullet(text, opts = {}) {
  return new Paragraph({ children: [new TextRun({ text, ...opts })], bullet: { level: 0 }, spacing: { after: 80 } });
}
function label(text) {
  return new Paragraph({ children: [new TextRun({ text, bold: true, color: MAROON })], spacing: { after: 60 } });
}

function fieldRow(fieldLabel, value) {
  return new TableRow({
    children: [
      new TableCell({
        width: { size: 2400, type: WidthType.DXA },
        shading: { type: ShadingType.CLEAR, fill: "F5F0F0" },
        children: [new Paragraph({ children: [new TextRun({ text: fieldLabel, bold: true })] })],
      }),
      new TableCell({
        width: { size: 7440, type: WidthType.DXA },
        children: [new Paragraph({ children: [new TextRun({ text: value })] })],
      }),
    ],
  });
}

function cardTable(rows) {
  return new Table({
    columnWidths: [2400, 7440],
    width: { size: 9840, type: WidthType.DXA },
    rows: rows.map(([l, v]) => fieldRow(l, v)),
  });
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 }, // A4
          margin: { top: 1000, bottom: 1000, left: 1200, right: 1200 },
        },
      },
      children: [
        new Paragraph({
          children: [new TextRun({ text: "MUSE STUDIOS", bold: true, size: 20, color: ORANGE })],
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Venture Card — First Product", size: 40, bold: true, color: MAROON })],
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [new TextRun({ text: "Executive Assistant / Employee Hub", size: 28, color: MAROON })],
          spacing: { after: 400 },
        }),

        h2("One line"),
        p("An AI executive assistant for Saudi professionals and small teams: one person, one AI colleague, fully personalized, hosted in Saudi Arabia, not gated by Microsoft or Azure."),

        h2("Where this comes from"),
        p("Lean, Abdullah's day job, is building a similar internal product: a Virtual Employee Hub where a user manages AI colleagues through Carax, a personal executive assistant. Muse is not copying that build. Muse is building its own version, for its own market, under Muse's own product philosophy: find a proven shape, understand why it works, localize it properly, and add something the original does not have. See Product Philosophy and the Adaptation Boundary Research note before writing a single line of product copy or UI."),

        h2("Category"),
        p("Productivity, AI agents, B2B and prosumer SaaS."),

        h2("The core idea"),
        p("The user has exactly one conversation. One executive assistant. That assistant delegates to a team of specialist AI colleagues (a QA agent, a designer agent, a researcher agent, whatever the user's work needs), but the user never manages those colleagues directly. All coordination happens through the one assistant, the way a real executive assistant runs a real office. Built on the Hermes agent framework, so the same core Muse understands how to build and run agents underneath is reused, not rebuilt."),

        h2("Why this, why now"),
        cardTable([
          ["Proven elsewhere", "AI executive assistant and AI employee products exist internationally, and Lean is proving the internal appetite for this shape of product right now."],
          ["Local gap", "Every serious competitor in this category runs on Microsoft 365, Google Workspace, or a US cloud stack. A Saudi company, a Saudi government body, or a security conscious business cannot fully adopt those without a data residency and sovereignty conversation."],
          ["The Muse angle", "Saudi data hosting, no Azure or Microsoft gate, culturally native (Arabic first, prayer times, weekend, family and hierarchy norms baked into how the assistant behaves, not bolted on), and fully personalized to how one person actually works."],
          ["The small addition", "Most competitors sell 'AI chat with tools attached.' Muse sells one relationship: a single assistant the user actually talks to and trusts, who quietly manages a team of specialists behind the scenes. The product feel is a colleague, not a chatbot."],
        ]),

        h2("Who it is for"),
        bullet("Saudi founders, executives, and small team leads who want leverage without hiring a full team yet."),
        bullet("Businesses and government-adjacent organisations that cannot use Microsoft or Google's AI copilots because of data residency, security policy, or procurement rules."),
        bullet("People who want an assistant that understands Arabic, local business norms, and how work actually happens here, not a translated version of a US product."),

        h2("What makes it defensible, not just different"),
        bullet("Data residency: Saudi hosted, verifiable, not a claim. This is the single strongest lever with government and enterprise buyers."),
        bullet("No Microsoft or Azure dependency: removes the biggest procurement blocker for security-conscious Saudi organisations."),
        bullet("Cultural fit: the assistant behaves differently because Saudi work life is different (prayer times, weekend, family obligations, communication norms), not a setting toggle."),
        bullet("Built on Hermes: Muse already understands the agent framework underneath. This is a real technical head start, not marketing."),

        h2("What it is not, at least not yet"),
        bullet("Not a Microsoft 365 or Google Workspace replacement. It sits alongside whatever tools the user already has."),
        bullet("Not an enterprise rollout on day one. Start with one user, one assistant, prove the relationship works, then widen to small teams."),
        bullet("Not a general purpose chatbot. The whole point is one trusted relationship, not a tools marketplace."),

        h2("MVP scope, first attempt"),
        bullet("One user, one assistant (their executive assistant), full onboarding that captures how the person actually works: projects, meeting rules, communication preferences, tone."),
        bullet("The assistant can delegate to at least one or two specialist agent types behind the scenes (for example a researcher and a QA or ops agent) without the user managing them directly."),
        bullet("Saudi hosted infrastructure from day one. This is not a later migration, it is the reason the product exists."),
        bullet("Arabic and English both native from the start, not translated after the English version ships."),

        h2("Traction gate, before launch"),
        p("See Traction and Metrics Research for the full benchmark research. Recommended primary metric for this shape: weekly active use of the assistant by the same user (a real conversation or delegated task, not a login). Set the specific target number and the review date before the MVP ships, not after."),

        h2("Legal and adaptation boundary"),
        p("Because this is inspired by a live product Lean is building and by international AI assistant products, the adaptation boundary policy applies directly. Read Adaptation Boundary Research before any UI, copy, or interaction pattern is finalized. What is safe: the idea of one assistant coordinating specialist agents. What is not safe: copying Lean's or any named competitor's actual screens, copy, or proprietary interaction design verbatim. Muse's version needs its own visual identity, its own copy, and its own specific behaviors, built from the reasoning, not the screenshots."),

        h2("Next steps"),
        bullet("Confirm Saudi hosting provider and actually verify data residency claims before repeating them publicly."),
        bullet("Scope the smallest real MVP: one assistant, one user, two agent types, real onboarding."),
        bullet("Set the traction metric and threshold before writing code."),
        bullet("Keep this venture in Working in the Open content once there is something real to show, per Content Engine pillar four."),

        new Paragraph({ children: [new PageBreak()] }),

        h1("Appendix: Brand Assets"),
        p("Logo files for this venture card and any related decks are included in the accompanying zip: Muse_Venture_Executive_Assistant_Logo_Pack.zip. Use the vertical or icon lockup for square spaces, horizontal for wide layouts. Do not distort, recolor outside approved treatments, or apply drop shadows. Full usage rules in Brand Identity.md."),
        p("Primary palette: Muse Orange #FE4701, Muse Maroon #4C0014, White #FFFFFF. Body text: maroon on white or white on maroon, never white on orange. Typography: Space Grotesk for English headings and body, IBM Plex Sans Arabic for Arabic, never a fallback."),
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("/Users/a/Downloads/personal/muse-software/Muse Vault/02 Ventures/Venture Card - Executive Assistant.docx", buffer);
  console.log("Written");
});
