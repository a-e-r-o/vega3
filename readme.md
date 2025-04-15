# *V E G A*

VEGA is multi-purpose Discord bot.
For now, vega uses both text-based commands with a prefix, and slah commands. <br> In the future it's intended to transition fully to slash commands and drop text-based commands

## Requirements

- [Deno](https://deno.land/) `2.1` or higher
- A [PostgreSql](https://www.postgresql.org/download/) database

## Config

Create a `config.yml` file at the root of the project.

Config file structure :
```yaml
token: [bot_token]
prefix: [command prefix] # optionnal, default is 'vega'
dbConnectionString: [postgreDBconnectionString] #see : https://deno-postgres.com/#/?id=connection-string
admins: # Only users whose IDs are in this list will be able to execute commands with the BotAdminRequired tag
- [discord_user_id]
- [...]
```

## **Starting the bot**
```bash
deno run --allow-net --allow-env --allow-read --allow-write  main.ts
```
The repo also contains a bash script simply called `launch` which simply runs the bot and restarts it if it crashes for whatever reasons. <br>
To use this script, make it executable and execute it in a bash shell. <br>
```bash
chmod +x launch.sh
./launch.sh
```
*I recommend using [tmux](https://www.redhat.com/sysadmin/introduction-tmux-linux) to keep the bot running in the background wihtout needing to keep your shell opened*