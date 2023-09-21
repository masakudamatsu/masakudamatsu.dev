# Masa Kudamatsu's portfolio website

## Font subsetting

Custom fonts are all served via self-hosted subsetted font files, rather than via webfont servers, to improve the performance on [largest contentful paint (LCP)](https://web.dev/lcp/).

To subset font files to the glyphs actually used on the site, first start a local host server at `http://localhost:8080`. Then run the following command:
```bash
npm run subset
```
The `subset` script executes [`glyphhanger`](https://github.com/zachleat/glyphhanger), which crawls the website at `http://localhost:8080` to record the glyphs actually used and then subsets font files to these glyphs only.

However, the `subset` script requires a set of external resources as described below.

### Glyphhanger dependencies

Glyphhanger relies on three Python libraries: `fonttools`, `brotli`, and `zopfli`. To install them in your local computer (assuming Python 3.6 or higher is already installed), use `pip3`:
```bash
pip3 install fonttools
pip3 install brotli
pip3 install zopfli
```
The installation of `fonttools` may return the following warning:
```
WARNING: The scripts fonttools, pyftmerge, pyftsubset and ttx are installed in '/Users/kudamatsu/Library/Python/3.9/bin' which is not on PATH.
```
where `kudamatsu` is an example user name.

If this happens, add the directory path mentioned in the warning to PATH. For macOS Catalina or later, open `~/.zshrc` (or create one if it doesn't exist) and add the following line:
```
export PATH="/Users/kudamatsu/Library/Python/3.9/bin:$PATH"
```
where `kudamatsu` is an example user name.

Finally, to activate this new configuration, execute the following command:
```
source ~/.zshrc
```

### Master font files

In the root directory, create a folder called `font-original`.

In this folder, download master font files:
- `Raleway-Italic.ttf`, `Raleway-Light.ttf`, and `Raleway-Regular.ttf` from [Google Fonts](https://fonts.google.com/specimen/Raleway)
- `ZenLoop-Regular.ttf` from [Google Fonts](https://fonts.google.com/specimen/Zen+Loop)
- `ZenKurenaido-Regular.ttf` from [Google Fonts](https://fonts.google.com/specimen/Zen+Kurenaido)
- `YakuHanJP-Light.ttf` from [YakuHanJP GitHub repo](https://github.com/qrac/yakuhanjp/tree/main/packages/core/YakuHanJP/ttf)



