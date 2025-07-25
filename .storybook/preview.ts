import type { Preview } from '@storybook/nextjs'
import { INITIAL_VIEWPORTS } from 'storybook/viewport'
import '../src/app/globals.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        base: {
          name: 'Base',
          styles: {
            height: '500px',
            width: '375px',
          },
          type: 'mobil',
        },
        small: {
          name: 'Small',
          styles: {
            height: '500px',
            width: '640px',
          },
          type: 'mobil',
        },
        medium: {
          name: 'Medium',
          styles: {
            height: '500px',
            width: '768px',
          },
          type: 'tablet',
        },
        large: {
          name: 'Large',
          styles: {
            height: '500px',
            width: '1024px',
          },
          type: 'desktop',
        },
        extraLarge: {
          name: 'Extra Large',
          styles: {
            height: '500px',
            width: '1280px',
          },
          type: 'desktop',
        },
        extraExtraLarge: {
          name: 'Extra Extra Large',
          styles: {
            height: '500px',
            width: '1536px',
          },
          type: 'desktop',
        },
        ...INITIAL_VIEWPORTS,
      },
      defaultViewport: 'large',
    },
  },
}

export default preview
