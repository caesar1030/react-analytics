import ReactDOM from 'react-dom'

import type { DeepReadonly, Nullable } from '@/util'
import type {
  GtagConfigParams,
  GtagConsentArg,
  GtagConsentParams,
  GtagEventName,
  GtagEventParams,
  QueuedCommand,
} from './type'

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

export class GA4 {
  private isScriptLoaded = false
  private analyticsConfig: Nullable<GtagConfigParams> = null

  private unHandledCommandList: QueuedCommand[] = []
  private loadHandlers: (() => void)[] = []

  public constructor(private readonly measurementId: string) {}

  private loadGoogleAnalytics(config?: GtagConfigParams): void {
    window.dataLayer = window.dataLayer || []
    const gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
    window.gtag = gtag

    const script = document.createElement('script')
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`
    script.async = true
    ReactDOM.preload(script.src, {
      as: 'script',
    })

    script.onload = () => {
      this.printDebug('GA script loaded successfully')
      window.gtag('js', new Date())
      window.gtag(
        'config',
        this.measurementId,
        config ?? {
          send_page_view: false,
        },
      )

      script.remove()
      this.isScriptLoaded = true
      this.handleQueuedCommands()
      this.loadHandlers.forEach((handler) => handler())
    }

    script.onerror = (error) => {
      this.printError('Failed to load GA script:', error)
    }

    document.body.appendChild(script)
    this.printDebug('GA script injected')
  }

  public initialize(config?: GtagConfigParams): void {
    if (this.isScriptLoaded) {
      this.printDebug('Already initialized')
      return
    }

    this.analyticsConfig = {
      ...config,
    }
    this.loadGoogleAnalytics(config)
  }

  public event(eventName: GtagEventName, eventParams: GtagEventParams): void {
    if (!this.isScriptLoaded) {
      this.queueCommand({
        command: 'event',
        eventName: eventName,
        params: eventParams,
      })
      return
    }

    try {
      const mergedParams = {
        ...this.analyticsConfig,
        ...eventParams,
      }
      window.gtag('event', eventName, mergedParams)
    } catch (error) {
      this.printError('Failed to send GA event:', error)
    }
  }

  public config(config: GtagConfigParams): void {
    if (!this.isScriptLoaded) {
      this.queueCommand({
        command: 'config',
        params: config,
      })
      return
    }

    try {
      window.gtag('config', this.measurementId, config)
      this.analyticsConfig = { ...this.analyticsConfig, ...config }
    } catch (error) {
      this.printError('Failed to update GA config:', error)
    }
  }

  public consent(args: GtagConsentArg, params: GtagConsentParams): void {
    if (!this.isScriptLoaded) {
      this.queueCommand({
        command: 'consent',
        consentArgs: args,
        params,
      })
      return
    }

    try {
      window.gtag('consent', args, params)
    } catch (error) {
      this.printError('Failed to update GA consent:', error)
    }
  }

  public set<K extends keyof GtagConfigParams | string>(
    args: K,
    params: K extends keyof GtagConfigParams ? GtagConfigParams[K] : unknown,
  ): void {
    if (!this.isScriptLoaded) {
      this.queueCommand({
        command: 'set',
        setArgs: args,
        params,
      })
      return
    }

    try {
      if (args) window.gtag('set', args, params)
      else window.gtag('set', params)
    } catch (error) {
      this.printError('Failed to update GA set:', error)
    }
  }

  public onLoad(handler: () => void): void {
    if (this.isScriptLoaded) {
      handler()
    } else {
      this.loadHandlers.push(handler)
    }
  }

  public get configInfo(): Nullable<DeepReadonly<GtagConfigParams>> {
    return structuredClone(this.analyticsConfig)
  }

  private queueCommand(command: QueuedCommand) {
    this.unHandledCommandList.push(command)
  }

  private handleQueuedCommands() {
    this.unHandledCommandList.forEach((queuedCommand) => {
      switch (queuedCommand.command) {
        case 'event':
          this.event(queuedCommand.eventName, queuedCommand.params)
          break
        case 'set':
          this.set(queuedCommand.setArgs, queuedCommand.params)
          break
        case 'config':
          this.config(queuedCommand.params)
          break
        case 'consent':
          this.consent(queuedCommand.consentArgs, queuedCommand.params)
          break
      }
    })

    this.unHandledCommandList = []
  }

  private printDebug(message: string, ...args: unknown[]): void {
    if (this.analyticsConfig?.debug_mode)
      console.log(`[Analytics] ${message}`, ...args)
  }

  private printError(message: string, ...args: unknown[]): void {
    console.error(`[Analytics] ${message}`, ...args)
  }
}
