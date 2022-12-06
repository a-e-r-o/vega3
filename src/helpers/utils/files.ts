import { Buffer, writeAll } from '../../mod.ts'

/** Creates a `Reader` from a `ReadableStreamDefaultReader` */
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

/** Takes a list of file paths and creates a zip file containing them all */
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

/** Method to remove all files in a folder */
export async function clearDir(dirPath: string) {
	for await(const dirEntry of Deno.readDir(dirPath)) {
    await Deno.remove(`${dirPath}/${dirEntry.name}`, { recursive: true })
	}
}

/** Function to check if a file exists */
export async function exists(path: string) {
	try {
		await Deno.stat(path)
		// successful, file or directory must exist
		return true
	} catch (error) {
		if (error && (error.name === Deno.errors.NotFound.name)) {
			// file or directory does not exist
			return false
		} else {
			// unexpected error, maybe permissions, pass it along
			throw error
		}
	}
}