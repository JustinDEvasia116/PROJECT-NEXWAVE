module.exports = {
    // ... other configuration options
  
    module: {
      rules: [
        // ... other rules
  
        // Rule for handling SVG files
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
      ],
    },
  };
  