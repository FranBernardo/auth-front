// next.config.ts

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  webpackDevMiddleware: config => {
    config.watchOptions = {
      poll: 1000, // checa mudanças a cada 1000ms
      aggregateTimeout: 300, // espera 300ms após mudança para recarregar
    }
    return config
  },
}

export default nextConfig
