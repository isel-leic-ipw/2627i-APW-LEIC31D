# Lab 13 - HTML and CSS

In this lab, you will create a small web page, inspect its structure in a
browser, and style it using CSS.

## 1. HTML – Structure and Content

HTML describes the **structure and meaning** of a web page. An element is
usually written with a start tag, content, and an end tag:

```html
<p>This is a paragraph.</p>
```

* **Tags** mark the beginning and end of an element.
* **Attributes** provide additional information in the start tag, as in `<a
href="https://example.com">link</a>`.
* **Text** between tags is a **text node**.
* **Elements** and **text** nodes form a **tree**:
  * an element can contain other elements, which are its **children**.

### Exercise 1.1 – Create an HTML document

Create a file named **`index.html`** with the following content:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>My first web page</title>
  </head>
  <body>
    <h1>My favourite place</h1>
    <p>I like visiting the beach.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` identifies the document as HTML.
- `<html>` is the root element. `<head>` contains document information, while
  `<body>` contains the page content.
- `<meta charset="utf-8">` declares the character encoding. 
- The `<title>` appears in the browser tab.

### Exercise 1.2 – Add content and inspect the tree

Add a second paragraph containing at least two nested elements, for example:

```html
<p>My favourite activity is <strong>swimming</strong> at the beach.</p>
```

Open the browser's developer tools and inspect the paragraph. Identify the
paragraph, its text nodes, and the nested `<strong>` element. Add a link using
`<a href="https://example.com">Visit this site</a>` and observe what happens
when you click it.

### Exercise 1.3 – Use semantic elements

Semantic elements describe the purpose of their content. Update the page to
include a `<nav>` with two links, a `<main>` containing the page's main content,
and a `<footer>` with your name.

Inside `<main>`, add a table describing two places you like. Use a `<caption>`
to give the table a title, `<thead>` for its column headings, and `<tbody>` for
its data rows. Use `<th>` for headings and `<td>` for values.

Open the page in the browser and check that all the content appears. Inspect
the elements in developer tools and identify how the semantic elements are
nested.

### Exercise 1.4 – Void elements, block and inline elements

Add an image with an `alt` attribute, a line break in a paragraph, and a
horizontal rule:

```html
<img src="https://picsum.photos/200" alt="A sample landscape">
<p>First line<br>Second line</p>
<hr>
```

`<img>`, `<br>`, and `<hr>` are **void elements**: they do not have closing
tags or contain child content. In HTML, a trailing slash is unnecessary.

Add two paragraphs and a link next to text. Observe that paragraphs normally
start on a new line (**block** behavior), while links flow within a line
(**inline** behavior). The browser applies these default display behaviors;
CSS can change them.

### Exercise 1.5 – Use `div` and `span`

Wrap the table and its heading in a `<div>`. Use a `<span>` to wrap one word in
a paragraph.

`<div>` and `<span>` are generic containers without their own semantic
meaning. A `<div>` is block-level by default and is useful for grouping
sections; a `<span>` is inline by default and is useful for grouping part of a
line. Prefer a meaningful element such as `<nav>` when it describes the
content's purpose.

Reload the page and inspect the two containers. The content should look
unchanged because these elements do not add visual styling by themselves.

## 2. CSS – Presentation

CSS is a styling language that defines how HTML content is presented. A CSS
rule has a **selector** and one or more **property-value** declarations:

```css
selector {
  property: value;
}
```

The selector chooses elements; a property names what to change; and its value
specifies how. For example, `p { color: blue; }` selects paragraphs and sets
their text color.

### Exercise 2.1 – Add inline styles

Add a `style` attribute to the main heading to change its text color:

```html
<h1 style="color: darkblue;">My favourite place</h1>
```

Save and reload the page. Change the color value and observe the result. This
is an **inline style**: CSS written directly on an HTML element. It is useful
for trying a rule, but is difficult to maintain across many elements.

### Exercise 2.2 – Add internal styles

Remove the heading's `style` attribute. Add a `<style>` element inside
`<head>`:

```html
<style>
  body {
    font-family: sans-serif;
  }

  h1 {
    color: darkblue;
  }

  p {
    line-height: 1.5;
  }
</style>
```

Save and reload the page. Change the `h1` selector to `p` and observe which
elements are affected. These rules are **internal styles**, because they are
inside the HTML document.

### Exercise 2.3 – Move styles to an external file

Create **`style.css`** in the same folder. Move the CSS rules from `<style>`
into that file, without the `<style>` tags. Replace the `<style>` element with
this link inside `<head>`:

```html
<link rel="stylesheet" href="style.css">
```

Save both files and reload the page. Change a property in `style.css` and
observe the result. These are **external styles**, stored separately from the
HTML and reusable across pages.

### Exercise 2.4 – Style elements and containers

Add a CSS rule for `table`, then use class selectors to style the `<div>` and
`<span>` from Exercise 1.5. Add a `class` attribute to each element, for
example:

```html
<div class="place-details">
  ...
</div>
```

```css
.place-details {
  padding: 1rem;
  background-color: lightyellow;
}

.place-details span {
  font-weight: bold;
}
```

Save and reload the page. Change one property value and observe how the
presentation changes without changing the content or its meaning.

### The CSS Box Model

The browser lays out each element as a box. From the inside out, it consists
of the content, padding, border, and margin:

```text
+---------------------------- margin ----------------------------+
|  +------------------------- border -------------------------+   |
|  |  +---------------------- padding ---------------------+  |   |
|  |  |                     content                        |  |   |
|  |  +-----------------------------------------------------+  |   |
|  +-----------------------------------------------------------+   |
+-----------------------------------------------------------------+
```

- **Content** is the text, image, or child elements.
- **Padding** is space between the content and the border. It is inside the
  border, so the element's background extends behind it.
- **Margin** is space outside the border. It separates this element from
  neighboring elements and is transparent.

### Exercise 2.5 – Experiment with padding and margin

Add this paragraph inside `<main>`:

```html
<p class="box-demo">A box-model example</p>
```

Add a rule for it in `style.css`:

```css
.box-demo {
  padding: 20px;
  margin: 20px;
  border: 2px solid black;
  background-color: lightyellow;
}
```

Save and reload the page. Observe the yellow area inside the border and the
space around the border. Increase `padding` to `40px`; the content moves away
from the border. Restore it to `20px`, then increase `margin` to `40px`; the
gap outside the border grows instead. Compare the two results in the browser.


## 3. Bootstrap – Ready-Made Styles

[Bootstrap](https://getbootstrap.com/) is a CSS framework that provides
predefined styles and layout helpers. Add its stylesheet inside `<head>`,
before your own `style.css` link:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet">
```

Bootstrap classes apply predefined styles to elements. A `class` attribute can
contain several space-separated classes, so an element can combine layout,
color, and spacing styles.

- **Variants:** `primary` marks the main emphasis, while `success` is commonly
  used for a positive action or result. For example, `btn-primary` and
  `btn-success` give buttons different contextual colors; they do not change
  what the buttons do.
- **States:** `table-hover` highlights table rows as the pointer moves over
  them. The word `hover` refers to this pointer state.
- **Spacing:** `m` means margin and `p` means padding. The next letter indicates
  the side: `t` top, `b` bottom, `s` start, `e` end, `x` horizontal, or `y`
  vertical. A number from `0` to `5` selects a spacing size; for example,
  `mt-3` adds top margin and `px-2` adds horizontal padding. Larger numbers
  mean more space.
- **Responsive layout:** Bootstrap's grid uses `.row` and column classes.
  Breakpoint suffixes apply styles at that screen width and above. For example,
  `col-12 col-md-6` takes the full row on small screens and half the row from
  the medium breakpoint upward.

### Exercise 3.1 – Style the page with Bootstrap

Add the `container` class to the existing `<main>` element. Add Bootstrap
classes to the heading, table, and a link or button:

```html
<main class="container">
<h1 class="text-primary text-center mt-4">My favourite place</h1>
<table class="table table-striped">
  ...
</table>
<a class="btn btn-primary" href="https://example.com">Learn more</a>
</main>
```

Save and reload the page while connected to the internet. Observe the
container width, heading, table, and button. Change `table-striped` to
`table-hover`, or `btn-primary` to `btn-success`, and observe the difference.
Change `mt-4` to `mt-1` and compare the space above the heading.

To try the responsive grid, place two pieces of content in a `.row`, each
inside a `<div class="col-12 col-md-6">`. Resize the browser window and observe
how the columns stack on a narrow screen and sit side by side on a wider one.
Keep your own `style.css` link after Bootstrap so your rules can override its
defaults when needed.