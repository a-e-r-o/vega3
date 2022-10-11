// Version
export const version = '0.7.3'

// Deps
export * from 'https://deno.land/x/discordeno@12.0.1/mod.ts'
export * from 'https://deno.land/std@0.85.0/encoding/yaml.ts'
export { ensureDirSync } from 'https://deno.land/std@0.120.0/fs/mod.ts'

// Files manipulations
export { readerFromStreamReader } from 'https://deno.land/std@0.120.0/io/mod.ts'
export { copy, writeAll } from 'https://deno.land/std@0.158.0/streams/conversion.ts'
export { Buffer } from 'https://deno.land/std@0.120.0/io/mod.ts'