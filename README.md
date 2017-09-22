# ⚡️ Current

## Installation

```
npm i -g current-cli
```

## Usage

```
$ current --help

 Usage: index [options] <language>


 Options:

   -c, --configure  Configure
   -h, --help       output usage information
```

### Configuration

On first run, or at any time you can configure `current` so that it knows what languages you'd like to see reported. Run `current --configure` and it will prompt you

### Viewing all versions

```
$ current
go: 1.8.3
java: 1.8.0_102
ruby: 2.4.1p111
```

### Viewing a single version

Assuming you've entered a language that is currently supported, `current` will return the configured version:

```
$ current go
1.8.3
```

## Roadmap

* Support additional languages (see [`languages`](https://github.com/stve/current-cli/blob/master/lib/languages.js))
* Support registering commands `current --register <name> --command <shellcommand>`
* Support toggling languages without running a full configuration `current --add elixir`

## Contributing

Please read the [contribution guidelines](CONTRIBUTING.md) in order to make the contribution process easy and effective for everyone involved.

## Copyright

Copyright (c) Steve Agalloco. See [LICENSE](https://github.com/stve/current-cli/blob/master/LICENSE.md) for details.
