import '../../redist/l10n.min.js'

const _debug = false

export function _(string) {
  'use strict'
  const retVal = string.toLocaleString()
  if(_debug) console.log(`l10n: translating key "${string}" to "${retVal}"`)
  return retVal
}

export function init(defaultLanguage, availableLanguages) {
  let lang = getParameterValue('lang')
  if(lang===null) {
    String.locale = defaultLanguage
    console.log(`using language '${defaultLanguage}'.`)
  } else {
    if(Object.keys(availableLanguages).includes(lang)) {
      String.locale = lang
      console.log(`language overriden via URL parameter to '${lang}'.`)
    } else {
      String.locale = defaultLanguage
      console.log(`language override via URL parameter to '${lang}' failed. language not available. using default '${defaultLanguage}'.`)
    }
  }

  String.toLocaleString(availableLanguages) // this is from l10n.js
  translateAll()
}

function translateAll() {
  const allNodesHavingTranslateAttrib = document.querySelectorAll("*[translate]")
  
  allNodesHavingTranslateAttrib.forEach(node => {
    if(_debug) console.log(`l10n: html-tag auto-translating for node "${node.localName}"`)
    node.getAttribute("translate").split(',').forEach(attr => {
      const key = node.getAttribute(attr)
      if(key) {
        const val = _(key)  // translated text
        node.setAttribute(attr, val)
      } else {
        console.warn(`l10n: attribute "${attr}" not found on node "${node.localName}"`)
      }
    })
  })

}

function getParameterValue (parameter) {
  'use strict'
  parameter = parameter.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]')
  let regexS = '[\\?&]' + parameter + '=([^&#]*)'
  let regex = new RegExp(regexS)
  let results = regex.exec(window.location.href)
  if (results === null) {
    return null
  } else {
    return results[1]
  }
}
