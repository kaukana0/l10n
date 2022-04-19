import '../../redist/l10n.min.js'

export function _(string) {
  'use strict'
  return string.toLocaleString()
}

export function initLocalisation(defaultLanguage, availableLanguages) {
  String.locale = defaultLanguage
  String.toLocaleString(availableLanguages)
  overrideFromURLParameter()
  translateAll()
}

function translateAll() {
  const allNodesHavingTranslateAttrib = document.querySelectorAll("*[translate]")
  
  allNodesHavingTranslateAttrib.forEach(node => {
    node.getAttribute("translate").split(',').forEach(attr => {
      const key = node.getAttribute(attr)
      const val = _(key)  // translated text
      node.setAttribute(attr, val)
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
    return ''
  } else {
    return results[1]
  }
}

function overrideFromURLParameter() {
  let lang = getParameterValue('lang')
  // override language now.
  if (lang !== '' && lang !== '') {
    for (const value in window.availableLanguages) {
      if (value === lang) {
        String.locale = lang
      }
    }
  }
}
