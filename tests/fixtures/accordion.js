/**
 * Accordion
 * @file Accordion handler.
 */

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
