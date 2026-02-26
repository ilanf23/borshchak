---
name: web-research
description: Use this skill when the user asks to "search the web", "find design inspiration", "look up", "research online", "get content from a URL", "fetch a website", "analyze a webpage", "extract design from", "find the best design for", "look at this site", "get info from this link", "scrape content", "what does this page look like", or needs to gather information, design references, or content from the internet.
version: 1.0.0
---

# Web Research & Design Extraction Skill

This skill enables searching the internet for information, design inspiration, and content — and extracting useful details from web URLs.

## Available Tools

You have two primary tools for web research:

### 1. `WebSearch` — Search the Internet

Use this to find websites, articles, design references, competitors, and any information online.

```
WebSearch(query: "your search query here")
```

**Best practices:**
- Be specific: `"modern law firm website design 2026"` beats `"website design"`
- Include context: `"best hero section designs for SaaS landing pages"`
- Add qualifiers: `"top rated", "best practices", "examples", "inspiration"`
- Search for competitors: `"family law firm websites Austin Texas"`
- Search for design systems: `"tailwind CSS card component examples"`

**Example searches for design work:**
- `"best landing page designs 2026 inspiration"`
- `"modern minimalist website color palettes"`
- `"law firm website hero section examples"`
- `"responsive navigation menu design patterns"`
- `"call to action button design best practices"`
- `"website typography pairing recommendations"`

### 2. `WebFetch` — Fetch & Analyze a URL

Use this to retrieve content from a specific URL and extract information using a prompt.

```
WebFetch(url: "https://example.com", prompt: "what you want to extract")
```

**Best practices:**
- Always provide a focused prompt describing what to extract
- For design analysis, ask about specific elements (colors, layout, typography, spacing)
- For content extraction, ask for the specific sections you need
- The tool converts HTML to markdown — ideal for reading text content and structure

## Workflow Patterns

### Pattern 1: Find Best Designs for a Topic

1. **Search** for inspiration:
   ```
   WebSearch("best [topic] website designs 2026 inspiration")
   WebSearch("[topic] landing page examples modern")
   ```
2. **Review** the search results and identify promising URLs
3. **Fetch** the best candidates:
   ```
   WebFetch(url: "https://promising-site.com", prompt: "Describe the page layout, hero section design, color scheme, typography, key sections, and call-to-action placement")
   ```
4. **Synthesize** findings into actionable design recommendations

### Pattern 2: Extract Content from a Specific URL

1. **Fetch** the page:
   ```
   WebFetch(url: "https://target-url.com", prompt: "Extract all the main text content, headings, subheadings, and key information from this page")
   ```
2. **Refine** with a follow-up if needed:
   ```
   WebFetch(url: "https://target-url.com/about", prompt: "Extract the team bios, company history, and mission statement")
   ```

### Pattern 3: Competitive Research

1. **Search** for competitors:
   ```
   WebSearch("[industry] [location] website examples")
   ```
2. **Analyze** each competitor:
   ```
   WebFetch(url: "https://competitor.com", prompt: "Analyze this website: What services do they list? What is their value proposition? How is the navigation structured? What calls-to-action do they use?")
   ```
3. **Compare** and summarize findings

### Pattern 4: Design Element Research

1. **Search** for specific design elements:
   ```
   WebSearch("best practices [element] design web 2026")
   ```
2. **Fetch** design reference articles:
   ```
   WebFetch(url: "https://design-article.com", prompt: "Extract the recommended design patterns, do's and don'ts, and any code examples for [element]")
   ```

## Extraction Prompts Library

Use these prompts with `WebFetch` depending on what you need:

### Full Design Analysis
```
"Analyze the full design of this page: describe the layout structure (header, hero, sections, footer), color palette (primary, secondary, accent colors), typography (font families, sizes, weights), spacing patterns, imagery style, and interactive elements. Note any standout design decisions."
```

### Content Extraction
```
"Extract all the main content from this page including: page title, all headings and subheadings, body text organized by section, any listed services or features, testimonials or quotes, and contact information."
```

### Navigation & Structure
```
"Describe the site navigation structure: main menu items, any dropdowns or submenus, footer links, sidebar navigation if present, breadcrumbs, and how the information architecture is organized."
```

### Color & Branding
```
"Identify the color scheme used on this page: primary brand color, secondary colors, accent colors, background colors, text colors, and any gradient or overlay effects. Note how colors are used for hierarchy and emphasis."
```

### Hero Section Analysis
```
"Describe the hero section in detail: headline text, subheadline, call-to-action buttons (text and style), background treatment (image, video, gradient, pattern), layout arrangement, and overall visual impact."
```

### Services/Features Listing
```
"Extract all services or features listed on this page. For each one, capture: the name/title, description text, any associated icon or image description, and pricing if mentioned."
```

### SEO & Meta Content
```
"Extract the SEO-relevant content: page title tag, meta description, heading hierarchy (H1 through H4), image alt texts, and any structured data or schema markup indicators."
```

## Important Limitations

- **WebFetch** will fail on authenticated/private pages (Google Docs, Jira, private repos). Use `gh` CLI for GitHub content instead.
- **WebSearch** is best for public, indexed content. Results may vary.
- Very large pages may be summarized — use specific prompts to target what you need.
- Always verify fetched content — web pages can change or contain inaccurate info.
- HTTP URLs are automatically upgraded to HTTPS.
- If a URL redirects, you'll get the redirect URL — make a second fetch to follow it.

## Tips for Best Results

1. **Run multiple searches in parallel** when exploring a topic — cast a wide net
2. **Be specific in fetch prompts** — the more focused your extraction prompt, the better the results
3. **Combine search + fetch** — search first to find the right URLs, then fetch to deep-dive
4. **Iterate** — if the first fetch doesn't get what you need, refine your prompt and try again
5. **Cross-reference** — fetch multiple sources to verify information and get diverse perspectives
6. **Present sources** — always share the URLs you found with the user so they can verify
