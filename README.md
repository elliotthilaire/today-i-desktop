# today-i-desktop

With one click I want to open a text box. Type a note. Then send it as a web request.
When I'm offline I want it to save my note. And send later it when I am back online.

I made this for myself to keep track of things I achieve to or learn through out the day.

<img width="604" alt="screen shot 2017-06-16 at 1 39 45 pm" src="https://user-images.githubusercontent.com/3443017/27228290-e38d776a-529e-11e7-8fb7-a650c382ec0e.png">

## Development

Install dependencies:
```bash
cd today-i-desktop/src
yarn install
```

Start electron in development mode:
```bash
cd today-i-desktop
yarn start-dev
```

See `today-i-desktop/package.json` for more `yarn ...` commands to build, install, and reinstall.

## Configuration

It will read a config file from `~/.config/today-i/.today-i-config.js`

It will store submissions for later in `~/.config/today-i/.today-i-db.js`

Override these with `TODAY_I_CONFIG` and `TODAY_I_STORAGE_FILE` environment variables.
i.e., for development.
