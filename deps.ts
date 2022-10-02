// Version
export const version = '0.7.1'

// Deps
export * from 'https://deno.land/x/discordeno@11.2.0/mod.ts'
export * from 'https://deno.land/std@0.85.0/encoding/yaml.ts'
export {ensureDir} from 'https://deno.land/std@0.120.0/fs/mod.ts'
export { readerFromStreamReader } from "https://deno.land/std/io/mod.ts";
export { copy } from 'https://deno.land/std@0.158.0/streams/conversion.ts'
export { compress } from "https://deno.land/x/zip@v1.2.0/mod.ts";
import DataStore from "https://deno.land/x/dndb@0.3.3/mod.ts"; export default DataStore