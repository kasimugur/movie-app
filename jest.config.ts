import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Next.js yapılandırmasını ve .env dosyalarını test ortamına yüklemek için dizini belirtiyoruz
  dir: './',
})

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // '@/' alias'ını Jest'e tanıtıyoruz
    '^@/(.*)$': '<rootDir>/$1',
  },
}

export default createJestConfig(config)