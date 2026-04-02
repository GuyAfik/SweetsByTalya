#!/usr/bin/env node
/**
 * Sweets by Talya — Local Development Launcher
 *
 * Starts both the Vite frontend and the local API server concurrently.
 * Run with: npm run dev:local
 *
 * What it starts:
 *   - Vite dev server  → http://localhost:3000  (frontend)
 *   - Local API server → http://localhost:3001  (email + AI proxy)
 *
 * Vite proxies /api/* → localhost:3001 automatically.
 */

import { spawn } from 'child_process'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')

const RESET  = '\x1b[0m'
const BOLD   = '\x1b[1m'
const CYAN   = '\x1b[36m'
const GREEN  = '\x1b[32m'
const YELLOW = '\x1b[33m'
const RED    = '\x1b[31m'
const DIM    = '\x1b[2m'

function prefix(label, color) {
  return `${color}${BOLD}[${label}]${RESET} `
}

function spawnProcess(label, color, cmd, args, env = {}) {
  const proc = spawn(cmd, args, {
    cwd: root,
    env: { ...process.env, ...env, FORCE_COLOR: '1' },
    shell: true,
  })

  proc.stdout.on('data', (data) => {
    String(data).split('\n').filter(Boolean).forEach((line) => {
      process.stdout.write(prefix(label, color) + line + '\n')
    })
  })

  proc.stderr.on('data', (data) => {
    String(data).split('\n').filter(Boolean).forEach((line) => {
      process.stderr.write(prefix(label, RED) + line + '\n')
    })
  })

  proc.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      console.error(`${RED}${BOLD}[${label}] exited with code ${code}${RESET}`)
    }
  })

  return proc
}

console.log(`\n${BOLD}🍫 Sweets by Talya — Local Dev${RESET}`)
console.log(`${DIM}Starting frontend + API server...${RESET}\n`)

// Start local API server on port 3001
const api = spawnProcess('API', CYAN, 'node', ['scripts/dev-api.mjs'], { PORT: '3001' })

// Give the API server 1s to start, then launch Vite on port 3000
setTimeout(() => {
  const vite = spawnProcess('VITE', GREEN, 'npx', ['vite', '--port', '3000', '--strictPort'])

  // Print helpful info after Vite starts
  setTimeout(() => {
    console.log(`\n${BOLD}${GREEN}✅ Ready!${RESET}`)
    console.log(`   ${CYAN}Frontend:${RESET} http://localhost:3000`)
    console.log(`   ${CYAN}API:${RESET}      http://localhost:3001`)
    console.log(`   ${DIM}Press Ctrl+C to stop both servers${RESET}\n`)
  }, 2500)

  // Handle Ctrl+C — kill both processes
  process.on('SIGINT', () => {
    console.log(`\n${YELLOW}Shutting down...${RESET}`)
    vite.kill()
    api.kill()
    process.exit(0)
  })
}, 1000)
