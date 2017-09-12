# ⚡️ Current

## Installation

```
npm i -g current-cli
```

## Usage

On first run, or at any time you can configure `current` so that it knows what languages you'd like to see reported. Run `current --configure` and it will prompt you

### Viewing all versions

```shellcommand
current
```

### Viewing a single version

```shellcommand
current go
```

Assuming you've entered a languages that is currently supported, `current` will return the configured version:

```shellcommand
current go
go: 1.8.3
```

## Roadmap

* Support additional languages
* Support registering commands `current --register <name> --command <shellcommand>`
* Support toggling languages without running a full configuration `current --add elixir`

## Contributing

Please read the [contribution guidelines](CONTRIBUTING.md) in order to make the contribution process easy and effective for everyone involved.

## Copyright

Copyright (c) Steve Agalloco. See [LICENSE](https://github.com/stve/current-cli/blob/master/LICENSE.md) for details.
