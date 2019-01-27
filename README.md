# cognomen

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@itinerisltd/cognomen.svg)](https://npmjs.org/package/@itinerisltd/cognomen)
[![Downloads/week](https://img.shields.io/npm/dw/@itinerisltd/cognomen.svg)](https://npmjs.org/package/@itinerisltd/cognomen)
[![License](https://img.shields.io/npm/l/@itinerisltd/cognomen.svg)](https://github.com/ItinerisLtd/cognomen/blob/master/package.json)
[![Hire Itineris](https://img.shields.io/badge/Hire-Itineris-ff69b4.svg)](https://www.itineris.co.uk/contact/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Goal](#goal)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Options](#options)
- [FAQ](#faq)
  - [`Error: Alias '@xxx' not found.`](#error-alias-xxx-not-found)
  - [What if I have a multiple web server setup?](#what-if-i-have-a-multiple-web-server-setup)
  - [Can I change default flag values via environment variables?](#can-i-change-default-flag-values-via-environment-variables)
  - [Can I install `cognomen` instead of using `$ npx`?](#can-i-install-cognomen-instead-of-using--npx)
  - [Why don't you make an Ansible Galaxy role instead?](#why-dont-you-make-an-ansible-galaxy-role-instead)
  - [It looks awesome. Where can I find some more goodies like this?](#it-looks-awesome-where-can-i-find-some-more-goodies-like-this)
  - [This isn't on wp.org. Where can I give a ⭐️⭐️⭐️⭐️⭐️ review?](#this-isnt-on-wporg-where-can-i-give-a-%EF%B8%8F%EF%B8%8F%EF%B8%8F%EF%B8%8F%EF%B8%8F-review)
- [Feedback](#feedback)
- [Security](#security)
- [Change log](#change-log)
- [Credits](#credits)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Goal

Generate WP CLI aliases for [Trellis](https://github.com/roots/trellis/) projects.

Learn more on:
- [Running Commands Remotely - WP-CLI — WordPress](https://make.wordpress.org/cli/handbook/running-commands-remotely/)
- [Why should I use `cognomen`?](https://github.com/ItinerisLtd/cognomen/issues/3#issuecomment-456563138)

## Requirements

- NodeJS v10 or later
- WP CLI v2 or later
- Ansible v2.7.4 or later

## Installation

`$ npx @itinerisltd/cognomen` just works! No installation required.

## Usage

```sh-session
$ cd /path/to/trellis
$ npx @itinerisltd/cognomen
```

Add these lines to `<bedrock>/wp-cli.yml` or `<bedrock>/wp-cli.local.yml`:
```yaml
_:
  inherit: wp-cli.cognomen.yml
```

```sh-session
$ cd /path/to/bedrock
$ wp @staging cli info
$ wp @production cli info
```

### Options

```sh-session
# Specific remote environments
$ npx @itinerisltd/cognomen --remotes=staging,testing,qa

# Specific local environment
$ npx @itinerisltd/cognomen --local=dev

$ npx @itinerisltd/cognomen --help
Generate WP CLI aliases for Trellis projects

USAGE
  $ cognomen

OPTIONS
  -h, --help             show CLI help

  -l, --local=local      (required) [default: development] local environment
                         name

  -r, --remotes=remotes  comma-separated list of remote environment names

  -v, --version          show CLI version
```

## FAQ

### `Error: Alias '@xxx' not found.`

Add these lines to `<bedrock>/wp-cli.yml` or `<bedrock>/wp-cli.local.yml`:
```yaml
_:
  inherit: wp-cli.cognomen.yml
```

### What if I have a multiple web server setup?

Only 1 alias is generated per enviroment even if you have [a multiple web server setup](https://discourse.roots.io/t/best-practice-for-multiple-sites-on-multiple-servers/5385). Under the hood, `cogomen` use [anisble `run_once` option](https://docs.ansible.com/ansible/latest/user_guide/playbooks_delegation.html#run-once) to achive that.

### Can I change default flag values via environment variables?

Yes.

These 2 commands are equivalent:
```sh-session
$ npx @itinerisltd/cognomen --remotes=staging,testing,qa --local=dev
$ COGNOMEN_REMOTES=staging,testing,qa COGNOMEN_LOCAL=dev npx @itinerisltd/cognomen
```

### Can I install `cognomen` instead of using `$ npx`?

Yes. However, you are responsible for updating it.

```sh-session
# yarn or npm doesn't matter
$ yarn global add @itinerisltd/cognomen
$ cognomen --remotes=staging,testing,qa --local=dev
```

### Why don't you make an Ansible Galaxy role instead?

Because we have too [many sites to maintain](https://www.itineris.co.uk/work/), adding/updating [roles](https://github.com/search?q=topic%3Aansible-galaxy+org%3AItinerisLtd+fork%3Atrue) to all of our sites is tedious.

### It looks awesome. Where can I find some more goodies like this?

- Articles on [Itineris' blog](https://www.itineris.co.uk/blog/)
- More projects on [Itineris' GitHub profile](https://github.com/itinerisltd)
- Follow [@itineris_ltd](https://twitter.com/itineris_ltd) and [@TangRufus](https://twitter.com/tangrufus) on Twitter
- Hire [Itineris](https://www.itineris.co.uk/services/) to build your next awesome site

### This isn't on wp.org. Where can I give a ⭐️⭐️⭐️⭐️⭐️ review?

Thanks! Glad you like it. It's important to make my boss know somebody is using this project. Instead of giving reviews on wp.org, consider:

- tweet something good with mentioning [@itineris_ltd](https://twitter.com/itineris_ltd) and [@TangRufus](https://twitter.com/tangrufus)
- star this [Github repo](https://github.com/ItinerisLtd/cognomen)
- watch this [Github repo](https://github.com/ItinerisLtd/cognomen)
- write blog posts
- submit pull requests
- [hire Itineris](https://www.itineris.co.uk/services/)

## Feedback

**Please provide feedback!** We want to make this library useful in as many projects as possible.
Please submit an [issue](https://github.com/ItinerisLtd/cognomen/issues/new) and point out what you do and don't like, or fork the project and make suggestions.
**No issue is too small.**

## Security

If you discover any security related issues, please email [hello@itineris.co.uk](mailto:hello@itineris.co.uk) instead of using the issue tracker.

## Change log

Please see [CHANGELOG](./CHANGELOG.md) for more information on what has changed recently.

## Credits

[cognomen](https://github.com/ItinerisLtd/cognomen) is a [Itineris Limited](https://www.itineris.co.uk/) project created by [Tang Rufus](https://typist.tech).

Full list of contributors can be found [here](https://github.com/ItinerisLtd/cognomen/graphs/contributors).

## License

[cognomen](https://github.com/ItinerisLtd/cognomen) is released under the [MIT License](https://opensource.org/licenses/MIT).
