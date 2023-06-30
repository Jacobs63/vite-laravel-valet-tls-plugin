import {ServerOptions, UserConfig} from "vite";
import {resolve} from "path";
import {homedir} from "os";
import {Plugin} from "vite";
import * as fs from "fs";
import 'dotenv/config'

export interface PluginConfig {
    host: string
}

export default function laravelValetTlsPlugin(config?: PluginConfig): Plugin {
    return {
        name: 'vite-laravel-valet-tls-plugin',
        config: (userConfig: UserConfig, { mode }): { server: ServerOptions } | void => {
            if (mode !== 'development') {
                return
            }

            let host = undefined

            if (config?.host) {
                host = config.host
            }

            if (host === undefined && process.env.MIX_APP_URL) {
                host = new URL(process.env.MIX_APP_URL).hostname
            }

            console.log(host)

            if (host === undefined) {
                return
            }

            return {
                server: {
                    ...detectServerConfig(host),
                    ...userConfig.server,
                }
            }
        }
    }
}

const detectServerConfig = (host: string): ServerOptions => {
    const keyPath: string = resolve(homedir(), `.config/valet/Certificates/${host}.key`)

    if (!fs.existsSync(keyPath)) {
        return {}
    }

    const certificatePath: string = resolve(homedir(), `.config/valet/Certificates/${host}.crt`)

    if (!fs.existsSync(certificatePath)) {
        return {}
    }

    return {
        hmr: {
            host
        },
        host,
        https: {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certificatePath),
        },
    }
}