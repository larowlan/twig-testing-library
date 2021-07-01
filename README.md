<div align="center">
<h1>Twig Testing Library</h1>

<a href="https://www.emojione.com/emoji/1f410">
  <img
    height="143"
    width="200"
    alt="goat"
    src="https://twig.symfony.com/images/logo.png"
  />
</a>

<p>A twig testing utility that allows the same testing ergonomics as <a href="https://testing-library.com/react">React testing library</a>.</p>

<br />
</div>

<hr />

<!-- prettier-ignore-start -->
[![Build Status][build-badge]][build]
[![version][version-badge]][package] [![downloads][downloads-badge]][npmtrends]
[![MIT License][license-badge]][license]
[![PRs Welcome][prs-badge]][prs] 

[![Watch on GitHub][github-watch-badge]][github-watch]
[![Star on GitHub][github-star-badge]][github-star]
[![Tweet][twitter-badge]][twitter]
<!-- prettier-ignore-end -->

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [The problem](#the-problem)
- [This solution](#this-solution)
- [Installation](#installation)
- [Examples](#examples)
  - [Basic Example](#basic-example)
  - [More Examples](#more-examples)
- [Issues](#issues)
  - [🐛 Bugs](#-bugs)
  - [💡 Feature Requests](#-feature-requests)
  - [❓ Questions](#-questions)
- [LICENSE](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## The problem

You are working with Twig in a styleguide-driven-development process. You are writing isolated components
that consist of css, twig and Javascript.
You want to be able to test your Javascript in relation to your twig file with maximum isolation.

## This solution

The `Twig Testing Library` is a very lightweight solution based on [Twig JS](https://github.com/twigjs/twig.js) for
testing Twig-based components. It is heavily influenced by similar libraries such as [React Testing Library](https://testing-library.com/docs/react-testing-library/intro).
It provides light utility functions on top of `Twig JS` and [Dom testing library](https://testing-library.com/docs/dom-testing-library/intro)
in a way that encourages better testing practices. 

## Installation

This module is distributed via [npm][npm] which is bundled with [node][node] and
should be installed as one of your project's `devDependencies`:

```
npm install --save-dev twig-testing-library
```

You may also be interested in installing `@testing-library/jest-dom` so you can
use [the custom jest matchers](https://github.com/testing-library/jest-dom).

## Examples

### Basic Example

```javascript
// accordion.js

class Accordion {
  constructor(obj) {
    this.accordion = obj;
    this.summary = obj.querySelector('.accordion__title');
  }

  init() {
    const open = this.accordion.hasAttribute('open');
    if (open) {
      this.accordion.classList.add('accordion--open');
    }
    this.summary.addEventListener('focus', () => {
      this.handleFocus();
    });
    this.summary.addEventListener('blur', () => {
      this.handleBlur();
    });
    this.summary.addEventListener('click', () => {
      this.handleClick();
    });
  }

  handleFocus() {
    // Focus class for styling.
    this.accordion.classList.add('has-focus');
  }

  handleBlur() {
    // Focus class for styling.
    this.accordion.classList.remove('has-focus');
  }

  handleClick() {
    const open = this.accordion.classList.contains('accordion--open');
    this.summary.setAttribute('aria-expanded', !open);
    this.summary.setAttribute('aria-pressed', !open);
    this.accordion.classList.toggle('accordion--open');
  }
}

export default { Accordion };
```

```javascript
// __tests__/accordion.js
import { render, fireEvent, Twig } from 'twig-testing-library'

// Add Twig extensions - see the Twig.js wiki.
Twig.extendFilter("backwords", function(value) {
  return value.split(" ").reverse().join(" ");
});

describe('Accordion toggling', () => {
  it('Can be rendered open, and then collapsed on click', async () => {
    // Rendering is async, so you need to use await.
    const { container, getByText } = await render(
    // Path to twig template.
    'accordion.twig',
    // Template variables/context. 
    {
      title: 'Accordion title',
      open: true,
    }, 
    // Namespace support
    {
      'my_namespace': './some/path'
    });
    const accordionElement = container.querySelector('.accordion');
    const accordion = new Accordion.Accordion(accordionElement);
    accordion.init();
    // Snapshot support via jest.
    expect(accordionElement).toMatchSnapshot('Initial render');
    expect(accordionElement.classList.contains('accordion--open')).toBe(true);
    fireEvent.click(getByText('Accordion title'));
    expect(accordionElement).toMatchSnapshot('First collapse');
    expect(accordionElement.classList.contains('accordion--open')).toBe(false);
  })
})
```

### More Examples

- Refer to the [Dom testing library docs](https://testing-library.com/docs/dom-testing-library/example-intro), we're really just adding the ability to render twig templates on top of that.

## Issues

### 🐛 Bugs

Please file an issue for bugs, missing documentation, or unexpected behavior.

[**See Bugs**][bugs]

### 💡 Feature Requests

Please file an issue to suggest new features. Vote on feature requests by adding
a 👍. This helps maintainers prioritize what to work on.

[**See Feature Requests**][requests]

### ❓ Questions

For questions related to using the library, please visit a support community
instead of filing an issue on GitHub.

- [Drupal Slack #frontend channel](https://drupal.org/slack)

## LICENSE

[MIT](LICENSE)

<!-- prettier-ignore-start -->

[npm]: https://www.npmjs.com/
[node]: https://nodejs.org
[build-badge]: [![validate](https://github.com/larowlan/twig-testing-library/actions/workflows/node.js.yml/badge.svg)](https://github.com/larowlan/twig-testing-library/actions/workflows/node.js.yml)
[build]: https://github.com/larowlan/twig-testing-library/actions
[version-badge]: https://img.shields.io/npm/v/twig-testing-library.svg?style=flat-square
[package]: https://www.npmjs.com/package/twig-testing-library
[downloads-badge]: https://img.shields.io/npm/dm/twig-testing-library.svg?style=flat-square
[npmtrends]: http://www.npmtrends.com/twig-testing-library
[license-badge]: https://img.shields.io/npm/l/twig-testing-library.svg?style=flat-square
[license]: https://github.com/larowlan/twig-testing-library/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[github-watch-badge]: https://img.shields.io/github/watchers/larowlan/twig-testing-library.svg?style=social
[github-watch]: https://github.com/larowlan/twig-testing-library/watchers
[github-star-badge]: https://img.shields.io/github/stars/larowlan/twig-testing-library.svg?style=social
[github-star]: https://github.com/larowlan/twig-testing-library/stargazers
[twitter]: https://twitter.com/intent/tweet?text=Check%20out%20twig-testing-library%20by%20%40larowlan%20https%3A%2F%2Fgithub.com%2Flarowlan%2Ftwig-testing-library%20%F0%9F%91%8D
[twitter-badge]: https://img.shields.io/twitter/url/https/github.com/larowlan/twig-testing-library.svg?style=social
[bugs]: https://github.com/larowlan/twig-testing-library/issues?q=is%3Aissue+is%3Aopen+label%3Abug+sort%3Acreated-desc
[requests]: https://github.com/larowlan/twig-testing-library/issues?q=is%3Aissue+sort%3Areactions-%2B1-desc+label%3Aenhancement+is%3Aopen
[good-first-issue]: https://github.com/larowlan/twig-testing-library/issues?utf8=✓&q=is%3Aissue+is%3Aopen+sort%3Areactions-%2B1-desc+label%3A"good+first+issue"+

<!-- prettier-ignore-end -->
