/**
     * createNewsWidget
     * Embeds a widget displaying news from Webz.io’s News API Lite into a container element.
     *
     * @param {Object} options - Configuration for the widget
     * @param {string} options.token - Your Webz.io News API Lite token
     * @param {string} options.query - The query for the news you want to fetch
     * @param {Element|string} options.container - The DOM element or its selector where the widget will be injected
     *
     * @param {boolean} [options.showImage=true] - Toggle to show/hide article images
     * @param {boolean} [options.showText=true]  - Toggle to show/hide article text snippet
     *
     * @param {Object} [options.styles={}] - Object for customizing widget’s styling
     *   @param {string} [options.styles.backgroundColor="#ffffff"] - Widget background color
     *   @param {string} [options.styles.borderColor="#cccccc"]     - Widget border color
     *   @param {string} [options.styles.fontFamily="Arial, sans-serif"] - Widget font family
     *   @param {string} [options.styles.linkColor="#0066cc"] - Color of the title link
     *   @param {string} [options.styles.linkFontSize="16px"] - Font size of the title link
     *   @param {string} [options.styles.textColor="#333333"] - Color of the article snippet text
     *   @param {string} [options.styles.textFontSize="14px"] - Font size of the article snippet text
     *   @param {string} [options.styles.dateColor="#999999"] - Color of the date text
     *   @param {string} [options.styles.dateFontSize="12px"] - Font size of the date text
     *
     * @param {string} [options.width="100%"] - Width of the widget
     * @param {string} [options.height="auto"] - Height of the widget
     */
    function createNewsWidget(options) {
      const {
        token,
        query,
        container,
        showImage = true,
        showText = true,
        styles = {},
        width = "100%",
        height = "auto"
      } = options;

      if (!token || !query) {
        console.error("Error: 'token' and 'query' are required fields.");
        return;
      }

      // Resolve container
      let containerEl;
      if (typeof container === "string") {
        containerEl = document.querySelector(container);
      } else {
        containerEl = container;
      }

      if (!containerEl) {
        console.error("Error: container element not found.");
        return;
      }

      // Apply widget styling to container
      containerEl.style.boxSizing = "border-box";
      containerEl.style.width = width;
      containerEl.style.height = height;
      containerEl.style.overflow = "auto";
      containerEl.style.backgroundColor = styles.backgroundColor || "#ffffff";
      containerEl.style.border = `1px solid ${styles.borderColor || "#cccccc"}`;
      containerEl.style.fontFamily = styles.fontFamily || "Arial, sans-serif";
      containerEl.style.padding = "10px";

      // Construct request URL
      const baseUrl = "https://api.webz.io/newsApiLite";
      const apiUrl = `${baseUrl}?token=${token}&q=${encodeURIComponent(query)}`;

      // Clear container content first (if any)
      containerEl.innerHTML = "<p>Loading news...</p>";

      // Fetch news articles
      fetch(apiUrl, { cache: "force-cache" }) // Attempt to use browser caching; real 24h caching is on Webz.io’s side
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok (${response.status})`);
          }
          return response.json();
        })
        .then((data) => {
          // Clear the "Loading news..." text
          containerEl.innerHTML = "";

          // data.posts is the array of post objects
          if (!data || !data.posts || !Array.isArray(data.posts) || data.posts.length === 0) {
            containerEl.innerHTML = "<p>No news found.</p>";
            return;
          }

          data.posts.forEach((post) => {
            const { title, url, published, text, thread } = post;

            // Create wrapper for each post
            const postWrapper = document.createElement("div");
            postWrapper.style.display = "flex";
            postWrapper.style.marginBottom = "20px";

            // 1) SHOW IMAGE (left side) if enabled
            if (showImage) {
              const imageUrl = thread && thread.main_image ? thread.main_image : "";
              const imageContainer = document.createElement("div");
              imageContainer.style.flex = "0 0 100px";
              imageContainer.style.marginRight = "10px";

              if (imageUrl) {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = title || "Article image";
                img.style.width = "100px";
                img.style.height = "auto";
                img.style.objectFit = "cover";
                imageContainer.appendChild(img);
              }
              postWrapper.appendChild(imageContainer);
            }

            // 2) Text Container: Title + Date + Snippet
            const textContainer = document.createElement("div");
            textContainer.style.flex = "1";

            // Title Link
            const postTitle = document.createElement("a");
            postTitle.href = url || "#";
            postTitle.target = "_blank";
            postTitle.innerText = title || "No title available";
            postTitle.style.textDecoration = "none";
            postTitle.style.color = styles.linkColor || "#0066cc";
            postTitle.style.fontSize = styles.linkFontSize || "16px";
            postTitle.style.display = "block";
            postTitle.style.marginBottom = "5px";

            // Date
            const postDate = document.createElement("div");
            postDate.innerText = published
              ? new Date(published).toLocaleDateString()
              : "No date";
            postDate.style.color = styles.dateColor || "#999999";
            postDate.style.fontSize = styles.dateFontSize || "12px";
            postDate.style.marginBottom = "5px";

            // Append Title & Date first
            textContainer.appendChild(postTitle);
            textContainer.appendChild(postDate);

            // Snippet Text (below title) if showText is true
            if (showText) {
              const snippetEl = document.createElement("div");
              // Clean up `text` (remove HTML/CSS) and limit to ~180 characters
              const snippetRawText = text || "No description available";
              const snippetPlain = snippetRawText.replace(/(<([^>]+)>)/gi, "");
              snippetEl.innerText =
                snippetPlain.slice(0, 180) + (snippetPlain.length > 180 ? "..." : "");
              snippetEl.style.color = styles.textColor || "#333333";
              snippetEl.style.fontSize = styles.textFontSize || "14px";
              snippetEl.style.marginTop = "5px";
              textContainer.appendChild(snippetEl);
            }

            postWrapper.appendChild(textContainer);
            containerEl.appendChild(postWrapper);
          });

          // Finally, add a "Powered by Webz.io News API" link under the widget
          const poweredByLink = document.createElement("div");
          poweredByLink.style.fontSize = "12px";
          poweredByLink.style.marginTop = "10px";
          poweredByLink.style.textAlign = "right";
          poweredByLink.innerHTML = 'Powered by <a href="https://webz.io/products/news-api#lite" target="_blank" rel="noopener">Webz.io News API</a>';
          containerEl.appendChild(poweredByLink);
        })
        .catch((err) => {
          containerEl.innerHTML = `<p>Error fetching news: ${err.message}</p>`;
          console.error(err);
        });
    }