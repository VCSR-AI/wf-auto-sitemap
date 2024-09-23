/**
 * @package wf-auto-sitemap
 * @version 1.0.0
 * @description A simple Webflow extension built to automatically generate a sitemap for your website using Webflow's API.
 */

import axios from 'axios';

// Extend the Window interface to declare SitemapController globally
declare global {
  interface Window {
    SitemapController: typeof SitemapController;
  }
}

type Topic = string;

interface SitemapItem {
  title: string;
  url: string;
}

interface Sitemap {
  [key: Topic]: SitemapItem[];
}

class SitemapController {
  message: string;
  count: number;

  constructor() {
    this.message = 'Hello from Alpine!';
    this.count = 0;
  }

  init() {
    console.log('AlpineDataClass initialized.');
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  setMessage(newMessage: string) {
    this.message = newMessage;
  }

  async sitemapHandler(e: MouseEvent) {
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

      if (!response.data?.success) {
        alert('Cannot connect to sitemap generation service.');
      }

      const sitemap: Sitemap = response.data?.sitemap;
      const sitemapWrapper = await el.after(webflow.elementPresets.DOM);

      for (const sitemapTopic in sitemap) {
        const topicWrapper = await sitemapWrapper.append(
          webflow.elementPresets.DivBlock
        );
        const topicHeading = await topicWrapper.append(
          webflow.elementPresets.Heading
        );

        topicHeading.setHeadingLevel(3);
        topicHeading.setCustomAttribute('class', 'topic-heading');
        topicHeading.setTextContent(sitemapTopic);

        const topicList = await topicWrapper.append(
          webflow.elementPresets.List
        );

        sitemap[sitemapTopic].map(async (sitemapItem) => {
          const listItem = await topicList.append(
            webflow.elementPresets.ListItem
          );
          await listItem.setCustomAttribute('class', 'sitemap-list-item');

          const item = await listItem.append(webflow.elementPresets.TextLink);
          await item.setSettings('url', sitemapItem.url);
          await item.setTextContent(sitemapItem.title);
          await item.setCustomAttribute('class', 'sitemap-item');
        });
      }
      // const sitemapWrapper = await el.prepend(webflow.elementPresets.DivBlock);

      // sitemapWrapper.setTextContent(`${response?.data?.message}`);
    } else {
      alert('Please select a text element');
    }
  }
}

window.SitemapController = SitemapController;

export {};
// export default SitemapController;

// type Topic = string;
// addWfSitemapListeners();

// async function customComponentRegistrationHandler(e: MouseEvent) {
//   const rootElement = await webflow.getSelectedElement();
//   if (rootElement) {
//     // Create a component from the Root Element
//     const component = await webflow.registerComponent(
//       'HTML Sitemap',
//       rootElement
//     );
//     console.log(`Component registered with ID: ${component.id}`);
//   } else {
//     console.log(
//       'No element is currently selected. Please select a root element first.'
//     );
//   }
// }

// async function addWfSitemapListeners() {
//   document
//     .getElementById('generate-sitemap-button')
//     ?.addEventListener('click', sitemapHandler);
//   document
//     .getElementById('register-component-button')
//     ?.addEventListener('click', customComponentRegistrationHandler);
// }
