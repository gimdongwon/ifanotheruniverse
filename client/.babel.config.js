const babelConfig = {
  presets: ['next/babel'],
  plugins: [
    [
      'styled-components',
      {
        ssr: true,
        displayName: true,
        fileName: false, // 🔒 랜덤 클래스명 방지
        minify: false, // 🔒 클래스 안정성 유지
        pure: true,
      },
    ],
  ],
};

export default babelConfig;
