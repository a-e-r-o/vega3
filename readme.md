# This project is abandonned and unfinished. See github.com/a-e-r-o/vega4

# *V E G A*

VEGA is multi-purpose Discord bot, but really mainly a playground project for me to test things or just speed up some things by adding a command on vega instead of doing it manually

## Getting started

- Install [Deno](https://deno.land/) on your environment [(official instructions here)](https://deno.land/manual/getting_started/installation)
- Clone the repo with the following command
```bash
git clone https://gitlab.com/AeroCloud/vega.git
```
- Create a `config.yml` file at the root of the project (see section below)

Config file structure :
```yaml
token: [bot_token]
prefix: [command prefix] # optionnal, default is 'vega'
admins: # Only users whose IDs are in this list will be able to execute commands with the BotAdminRequired tag
- [discord_user_id]
- [...]
```

**Starting the bot :** <br>
Once you have cloned the repo and made sure you have installed Deno
```bash
deno run --allow-net --allow-read --unstable main.ts
```
The repo also contains a bash script simply called `launch` which simply runs the bot and restarts it if it crashes for whatever reasons. <br>
To use this script, make it executable and execute it in a bash shell. <br>
```bash
chmod +x launch.sh
./launch.sh
```
*I recommend using [tmux](https://www.redhat.com/sysadmin/introduction-tmux-linux) to keep the bot running in the background wihtout needing to keep your shell opened*
