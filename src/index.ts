/**
 * @package wf-auto-sitemap
 * @version 1.0.0
 * @description A simple Webflow extension built to automatically generate a sitemap for your website using Webflow's API.
 */

import axios from 'axios';

addWfSitemapListeners();

async function sitemapHandler(e: MouseEvent) {
  // event.preventDefault();
  console.log('Event', e, e.target);

  // Get the current selected Element
  const el = await webflow.getSelectedElement();

  // If styles can be set on the Element
  if (el && el.styles && el.children) {
    console.log('Generating Sitemap...');

    const response = await axios.post(
      'https://sitemaps.vcsr.ai/fetch-sitemap',
      {
        url: 'https://emergencyac.webflow.io',
      }
    );

    console.log('Injecting Sitemap Webflow Element');

    console.log('response', response);

    // const sitemapWrapper = await el.prepend(webflow.elementPresets.DivBlock);

    // sitemapWrapper.setTextContent(`${response?.data?.message}`);
  } else {
    alert('Please select a text element');
  }
}

function addWfSitemapListeners() {
  const button = document.getElementById('generate-sitemap-button');
  if (button) {
    button.addEventListener('click', sitemapHandler);
  }
}
