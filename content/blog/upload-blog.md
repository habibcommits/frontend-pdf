---
title: "How to Upload New Blog Posts"
titleDe: "So laden Sie neue Blog-Beiträge hoch"
date: "2025-11-18"
contentDe: |
  Dieser Leitfaden erklärt, wie Sie neue Blog-Beiträge zu Ihrer PDF Wandler-Website hinzufügen.

  ## Schnellstart

  1. Erstellen Sie eine neue `.md`-Datei im Ordner `/content/blog/`
  2. Fügen Sie Frontmatter mit Titel, Datum und Inhalt hinzu
  3. Laden Sie die Datei über GitHub hoch
  4. Der Beitrag erscheint automatisch nach der Bereitstellung!

  ## Dateistruktur

  Jeder Blog-Beitrag ist eine Markdown-Datei (`.md`) im Ordner `/content/blog/`. Der Dateiname wird zur URL-Slug:

  - `my-post.md` → `/blog/my-post`
  - `pdf-tips.md` → `/blog/pdf-tips`
  - `welcome.md` → `/blog/welcome`

  ## Frontmatter-Format

  Am Anfang jeder Blog-Datei muss ein YAML-Frontmatter-Abschnitt stehen:

  ```markdown
  ---
  title: "Ihr englischer Titel"
  titleDe: "Ihr deutscher Titel"
  date: "2025-01-20"
  contentDe: |
    Ihr deutscher Inhalt hier...
    
    ## Deutsche Überschrift
    
    Deutscher Text mit **Formatierung**.
  ---

  Ihr englischer Inhalt hier...

  ## Englische Überschrift

  Englischer Text mit **Formatierung**.
  ```

  ## Erforderliche Felder

  - **title**: Titel des Beitrags auf Englisch (erforderlich)
  - **date**: Veröffentlichungsdatum im ISO-Format YYYY-MM-DD (erforderlich)

  ## Optionale Felder für zweisprachige Unterstützung

  - **titleDe**: Deutscher Titel (empfohlen)
  - **contentDe**: Deutscher Inhalt in YAML-Blockformat (empfohlen)

  ## Markdown-Unterstützung

  Sie können alle Standard-Markdown-Funktionen verwenden:

  - **Überschriften**: `# H1`, `## H2`, `### H3`
  - **Fett**: `**fetter Text**`
  - **Kursiv**: `*kursiver Text*`
  - **Listen**: `- Aufzählungspunkt` oder `1. Nummeriert`
  - **Links**: `[Linktext](https://beispiel.de)`
  - **Bilder**: `![Alt-Text](pfad/zum/bild.jpg)`
  - **Code**: `` `inline code` `` oder `` ```Codeblock``` ``
  - **Zitate**: `> Zitattext`

  ## Beispiel für zweisprachigen Beitrag

  ```markdown
  ---
  title: "5 Tips for Better PDFs"
  titleDe: "5 Tipps für bessere PDFs"
  date: "2025-02-01"
  contentDe: |
    PDF-Dateien sind allgegenwärtig, aber nicht alle sind gut optimiert. Hier sind 5 Tipps.

    ## 1. Komprimieren Sie große Dateien

    Verwenden Sie unser Kompressionstool, um Dateigrößen zu reduzieren.

    ## 2. Verwenden Sie beschreibende Dateinamen

    Benennen Sie Dateien klar: `rechnung-2025-01.pdf` statt `dokument1.pdf`.

    ## 3. Fügen Sie Lesezeichen hinzu

    Für lange Dokumente helfen Lesezeichen bei der Navigation.

    ## 4. Optimieren Sie für das Web

    Stellen Sie sicher, dass PDFs für schnelles Laden optimiert sind.

    ## 5. Testen Sie die Zugänglichkeit

    Überprüfen Sie, ob Ihre PDFs mit Screenreadern funktionieren.
  ---

  PDF files are ubiquitous, but not all are well-optimized. Here are 5 tips.

  ## 1. Compress Large Files

  Use our compression tool to reduce file sizes.

  ## 2. Use Descriptive Filenames

  Name files clearly: `invoice-2025-01.pdf` instead of `document1.pdf`.

  ## 3. Add Bookmarks

  For long documents, bookmarks help with navigation.

  ## 4. Optimize for Web

  Make sure PDFs are optimized for fast loading.

  ## 5. Test Accessibility

  Check if your PDFs work with screen readers.
  ```

  ## Hochladen über GitHub

  1. Navigieren Sie zu Ihrem Repository auf GitHub
  2. Gehen Sie zum Ordner `content/blog/`
  3. Klicken Sie auf "Datei hinzufügen" > "Neue Datei erstellen"
  4. Benennen Sie Ihre Datei (z.B. `mein-beitrag.md`)
  5. Fügen Sie Ihren Inhalt mit Frontmatter ein
  6. Klicken Sie auf "Änderungen committen"
  7. Ihre Website wird automatisch neu bereitgestellt

  ## Tipps für beste Ergebnisse

  - **Verwenden Sie immer ISO-Datumsformat**: `YYYY-MM-DD` (z.B. 2025-01-20)
  - **Fügen Sie deutsche Übersetzungen hinzu**: Ihre Website ist zweisprachig!
  - **Kurze URLs**: Verwenden Sie kurze, beschreibende Dateinamen
  - **Testen Sie Markdown**: Verwenden Sie einen Online-Markdown-Editor zum Testen
  - **Bilder**: Speichern Sie Bilder im Ordner `/public/blog-images/` und verlinken Sie sie als `/blog-images/bild.jpg`

  ## Sortierung

  Beiträge werden automatisch nach Datum sortiert (neueste zuerst). Beiträge ohne gültiges Datum erscheinen am Ende.

  ## Lokale Vorschau

  Um Ihren Beitrag lokal vor dem Hochladen zu testen:

  1. Fügen Sie die `.md`-Datei zu `/content/blog/` hinzu
  2. Führen Sie `npm run dev` aus
  3. Besuchen Sie `http://localhost:5000/blog`
  4. Ihr neuer Beitrag sollte erscheinen

  ## Fehlerbehebung

  **Problem**: Beitrag erscheint nicht
  - Überprüfen Sie, ob die Datei auf `.md` endet
  - Stellen Sie sicher, dass Frontmatter korrekt formatiert ist
  - Überprüfen Sie, ob das Datumsformat YYYY-MM-DD ist

  **Problem**: Deutsche Version wird nicht angezeigt
  - Überprüfen Sie `contentDe: |` mit Pipe-Symbol
  - Stellen Sie sicher, dass der deutsche Inhalt eingerückt ist
  - Verifizieren Sie, dass `titleDe` gesetzt ist

  **Problem**: Markdown wird nicht gerendert
  - Überprüfen Sie die Markdown-Syntax
  - Stellen Sie sicher, dass Leerzeilen zwischen Elementen vorhanden sind
  - Vermeiden Sie Tabs, verwenden Sie Leerzeichen zum Einrücken

  ## Brauchen Sie Hilfe?

  Schauen Sie sich die vorhandenen Blog-Beiträge in `/content/blog/` als Beispiele an!
---

This guide explains how to add new blog posts to your PDF Wandler website.

## Quick Start

1. Create a new `.md` file in the `/content/blog/` folder
2. Add frontmatter with title, date, and content
3. Upload the file via GitHub
4. The post will appear automatically after deployment!

## File Structure

Each blog post is a Markdown file (`.md`) in the `/content/blog/` folder. The filename becomes the URL slug:

- `my-post.md` → `/blog/my-post`
- `pdf-tips.md` → `/blog/pdf-tips`
- `welcome.md` → `/blog/welcome`

## Frontmatter Format

At the top of each blog file, you need a YAML frontmatter section:

```markdown
---
title: "Your English Title"
titleDe: "Your German Title"
date: "2025-01-20"
contentDe: |
  Your German content here...
  
  ## German Heading
  
  German text with **formatting**.
---

Your English content here...

## English Heading

English text with **formatting**.
```

## Required Fields

- **title**: Post title in English (required)
- **date**: Publication date in ISO format YYYY-MM-DD (required)

## Optional Fields for Bilingual Support

- **titleDe**: German title (recommended)
- **contentDe**: German content in YAML block format (recommended)

## Markdown Support

You can use all standard Markdown features:

- **Headings**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Lists**: `- Bullet point` or `1. Numbered`
- **Links**: `[Link text](https://example.com)`
- **Images**: `![Alt text](path/to/image.jpg)`
- **Code**: `` `inline code` `` or `` ```code block``` ``
- **Quotes**: `> Quote text`

## Example Bilingual Post

```markdown
---
title: "5 Tips for Better PDFs"
titleDe: "5 Tipps für bessere PDFs"
date: "2025-02-01"
contentDe: |
  PDF files are everywhere, but not all are well-optimized. Here are 5 tips.

  ## 1. Compress Large Files

  Use our compression tool to reduce file sizes.

  ## 2. Use Descriptive Filenames

  Name files clearly: `invoice-2025-01.pdf` instead of `document1.pdf`.

  ## 3. Add Bookmarks

  For long documents, bookmarks help with navigation.

  ## 4. Optimize for Web

  Make sure PDFs are optimized for fast loading.

  ## 5. Test Accessibility

  Check if your PDFs work with screen readers.
---

PDF files are ubiquitous, but not all are well-optimized. Here are 5 tips.

## 1. Compress Large Files

Use our compression tool to reduce file sizes.

## 2. Use Descriptive Filenames

Name files clearly: `invoice-2025-01.pdf` instead of `document1.pdf`.

## 3. Add Bookmarks

For long documents, bookmarks help with navigation.

## 4. Optimize for Web

Make sure PDFs are optimized for fast loading.

## 5. Test Accessibility

Check if your PDFs work with screen readers.
```

## Uploading via GitHub

1. Navigate to your repository on GitHub
2. Go to the `content/blog/` folder
3. Click "Add file" > "Create new file"
4. Name your file (e.g., `my-post.md`)
5. Paste your content with frontmatter
6. Click "Commit changes"
7. Your website will automatically redeploy

## Tips for Best Results

- **Always use ISO date format**: `YYYY-MM-DD` (e.g., 2025-01-20)
- **Add German translations**: Your website is bilingual!
- **Short URLs**: Use short, descriptive filenames
- **Test markdown**: Use an online Markdown editor to test formatting
- **Images**: Store images in `/public/blog-images/` folder and link as `/blog-images/image.jpg`

## Sorting

Posts are automatically sorted by date (newest first). Posts without valid dates appear at the end.

## Local Preview

To test your post locally before uploading:

1. Add the `.md` file to `/content/blog/`
2. Run `npm run dev`
3. Visit `http://localhost:5000/blog`
4. Your new post should appear

## Troubleshooting

**Problem**: Post doesn't appear
- Check if file ends with `.md`
- Ensure frontmatter is correctly formatted
- Verify date format is YYYY-MM-DD

**Problem**: German version doesn't show
- Check `contentDe: |` has pipe symbol
- Make sure German content is indented
- Verify `titleDe` is set

**Problem**: Markdown not rendering
- Check markdown syntax
- Ensure blank lines between elements
- Avoid tabs, use spaces for indentation

## Need Help?

Look at existing blog posts in `/content/blog/` for examples!
