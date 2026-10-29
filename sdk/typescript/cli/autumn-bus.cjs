#!/usr/bin/env node
'use strict'

const { spawn } = require('node:child_process')
const { accessSync, constants, readFileSync, statSync } = require('node:fs')
const { dirname, join } = require('node:path')
const manifest = require('../package.json')

const targets = ['darwin-arm64', 'darwin-x64', 'linux-arm64', 'linux-x64', 'win32-arm64', 'win32-x64']

function platformPackage(platform = process.platform, arch = process.arch) {
  const target = `${platform}-${arch}`
  if (!targets.includes(target)) {
<<<<<<<< HEAD:sdk/typescript/cli/autumn-bus.cjs
    throw new Error(`No Autumn Bus npm binary for ${target}. Use a native release or build the Go daemon from source: https://github.com/Adi103-ETAI/autumn-bus#quickstart`)
  }
  return { target, name: `${manifest.name}-${target}`, binary: platform === 'win32' ? 'autumn-bus.exe' : 'autumn-bus' }
========
    throw new Error(`No Autumn Bus npm binary for ${target}. Use a native release or build the Go daemon from source: https://github.com/Adi103-ETAI/autumn-bus#quickstart`)
  }
  return { target, name: `@autumn-dev/autumn-bus-${target}`, binary: platform === 'win32' ? 'autumn-bus.exe' : 'autumn-bus' }
>>>>>>>> 7575c4c (Add hosted workspaces and managed agent connections):sdk/typescript/cli/autumn-bus.cjs
}

function resolveBinary(platform = process.platform, arch = process.arch, resolve = require.resolve) {
  const { name, binary } = platformPackage(platform, arch)
  let metadata
  try {
    metadata = resolve(`${name}/package.json`)
  } catch (error) {
    throw new Error(`Missing ${name}@${manifest.version}. Reinstall ${manifest.name}@${manifest.version} with npm install --include=optional. Do not copy node_modules between operating systems or CPU architectures.`, { cause: error })
  }
  const installed = JSON.parse(readFileSync(metadata, 'utf8'))
  if (installed.name !== name || installed.version !== manifest.version) {
<<<<<<<< HEAD:sdk/typescript/cli/autumn-bus.cjs
    throw new Error(`Autumn Bus binary package mismatch: expected ${name}@${manifest.version}, got ${installed.name}@${installed.version}. Reinstall with optional dependencies enabled.`)
========
    throw new Error(`Autumn Bus binary package mismatch: expected ${name}@${manifest.version}, got ${installed.name}@${installed.version}. Reinstall with optional dependencies enabled.`)
>>>>>>>> 7575c4c (Add hosted workspaces and managed agent connections):sdk/typescript/cli/autumn-bus.cjs
  }
  const path = join(dirname(metadata), 'bin', binary)
  try {
    if (!statSync(path).isFile()) throw new Error('not a regular file')
    accessSync(path, platform === 'win32' ? constants.F_OK : constants.X_OK)
  } catch (error) {
<<<<<<<< HEAD:sdk/typescript/cli/autumn-bus.cjs
    throw new Error(`Autumn Bus binary is missing or not executable: ${path}. Reinstall ${name}@${manifest.version}.`, { cause: error })
========
    throw new Error(`Autumn Bus binary is missing or not executable: ${path}. Reinstall ${name}@${manifest.version}.`, { cause: error })
>>>>>>>> 7575c4c (Add hosted workspaces and managed agent connections):sdk/typescript/cli/autumn-bus.cjs
  }
  return path
}

function run(args = process.argv.slice(2), binary = resolveBinary(), spawnChild = spawn, host = process) {
  const child = spawnChild(binary, args, { stdio: 'inherit', shell: false })
  const forwarders = new Map(['SIGINT', 'SIGTERM'].map(signal => [signal, () => child.kill(signal)]))
  for (const [signal, forward] of forwarders) host.on(signal, forward)
  const cleanup = () => {
    for (const [signal, forward] of forwarders) host.removeListener(signal, forward)
  }
  child.once('error', error => {
    cleanup()
<<<<<<<< HEAD:sdk/typescript/cli/autumn-bus.cjs
    console.error(`autumn-bus: could not start native binary: ${error.message}`)
========
    console.error(`autumn-bus: could not start native binary: ${error.message}`)
>>>>>>>> 7575c4c (Add hosted workspaces and managed agent connections):sdk/typescript/cli/autumn-bus.cjs
    host.exitCode = 1
  })
  child.once('exit', (code, signal) => {
    cleanup()
    if (signal) host.kill(host.pid, signal)
    else host.exitCode = code ?? 1
  })
  return child
}

module.exports = { targets, platformPackage, resolveBinary, run }
if (require.main === module) {
  try { run() } catch (error) {
<<<<<<<< HEAD:sdk/typescript/cli/autumn-bus.cjs
    console.error(`autumn-bus: ${error.message}`)
========
    console.error(`autumn-bus: ${error.message}`)
>>>>>>>> 7575c4c (Add hosted workspaces and managed agent connections):sdk/typescript/cli/autumn-bus.cjs
    process.exitCode = 1
  }
}
