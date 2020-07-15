/* eslint no-new: 0 */
import Accordion from './fixtures/accordion';
import {render, fireEvent, Twig} from "../src";

Twig.extendFilter("backwords", (text) => {
  return text.split(" ").reverse().join(" ");
});

describe('Test library by testing an accordion', () => {
  it('Can be initially rendered open', async () => {
    const { container, getByText } = await render('./tests/fixtures/accordion.twig', {
      // This is intentionally backwards so we can test extending twig.
      title: 'title Accordion',
      open: true,
    }, {
      'twig-testing-library-tests': './tests/fixtures/'
    });
    const accordionElement = container.querySelector('.accordion');
    const summaryElement = accordionElement.querySelector('summary');
    const accordion = new Accordion.Accordion(accordionElement);
    accordion.init();
    expect(accordionElement).toMatchSnapshot('Initial render');
    expect(accordionElement.classList.contains('accordion--open')).toBe(true);
    fireEvent.click(getByText('Accordion title'));
    expect(accordionElement).toMatchSnapshot('First collapse');
    expect(accordionElement.classList.contains('accordion--open')).toBe(false);
    expect(summaryElement.getAttribute('aria-expanded')).toEqual('false');
    expect(summaryElement.getAttribute('aria-pressed')).toEqual('false');
    fireEvent.click(getByText('Accordion title'));
    expect(accordionElement).toMatchSnapshot('Re-open');
    expect(accordionElement.classList.contains('accordion--open')).toBe(true);
    expect(summaryElement.getAttribute('aria-expanded')).toEqual('true');
    expect(summaryElement.getAttribute('aria-pressed')).toEqual('true');
  });

  it('Can be initially rendered closed', async () => {
    const { container, getByText } = await render('./tests/fixtures/accordion.twig', {
      // This is intentionally backwards so we can test extending twig.
      title: 'title Accordion',
      open: false,
    }, {
      'twig-testing-library-tests': './tests/fixtures/'
    });
    const accordionElement = container.querySelector('.accordion');
    const summaryElement = accordionElement.querySelector('summary');
    const accordion = new Accordion.Accordion(accordionElement);
    accordion.init();
    expect(accordionElement).toMatchSnapshot('Initial render');
    expect(accordionElement.classList.contains('accordion--open')).toBe(false);
    fireEvent.click(getByText('Accordion title'));
    expect(accordionElement).toMatchSnapshot('First expand');
    expect(accordionElement.classList.contains('accordion--open')).toBe(true);
    expect(summaryElement.getAttribute('aria-expanded')).toEqual('true');
    expect(summaryElement.getAttribute('aria-pressed')).toEqual('true');
    fireEvent.click(getByText('Accordion title'));
    expect(accordionElement).toMatchSnapshot('Re-collapse');
    expect(accordionElement.classList.contains('accordion--open')).toBe(false);
    expect(summaryElement.getAttribute('aria-expanded')).toEqual('false');
    expect(summaryElement.getAttribute('aria-pressed')).toEqual('false');
  });
});
