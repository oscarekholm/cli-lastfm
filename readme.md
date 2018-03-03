# cli-lastm

🎧 A simple Nodejs cli for getting a user's currently playing song from
Lastfm 🎧

Basically a small cli wrapper on top of [`last-fm`](https://www.npmjs.com/package/lastfm).

## Prerequisites

You need an API account for [Lastfm](https://www.last.fm/api) for using
this. Write down your API key and secret since you will need them when
configuring the cli.

## Installation

Install `cli-lastfm` globally and run its binary `cli-lastfm-configure`:

```bash
$ npm i -g cli-lastfm
$ cli-lastfm-configure
```

Fill in your API key and secret and a unique user agent (e.g.
`my-name-cli-lastfm/v0.1.0`) and you are done.

## Usage

Run the `np` and pass in a lastfm user and you'll get their last played
or currently playing track:

```bash
$ np username
```

## Contributing

If you'd like to contribute to this project, install [`cz-delta`](https://github.com/oscarekholm/cz-delta) and use it for writing your commit messages. This to keep a sane standard for versioning. 🤓
