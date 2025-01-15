# News Widget using Webz.io News API Lite

A customizable embeddable JavaScript widget to display news articles about specific topics using the Webz.io News API Lite.

## Features

- **Customizable Appearance:**
  - Modify link colors, text colors, fonts, widget size, background color, and border color.
- **Display Options:**
  - Toggle the display of article images and text snippets independently.

- **Flexible Usage:**
  - Specify the news query and your API token to fetch relevant articles.

The widget automatically handles layout, with article images displayed on the left, and article titles, publication dates, and snippets displayed on the right. It’s a great tool for adding dynamic content to websites, blogs, or dashboards.

### Example Screenshot of a Widget about "Mergers and Acquisitions" 
<img src="https://github.com/free-news-api/news-widget/blob/main/widget_example.png?raw=true"   />

## How It Works

The widget fetches news articles from the Webz.io News API Lite and dynamically displays them on your website. Each article includes:
- A hyperlink with the title (linked to the article)
- The publication date
- (Optional) An image of the article
- (Optional) A snippet of the article text

The layout is designed with images on the left and text on the right.

## Installation

1. Clone the repository or download the source code:
   ```bash
   git clone https://github.com/yourusername/news-widget-webzio.git
2. Include the JavaScript file in your website or project.
3. Configure the widget options (e.g., API token, query, styles).

## Usage
Here’s a basic example of how to use the widget:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>News Widget Example</title>
</head>
<body>
  <div id="myNewsWidget"></div>
  <script src="path-to-widget.js"></script>
  <script>
    createNewsWidget({
      token: "YOUR_WEBZ_IO_TOKEN",
      query: 'topic:"mergers and acquisitions"',
      container: "#myNewsWidget",
      showImage: true,
      showText: true,
      styles: {
        backgroundColor: "#f2f2f2",
        linkColor: "blue",
        textColor: "#333333",
        dateColor: "#999999",
      }
    });
  </script>
</body>
</html>
```

# Customization Options
## Widget Display Options


| Option      | Type    | Default | Description                                                  |
|-------------|---------|---------|--------------------------------------------------------------|
| `token`     | string  | -       | Your Webz.io News API Lite token.                            |
| `query`     | string  | -       | The query for fetching news.                                 |
| `container` | string  | -       | A DOM selector or element where the widget will be injected. |
| `showImage` | boolean | `true`  | Whether to display the article images.                      |
| `showText`  | boolean | `true`  | Whether to display the article text snippet.                |

## Styling Options 

| Option           | Type    | Default       | Description                           |
|------------------|---------|---------------|---------------------------------------|
| `backgroundColor`| string  | `#ffffff`     | Background color of the widget.       |
| `borderColor`    | string  | `#cccccc`     | Border color of the widget.           |
| `fontFamily`     | string  | `Arial, sans-serif` | Font family used in the widget.  |
| `linkColor`      | string  | `#0066cc`     | Color of the article title link.      |
| `textColor`      | string  | `#333333`     | Color of the text snippet.            |
| `dateColor`      | string  | `#999999`     | Color of the publication date.        |


## Contributing
Feel free to fork the repository and submit pull requests for new features or bug fixes.

## License
This project is licensed under the pache-2.0 license. 
