# Fonts

This task will copy font files to `./build/fonts`.

Run: `gulp fonts`

## Usage

Check out module and link to index-wf.css (or index-ab.css for abbot downing)
The families are defined therein:

    wfIcons --- font awesome
    wfSerif --- archer lining figures
    wfSans --- myriad
    wfSansCond --- myriad condensed
    wfSerifPro --- archer pro

## Inclusion

According to Google site analysis, deferred loading styles is a speed improvement.
To do this is to place the link lower in the body...

```pug
    noscript#DeferredStyles
      link(rel='stylesheet' href='./fonts/index-wf.css')
```

Then script the inclusion...
```js
  function loadDeferredStyles() {
    var addStylesNode = $('#DeferredStyles');
    var replacement = $('<div>').addClass('deferred-styles');
    replacement.html(addStylesNode.text());
    $('body').append(replacement);
    addStylesNode.remove();
  }
```

## Reason for woff (as ttf)

WOFF is used in all browsers these days and is now web standard.
To overcome the limitations in certain server configs, I am simply using the TTF extension.
(WOFF are more desirable than TTF --- they are smaller.
There is a even more compact WOFF2 that isn't as prevalent.) EOT are never needed these days, and SVG fonts are wastes of space.

## Why per-project inclusion?

The inclusion at the project level has eased various cross-domain load issues.
I've used multiple different font versions and face variants over the years with mixed success.
Now I’m coding them to specify the path per weight, so modern browsers fetch as needed.
The approach works every time, is compact, is robust, and has flexible weight options.
It also has the ligatures and alternate faces like Lining Figures, Condensed.
