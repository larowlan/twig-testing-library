import { getQueriesForElement, prettyDOM } from "@testing-library/dom"
import Twig from "twig"
import fs from "fs"
import "regenerator-runtime/runtime"
import DrupalAttribute from "drupal-attribute"

const mountedContainers = new Set()

if (typeof afterEach === "function") {
  afterEach(cleanup)
}

async function render(
  twigFile,
  context = {},
  namespaces = {},
  twigCallback = () => {}
) {
  const baseElement = document.body
  const container = baseElement.appendChild(document.createElement("div"))

  // Add it to the mounted containers to cleanup.
  mountedContainers.add(container)
  twigCallback(Twig)

  container.innerHTML = await loadTemplate(twigFile, context, namespaces)

  return {
    container,
    baseElement,
    debug: (el = baseElement, maxLength, options) =>
      Array.isArray(el)
        ? // eslint-disable-next-line no-console
          el.forEach((e) => console.log(prettyDOM(e, maxLength, options)))
        : // eslint-disable-next-line no-console,
          console.log(prettyDOM(el, maxLength, options)),
    ...getQueriesForElement(baseElement),
  }
}

const loadTemplate = async (file, context = {}, namespaces) => {
  Twig.registryReset = () => {
    Twig.Templates.registry = {}
  }

  Twig.cache(false)
  Twig.extendFunction("create_attribute", (value) => new DrupalAttribute(value))
  Twig.twigAsync = (options) => {
    return new Promise((resolve, reject) => {
      options.load = resolve
      options.error = reject
      options.async = true
      options.autoescape = false
      options.namespaces = namespaces

      if (options.data || options.ref) {
        try {
          resolve(Twig.twig(options))
        } catch (error) {
          reject(error)
        }
      } else {
        fs.readFile(options.path, "utf8", (err, data) => {
          if (err) {
            reject(new Error(`Unable to find template file ${options.path}`))
            return
          }
          options.load = (template) => {
            template.rawMarkup = data
            resolve(template)
          }
          Twig.twig(options)
        })
      }
    })
  }
  return Twig.twigAsync({
    path: file,
  }).then((template) => {
    if (!context.hasOwnProperty("attributes")) {
      context.attributes = new DrupalAttribute()
    }
    return template.render(context)
  })
}

function cleanup() {
  mountedContainers.forEach(cleanupContainer)
}

function cleanupContainer(container) {
  if (container.parentNode === document.body) {
    document.body.removeChild(container)
  }
  mountedContainers.delete(container)
}

// just re-export everything from dom-testing-library
export * from "@testing-library/dom"
export { render, cleanup, Twig }

/* eslint func-name-matching:0 */
