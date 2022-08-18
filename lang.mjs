import '../../redist/l10n.js'
import {getURLParameterValue} from '../util/util.mjs'

const _debug = false

export function _(string) {
  'use strict'
  const retVal = string.toLocaleString()
  if(_debug) console.log(`l10n: translating key "${string}" to "${retVal}"`)
  if(retVal === string) console.warn(`l10n: missing translation for "${string}"`)
  return retVal
}

export function init(defaultLanguage, availableLanguages, callback) {
  let lang = getURLParameterValue('lang')
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
  if(callback) callback()
}

function translateAll() {
  const allNodesHavingTranslateAttrib = document.querySelectorAll("*[translate]")
  
  allNodesHavingTranslateAttrib.forEach(node => {
    if(_debug) console.log(`l10n: html-tag auto-translating for node "${node.localName}" with id "${node.id}"`)

    if(node.getAttribute("translate") === "") {
      // translate element's text content
      if(node.innerText) {
        node.innerHTML = _(node.innerText)  // translation
      } else {
        console.warn(`l10n: node "${node.localName}" doesn't contain any text content to translate`)
      }
    } else {  
      // translate attributes which are denoted and comma-separated in translate attribute
      node.getAttribute("translate").split(',').forEach(attr => {
        const key = node.getAttribute(attr)
        if(key) { // attribute
          const translation = _(key)
          node.setAttribute(attr, translation)
        } else {
          console.warn(`l10n: node "${node.localName}" doesn't have an attribute "${attr}"`)
        }
      })
    }

  })

}