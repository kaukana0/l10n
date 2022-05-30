
# usage in html

## prerequisites

assume, this is in l10n/en.json (the l10n in the app root, not in the component)

    {
        "title.main": "Food prices",
        "title.sub": "in Europe",
        "footerText": "This is some footer text..."
    }

this in a main.mjs file

    import * as l10n from "./components/l10n/lang.mjs"
    l10n.init("en", {
        'en': './l10n/en.json',
        'fr': './l10n/fr.json'
    })

## translate attributes

in a html file

    <title-lines mainText="title.main" subText="title.sub" translate="mainText,subText"></title-lines>

then the attributes "mainText" and "subText" will become "Food prices" and "in Europe", respectively (via setAttribute).

## translate element's text

in a html file

    <div translate>footerText</div>

the element's innerText will become "This is some footer text..."

# usage in js

    const translation = _("title.main")     
    // translation now is "Food prices"

# attention

Any component that wants to participate in translation must be able to update itself (after initialization) according to changing attributes.
