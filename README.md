# LINE Sticker Downloader

A lightweight Chromium extension for selectively downloading sticker and emoji assets from LINE Store product pages.

Select the items you want, download them directly, and optionally convert animated APNG files to GIF — all from a compact floating interface injected into the LINE Store page.

This is an independent, non-commercial personal research project created to explore browser extension development, web resource handling, and client-side image processing.

## Features

### Selective Download

Choose exactly which stickers or emojis to download.

- Select individual items
- Select all / deselect all
- Invert selection
- Shift-click to select a range
- `Ctrl+A` / `⌘A` to select or deselect all
- Download only the selected items
- Display the current selection count

### Static & Animated Content

The downloader can handle both static and animated resources.

- Download static stickers as PNG
- Download animated stickers in their original APNG format
- Convert animated APNG to GIF
- Choose between:
  - Static Only
  - Animated Only
  - Static + Animated

### APNG → GIF Conversion

Animated stickers can be converted from APNG to GIF directly in the browser.

The conversion:

- Runs locally without a remote processing server
- Preserves animation frame timing
- Preserves transparent backgrounds as far as GIF allows
- Uses a custom sentinel-color approach to reduce accidental transparency of dark or black pixels

GIF conversion is optional. When disabled, the original animated APNG resource is downloaded instead.

### Floating Interface

The extension uses a compact floating bubble instead of a permanent sidebar.

- Expand / collapse the control panel
- Drag the bubble to reposition it
- Automatically snaps the bubble toward the nearest screen edge
- Remembers its position
- Automatically enables download mode when the panel is opened
- Automatically disables download mode when the panel is closed
- Press `ESC` to close the panel

The interface is designed to keep the LINE Store page mostly unobstructed when the downloader is not being used.

### Multi-language UI

The interface currently supports:

- 简体中文
- 繁體中文
- 日本語
- English
- 한국어

The selected language is saved locally in the browser.

## Why this project?

Many existing sticker download tools provide an entire resource set together with preview images and metadata files.

This project was built around a simpler workflow:

**Select what you want → download it directly → optionally convert animated content to GIF.**

It is intended as both a personal utility and a practical project for experimenting with:

- Chromium extension development
- Manifest V3
- DOM manipulation
- `MutationObserver`
- Web resource handling
- Client-side image processing
- APNG decoding
- GIF encoding
- Asynchronous batch processing

The project does not provide a sticker archive and does not include downloaded sticker artwork.

## How it works

The extension detects supported LINE Store sticker and emoji product pages and injects its own floating interface into the page.

When download mode is enabled, selectable controls are added to the available sticker or emoji items.

The extension uses resource information already available on the supported LINE Store page, including static and animated resource URLs.

When the user starts a download:

1. The selected items are collected.
2. The product name and author name are used when available to organize downloaded files.
3. Static resources are downloaded as PNG.
4. Animated resources can either be downloaded as APNG or converted locally to GIF.
5. Downloads are processed sequentially with a small delay between items.

For GIF conversion, the APNG is fetched by the browser and processed locally. The resulting GIF is then passed to the extension's background service worker for download.

## APNG → GIF Conversion

APNG generally provides better transparency and color handling than GIF, but some applications and platforms do not properly support animated PNG.

This project therefore provides an optional APNG → GIF conversion path.

The conversion pipeline uses:

- `UPNG.js` — APNG decoding
- `GIFEncoder.js` — GIF encoding
- `NeuQuant` — color quantization
- `LZWEncoder` — GIF LZW compression
- `pako` — zlib / DEFLATE support

All image processing is performed locally in the browser.

### Transparent GIF Encoding

GIF supports only a single transparent palette index.

A naïve implementation can accidentally turn dark pixels transparent if a commonly used color such as black is selected as the transparent color.

This project uses a **sentinel-color approach** instead:

1. Examine opaque image colors.
2. Select a candidate color that does not conflict with the image when possible.
3. Use the candidate as a temporary representation for transparent pixels.
4. Reserve the sentinel color as the GIF transparent palette entry.
5. Remap palette indices when necessary to avoid losing existing dark pixels.

This is particularly useful for stickers containing black outlines, eyes, shadows, or other dark details.

### Frame Handling

The conversion pipeline:

1. Decodes the APNG using `UPNG.decode()`.
2. Extracts RGBA animation frames using `UPNG.toRGBA8()`.
3. Uses the original frame delays.
4. Passes raw RGBA image data to the GIF encoder.
5. Encodes the animation into a GIF Blob.
6. Sends the resulting Blob to the background service worker for download.

## File Naming

Downloaded content is organized using the detected product name and author name when available.

The resulting structure is approximately:

```text
StickerPack_Author/
├── 01_STICKER_ID.png
├── 02_STICKER_ID.png
└── ...
````

For animated resources:

```text
StickerPack_Author/
├── 01_STICKER_ID.gif
└── ...
```

when GIF conversion is enabled.

Otherwise, the original animated resource is downloaded using an `_ANIMATION.png` suffix.

## Privacy

The extension does not require a dedicated remote processing server.

APNG → GIF conversion is performed locally in the browser.

The current implementation does not include an analytics or telemetry service.

The extension operates on supported LINE Store product pages and requests the permissions required for downloading files and accessing the LINE Store / LINE sticker CDN resources specified in `manifest.json`.

Users should review the source code and requested permissions before installation.

## Installation

This extension is currently intended for local installation in Chromium-based browsers rather than distribution through an extension store.

### Chrome / Edge

1.  Download or clone this repository.
    
2.  Open `chrome://extensions/` in Chrome, or the extensions page in another Chromium-based browser.
    
3.  Enable **Developer mode**.
    
4.  Click **Load unpacked**.
    
5.  Select the project directory.
    
6.  Open a supported LINE Store sticker or emoji product page.
    
7.  The downloader bubble should appear automatically.
    

The extension currently uses Manifest V3.

## Project Structure

```text
line-sticker-downloader/
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
├── libs/
│   ├── GIFEncoder.js
│   ├── LZWEncoder.js
│   ├── NeuQuant.js
│   ├── pako.min.js
│   └── upng.min.js
├── background.js
├── content.js
├── manifest.json
├── README.md
├── LICENSE
├── THIRD_PARTY_LICENSES.md
└── .gitignore
```

## Browser Compatibility

| Browser | Support | Notes |
| --- | --- | --- |
| Chrome | Tested | Chromium / Manifest V3 |
| Edge | Expected | Chromium-based |
| Firefox | Untested | Not currently supported or tested |
| Safari | Untested | Not currently supported or tested |

## Known Limitations

-   GIF supports only 1-bit transparency, so semi-transparent edges may not look identical to the original APNG.
    
-   GIF color quantization may introduce slight color shifts, especially in images with gradients or complex colors.
    
-   Large animated stickers may take noticeable time to convert.
    
-   Animated conversion requires the corresponding APNG resource to be accessible.
    
-   The extension depends on the current structure of LINE Store pages and may require updates if the website changes.
    
-   GIF generally preserves less color and transparency information than APNG.
    
-   The extension is currently designed for the supported LINE Store sticker and emoji product page formats defined in `manifest.json`.
    

## Legal & Ethical Guidelines

This project is provided for browser extension development practice, web resource processing research, and personal use.

Please respect the copyright and licensing terms applicable to sticker and emoji artwork.

### Recommended

-   Use the project to study browser extension development and client-side image processing.
    
-   Keep downloaded content for uses permitted by the applicable rights and platform rules.
    
-   Purchase stickers through official channels when you want to support their creators.
    
-   Preserve creator attribution where applicable.
    

### Do Not

-   Redistribute downloaded sticker or emoji files without authorization.
    
-   Upload downloaded content to public resource sites.
    
-   Sell or commercially exploit copyrighted content without permission.
    
-   Use the extension to circumvent payment, authentication, access controls, or other technical restrictions.
    
-   Perform automated mass downloading that unnecessarily burdens LINE's services.
    
-   Remove creator attribution or watermarks for redistribution.
    
-   Present downloaded artwork as your own work.
    

This project is not affiliated with, endorsed by, or associated with LINE Corporation.

## Third-Party Libraries

This project includes or incorporates code from several open-source projects and implementations:

-   **UPNG.js** — APNG decoding
    
-   **jsgif / GIFEncoder** — GIF encoding
    
-   **LZWEncoder** — GIF LZW compression
    
-   **NeuQuant** — color quantization
    
-   **pako** — zlib / DEFLATE processing
    

See [`THIRD_PARTY_LICENSES.md`](https://chatgpt.com/g/g-p-6a9049feac7081919da1988d2ce463bc-linetie-tu-xia-zai-qi/c/THIRD_PARTY_LICENSES.md) for license information and attribution details.

The licenses of third-party components remain applicable to their respective code.

## License

The original code of this project is released under the license specified in [`LICENSE`](https://chatgpt.com/g/g-p-6a9049feac7081919da1988d2ce463bc-linetie-tu-xia-zai-qi/c/LICENSE).

**Important:** The project license applies to this project's source code only. It does not grant any rights to sticker artwork, emoji artwork, character designs, or other third-party content accessed through the extension.

Such content remains subject to the rights of its respective creators, publishers, and/or service providers.

## Acknowledgements

This project uses or incorporates work from:

-   [UPNG.js](https://github.com/photopea/UPNG.js) by Photopea
    
-   [jsgif](https://github.com/antimatter15/jsgif)
    
-   NeuQuant by Anthony Dekker
    
-   pako by Vitaly Puzrin and its contributors
    

Please refer to the individual projects and [`THIRD_PARTY_LICENSES.md`](https://chatgpt.com/g/g-p-6a9049feac7081919da1988d2ce463bc-linetie-tu-xia-zai-qi/c/THIRD_PARTY_LICENSES.md) for their respective licenses and attribution requirements.

* * *

**Status:** Personal research project / experimental browser extension

**Version:** 1.4.0

**Last updated:** 2026-08-28