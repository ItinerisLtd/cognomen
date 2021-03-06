import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
import * as execa from 'execa'
import * as fs from 'fs-extra'
import * as path from 'path'

class ItinerisltdCognomen extends Command {
  static description = 'Generate WP CLI aliases for Trellis projects'

  static examples = [
    'cognomen --remotes=staging,testing,qa --local=dev',
    'cognomen -r staging,testing,qa -l dev',
    'cognomen --help',
  ]

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    remotes: flags.string({
      char: 'r',
      description: 'comma-separated list of remote environment names',
      env: 'COGNOMEN_ENV',
    }),
    local: flags.string({
      char: 'l',
      description: 'local environment name',
      env: 'COGNOMEN_LOCAL',
      default: 'development',
      required: true,
    }),
  }

  static temporaries = {
    alias: {
      src: path.join(__dirname, '../templates/alias.yml'),
      dest: 'cognomen-alias.yml',
      retry: 'cognomen-alias.retry',
    },
    aliasJ2: {
      src: path.join(__dirname, '../templates/alias.yml.j2'),
      dest: 'cognomen-alias.yml.j2',
      retry: 'cognomen-alias.yml.j2.retry',
    },
    copy: {
      src: path.join(__dirname, '../templates/copy.yml'),
      dest: 'cognomen-copy.yml',
      retry: 'cognomen-copy.retry',
    },
  }

  async run() {
    const {flags} = this.parse(ItinerisltdCognomen)
    const {local} = flags
    let {remotes = null} = flags

    this.warn(`This project has been ported to roots/trellis-cli#52 (https://github.com/roots/trellis-cli/pull/52) and been abandoned. Use roots/trellis-cli instead and checkout similar tools by:
      - Itineris: https://github.com/ItinerisLtd
      - TangRufus: https://github.com/typisttech
    `)

    cli.action.start('Detecting remotes')
    let remoteHosts: string[] = []
    if (remotes === null) {
      const hosts = fs.readdirSync('./hosts')
      remoteHosts = hosts.filter(host => host !== local)
      cli.action.stop()
    } else {
      remoteHosts = remotes.split(',')
      cli.action.stop('skipped')
    }

    cli.action.start('Preapring playbooks')
    fs.emptyDirSync('.cognomen')
    Object.values(ItinerisltdCognomen.temporaries).forEach(temporary => fs.copyFileSync(temporary.src, temporary.dest))
    cli.action.stop()

    cli.action.start('Templating yaml parts')
    const templateAliases = remoteHosts.map(env => execa('ansible-playbook', [ItinerisltdCognomen.temporaries.alias.dest, `-e env=${env}`, `-e cognomen_alias_j2=${ItinerisltdCognomen.temporaries.aliasJ2.dest}`]))
    await Promise.all(templateAliases)
    cli.action.stop()

    cli.action.start('Merging yaml parts')
    const sites = fs.readdirSync('.cognomen').filter(file => fs.statSync(path.join('.cognomen', file)).isDirectory())
    const mergeYamls = sites.map(async site => {
      const readYamls = remoteHosts.map(env => fs.readFile(`.cognomen/${site}/wp-cli.${env}.yml.part`))
      const yamls = await Promise.all(readYamls)
      fs.writeFileSync(`.cognomen/${site}/wp-cli.cognomen.yml`, ['# Generated by @itinerisltd/cognomen\n', ...yamls].join('\n'))
    })
    await Promise.all(mergeYamls)
    cli.action.stop()

    cli.action.start('Copying wp-cli.cognomen.yml to Bedrock directoies')
    await execa('ansible-playbook', [ItinerisltdCognomen.temporaries.copy.dest, `-e env=${local}`])
    cli.action.stop()

    cli.action.start('Cleaning up')
    const removeDir = fs.remove('.cognomen')
    const removeTemporaries = Object.values(ItinerisltdCognomen.temporaries).map(temporary => fs.unlink(temporary.dest))
    const removeAnsibleReties = Object.values(ItinerisltdCognomen.temporaries).map(temporary => fs.unlink(`${temporary.retry}`).catch(() => {}))
    await Promise.all([removeDir, ...removeTemporaries, ...removeAnsibleReties])
    cli.action.stop()

    this.log('')
    this.log('Success: Generated `wp-cli.cognomen.yml` under local Bedrock directories!')
    this.log('Action Required: Add these lines into wp-cli.yml or wp-cli.local.yml')
    this.log('')
    this.log('_:')
    this.log('  inherit: wp-cli.cognomen.yml')

    this.log('')
    this.log('')
    this.log('')
    this.warn(`This project has been ported to roots/trellis-cli#52 (https://github.com/roots/trellis-cli/pull/52) and been abandoned. Use roots/trellis-cli instead and checkout similar tools by:
      - Itineris: https://github.com/ItinerisLtd
      - TangRufus: https://github.com/typisttech
    `)
  }
}

export = ItinerisltdCognomen
