const babelConfig = {
  presets: ['next/babel'],
  plugins: [['styled-components', { ssr: true, displayName: true }]],
};

export default babelConfig;
