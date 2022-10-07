import { Buffer, writeAll } from '../mod.ts'

/** 
 * Creates a `Reader` from a `ReadableStreamDefaultReader`
 */
export function getStreamReader(streamReader: ReadableStreamDefaultReader<Uint8Array>): Deno.Reader {
  const buffer = new Buffer()
	
  return {
    async read(p: Uint8Array): Promise<number | null> {
      if (buffer.empty()) {
        const res = await streamReader.read()
        if (res.done) {
          return null
        }
        await writeAll(buffer, res.value)
      }
      return buffer.read(p)
    },
  }
}

/**
 * Takes a list of file paths and creates a zip file containing them all
 */
export async function compress (files: string[], archiveName = './archive.zip'): Promise<boolean> {
	const cmdWinArgs = ['PowerShell', 'Compress-Archive', '-Path', files.join(', '), '-DestinationPath',archiveName, '-Force',]
	const cmdLinArgs = ['zip', archiveName, ...files]
	
  const compressCommandProcess = Deno.run({
    cmd: Deno.build.os === 'windows' ? cmdWinArgs : cmdLinArgs,
    stdout: 'piped',
    stderr: 'piped',
  })
  return (await compressCommandProcess.status()).success
}