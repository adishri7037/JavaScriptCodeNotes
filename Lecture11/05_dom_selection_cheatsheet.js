/*
DOM SELECTION CHEATSHEET

document.getElementById("id")
  -> one element or null

document.getElementsByClassName("class")
  -> HTMLCollection

document.getElementsByTagName("tag")
  -> HTMLCollection

document.querySelector("CSS selector")
  -> first matching element or null

document.querySelectorAll("CSS selector")
  -> static NodeList containing all matching elements

COMMON CSS SELECTORS

"#profile"              ID
".card"                 class
"p"                     tag
".card p"               descendant
".card > p"             direct child
"h2 + p"                adjacent sibling
"h2 ~ p"                following siblings
"input[type='email']"   attribute selector
".card, .profile"       OR / group
".card .title"          nested class combination

HTMLCollection vs NodeList

HTMLCollection:
  - Commonly returned by getElementsByClassName/getElementsByTagName
  - Array-like, not a real Array
  - Does not directly support all Array methods

NodeList:
  - querySelectorAll() returns a NodeList
  - Has length
  - Modern NodeLists support forEach()
  - Still not a normal Array

Useful inspection:
element.tagName
element.id
element.className
element.textContent
element.children
element.parentElement
element.nextElementSibling
element.previousElementSibling
*/
