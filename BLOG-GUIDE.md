# Blog Writing Guide

## Quick Start

1. **Copy the template**: Duplicate `blog-template.mdx` in the `content/blog/` folder
2. **Rename it**: Use lowercase with hyphens (e.g., `my-new-blog-post.mdx`)
3. **Update frontmatter**: Fill in the metadata at the top
4. **Write content**: Replace the placeholder text with your content
5. **Preview**: Your blog will automatically appear at `/blog/your-file-name`

## Frontmatter Fields (Required)

```yaml
---
title: "Your Blog Title" # Main title shown on the page
date: "2024-11-08" # Publication date (YYYY-MM-DD format)
author: "Souman Paul" # Your name
tags:
 -tag 1
 -tag 2
 -tag 2
description: "Brief description" # SEO and preview description
featured: false # Set to true for featured posts
readTime: "10 min read" # Estimated reading time
---
```

## Markdown Formatting Guide

### Headings

```markdown
# H1 - Main Title (use once at top)

## H2 - Major sections

### H3 - Subsections

#### H4 - Minor subsections
```

### Text Styling

```markdown
**Bold text** for emphasis
_Italic text_ for subtle emphasis
`inline code` for commands or technical terms
```

### Code Blocks

````markdown
```javascript
// JavaScript code
const example = "syntax highlighting works automatically";
```

```python
# Python code
def hello_world():
    print("Choose the right language for your code")
```

```bash
# Shell commands
npm install package-name
```
````

### Lists

```markdown
- Unordered list item
- Another item
  - Nested item
  - Another nested item

1. Ordered list item
2. Another item
3. Third item
```

### Links and Images

```markdown
[Link text](https://example.com)
[Internal link](/projects)

![Alt text](/path/to/image.png)
![Image with caption](/project/my-image.png)
```

**Image Guidelines:**

- Store blog images in `/public/blog/[post-name]/` folder
- Use descriptive filenames (e.g., `architecture-diagram.png`)
- Supported formats: PNG, JPG, WebP, SVG
- Optimize images before uploading (recommended max: 1MB)
- Always include descriptive alt text for accessibility

**Example Image Structure:**

```
public/
  blog/
    building-ai-agents/
      hero-image.png
      architecture-diagram.png
      code-example-screenshot.png
```

### Blockquotes

```markdown
> This is a blockquote
> Use for important notes or callouts
```

### Tables

```markdown
| Header 1 | Header 2 | Header 3 |
| -------- | -------- | -------- |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```

### Horizontal Rule

```markdown
---
```

## Tips for Great Blog Posts

### Writing Style

- **Start strong**: Hook readers with an interesting intro
- **Be conversational**: Write like you're explaining to a friend
- **Use examples**: Concrete examples make concepts clear
- **Break it up**: Short paragraphs are easier to read

### Structure

1. **Introduction**: What, why, and what readers will learn
2. **Body**: Break into logical sections with clear headings
3. **Code examples**: Show, don't just tell
4. **Conclusion**: Summarize key takeaways
5. **Resources**: Provide links for further reading

### SEO Best Practices

- Use descriptive titles (50-60 characters)
- Write compelling descriptions (150-160 characters)
- Include relevant keywords naturally
- Use proper heading hierarchy
- Add alt text to images

### Code Examples

- Test all code before publishing
- Include comments explaining complex parts
- Show both "before" and "after" when appropriate
- Use syntax highlighting by specifying the language

## File Naming Convention

✅ **Good names:**

- `building-ai-agents-langgraph.mdx`
- `microservices-architecture-guide.mdx`
- `nextjs-performance-optimization.mdx`

❌ **Bad names:**

- `blog post 1.mdx` (spaces, not descriptive)
- `MYPOST.mdx` (uppercase)
- `post_123.mdx` (not descriptive)

## Common Mistakes to Avoid

1. **Missing frontmatter**: All fields are required
2. **Incorrect date format**: Use YYYY-MM-DD
3. **Unclosed code blocks**: Always close with triple backticks
4. **Broken links**: Test all links before publishing
5. **No proofreading**: Always review before publishing

## Publishing Checklist

- [ ] Frontmatter is complete and accurate
- [ ] Date is correct (use current date or scheduled date)
- [ ] Title is descriptive and engaging
- [ ] Description is compelling (for previews)
- [ ] Tags are relevant and accurate
- [ ] All code examples are tested
- [ ] Links work correctly
- [ ] Images are included (if referenced)
- [ ] Content is proofread
- [ ] File name follows convention

## Example Workflow

1. **Copy template**:

   ```bash
   cp content/blog/blog-template.mdx content/blog/my-new-post.mdx
   ```

2. **Edit the file**: Open in your editor and write your content

3. **Preview locally**: Visit `http://localhost:3000/blog/my-new-post`

4. **Review**: Check formatting, links, and code examples

5. **Commit**: Add to git and deploy

## Converting Regular Content to MDX

When you have written content and want to convert it to MDX format, follow this process:

### Step 1: Prepare Your Content

Save your content in a text file with basic formatting:

- Use clear section breaks
- Mark where code examples should go
- Note where images should be placed

### Step 2: Use AI to Convert

You can give this guide and your content to an AI assistant with this prompt:

```
I have written a blog post and need to convert it to MDX format following the guidelines in BLOG-GUIDE.md.

Here's my content:
[PASTE YOUR CONTENT HERE]

Please:
1. Create a proper MDX file with frontmatter
2. Format the content with appropriate markdown syntax
3. Suggest where images would enhance the content
4. Add code block syntax highlighting where needed
5. Optimize the structure with proper headings
6. Generate appropriate tags based on the content
7. Create a compelling SEO description

Additional notes:
- Title: [Your preferred title]
- Any specific formatting requirements: [Your requirements]
```

### Step 3: AI Conversion Checklist

When asking AI to convert your content, ensure it:

- [ ] Adds complete frontmatter with all required fields
- [ ] Uses proper heading hierarchy (H2, H3, H4)
- [ ] Formats code blocks with language specification
- [ ] Suggests image placements with descriptive alt text
- [ ] Creates proper lists and blockquotes
- [ ] Adds links where references are mentioned
- [ ] Includes a compelling introduction and conclusion
- [ ] Generates relevant tags and description

## Adding Images to Your Blog

### Image Organization

Create a dedicated folder for each blog post:

```bash
mkdir -p public/blog/your-blog-post-name
```

### Image Preparation

1. **Resize images**: Recommended max width 1200px
2. **Compress**: Use tools like TinyPNG or ImageOptim
3. **Format**:
   - Photos: JPG or WebP
   - Graphics/Screenshots: PNG
   - Icons/Illustrations: SVG (if possible)
4. **Naming**: Use descriptive names (e.g., `authentication-flow.png`)

### Adding Images in MDX

**Basic Image:**

```markdown
![Authentication Flow Diagram](/blog/auth-guide/authentication-flow.png)
```

**Image with Caption:**

```markdown
![Architecture Overview](/blog/my-post/architecture.png)
_Figure 1: System architecture showing microservices communication_
```

**Multiple Images in a Section:**

```markdown
## Visual Examples

Here's the before and after comparison:

![Before Optimization](/blog/performance/before.png)
_Before: Initial load time 3.5s_

![After Optimization](/blog/performance/after.png)
_After: Optimized load time 0.8s_
```

### Image Best Practices

✅ **DO:**

- Use descriptive alt text
- Optimize file sizes (aim for under 200KB)
- Use consistent image sizes within a post
- Place images near relevant content
- Test images on mobile and desktop

❌ **DON'T:**

- Use generic names like "image1.png"
- Upload huge uncompressed images
- Forget alt text (important for accessibility)
- Use images with text that's hard to read
- Link to external images (they may break)

### Image Examples by Use Case

**Hero/Feature Image:**

```markdown
![Building Modern Web Applications with Next.js](/blog/nextjs-guide/hero.png)
```

**Code Output Screenshot:**

```markdown
After running the command, you should see:

![Terminal Output](/blog/cli-tools/terminal-output.png)
```

**Diagram or Flowchart:**

```markdown
The data flow works as follows:

![Data Flow Diagram](/blog/architecture/data-flow.svg)

1. Client makes request
2. API validates input
3. Database processes query
```

**Comparison Images:**

```markdown
| Before                               | After                              |
| ------------------------------------ | ---------------------------------- |
| ![Before](/blog/refactor/before.png) | ![After](/blog/refactor/after.png) |
```

## Quick Reference: AI Prompt Template

When you're ready to create a blog post, use this template:

```
I want to create a blog post for my portfolio website. Please follow the BLOG-GUIDE.md guidelines.

**Topic:** [Your topic]

**Target Audience:** [Who will read this]

**Key Points to Cover:**
- [Point 1]
- [Point 2]
- [Point 3]

**Raw Content:**
[Paste your written content here]

**Requirements:**
1. Convert to MDX format with proper frontmatter
2. Add appropriate headings and structure
3. Format code examples (language: [specify])
4. Suggest 3-5 image placements with descriptions
5. Generate relevant tags
6. Create SEO-optimized title and description
7. Add estimated read time

**Preferences:**
- Tone: [Professional/Casual/Technical]
- Code examples: [Yes/No, which language]
- Target length: [Short/Medium/Long]
```

## Need Help?

- Check existing blog posts for examples
- Refer to `blog-template.mdx` for structure
- Test locally before publishing
- Ask for review if unsure
- Use image optimization tools before uploading
- Test on mobile devices to ensure images look good

Happy blogging! 🚀
