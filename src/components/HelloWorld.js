import React from 'react';

const HelloWorld = () => {
  const ecosystem = [
    { text: 'vuetify-loader', href: 'https://github.com/vuetifyjs/vuetify-loader' },
    { text: 'github', href: 'https://github.com/vuetifyjs/vuetify' },
    { text: 'awesome-vuetify', href: 'https://github.com/vuetifyjs/awesome-vuetify' },
  ];

  const importantLinks = [
    { text: 'Documentation', href: 'https://vuetifyjs.com' },
    { text: 'Chat', href: 'https://community.vuetifyjs.com' },
    { text: 'Made with Vuetify', href: 'https://madewithvuejs.com/vuetify' },
    { text: 'Twitter', href: 'https://twitter.com/vuetifyjs' },
    { text: 'Articles', href: 'https://medium.com/vuetify' },
  ];

  const whatsNext = [
    { text: 'Explore components', href: 'https://vuetifyjs.com/components/api-explorer' },
    { text: 'Select a layout', href: 'https://vuetifyjs.com/getting-started/pre-made-layouts' },
    { text: 'Frequently Asked Questions', href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions' },
  ];

  return (
    <div className="text-center">
      <div className="my-3">
        <img src={require('../assets/logo.svg')} alt="Logo" height="200" />
      </div>

      <div className="mb-4">
        <h1 className="display-2 font-weight-bold mb-3">
          Welcome to Vuetify
        </h1>
        <p className="subheading font-weight-regular">
          For help and collaboration with other Vuetify developers,
          <br />please join our online
          <a href="https://community.vuetifyjs.com" target="_blank" rel="noopener noreferrer">Discord Community</a>
        </p>
      </div>

      <div className="mb-5">
        <h2 className="headline font-weight-bold mb-3">
          What's next?
        </h2>
        <div className="mx-3">
          {whatsNext.map((next, i) => (
            <a key={i} href={next.href} className="subheading mx-3" target="_blank" rel="noopener noreferrer">
              {next.text}
            </a>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h2 className="headline font-weight-bold mb-3">
          Important Links
        </h2>
        <div className="mx-3">
          {importantLinks.map((link, i) => (
            <a key={i} href={link.href} className="subheading mx-3" target="_blank" rel="noopener noreferrer">
              {link.text}
            </a>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h2 className="headline font-weight-bold mb-3">
          Ecosystem
        </h2>
        <div className="mx-3">
          {ecosystem.map((eco, i) => (
            <a key={i} href={eco.href} className="subheading mx-3" target="_blank" rel="noopener noreferrer">
              {eco.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelloWorld;
