import 'express-session'

declare module 'express-session' {
  interface SessionData {
    /** Data from Discord when the user is logged in. */
    discord?: DiscordData
    /** The URL to redirect to after logging in. */
    redirect?: string
  }
}

declare global {
  /** Data from Discord of the user who is logged in. */
  interface DiscordData {
    /** The access token from Discord. */
    accessToken?: string
    /** The Discord user ID of the user who is logged in. */
    id?: string
    /** The avatar of the user who is logged in. */
    avatar?: string
    /** The global name of the user who is logged in. */
    globalName?: string
    /** The locale of the user who is logged in. */
    locale?: string
  }

  namespace Express {
    interface Locals {
      /** Data from Discord when the user is logged in. */
      discord?: DiscordData
    }
  }

  /** The response from Discord when an error occurs. */
  interface DiscordErrorResponse {
    error: string
    error_description: string
  }

  interface DiscordTokenResponse {
    token_type: 'Bearer'
    access_token: string
    expires_in: number
    refresh_token: string
    scope: 'identify'
  }

  /** The type of Discord Nitro a user is subscribed to. */
  enum DiscordPremiumType {
    /** The user is not subscribed to any form of Discord Nitro. */
    None = 0,
    /** The user is subscribed to Discord Nitro Classic. */
    NitroClassic = 1,
    /** The user is subscribed to Discord Nitro. */
    Nitro = 2,
    /** The user is subscribed to Discord Nitro Basic. */
    NitroBasic = 3
  }

  enum Locale {
    Indonesian = 'id',
    Danish = 'da',
    German = 'de',
    EnglishUK = 'en-GB',
    EnglishUS = 'en-US',
    SpanishSpain = 'es-ES',
    SpanishLatinAmerica = 'es-419',
    French = 'fr',
    Croatian = 'hr',
    Italian = 'it',
    Lithuanian = 'lt',
    Hungarian = 'hu',
    Dutch = 'nl',
    Norwegian = 'no',
    Polish = 'pl',
    Portuguese = 'pt-BR',
    Romanian = 'ro',
    Finnish = 'fi',
    Swedish = 'sv-SE',
    Vietnamese = 'vi',
    Turkish = 'tr',
    Czech = 'cs',
    Greek = 'el',
    Bulgarian = 'bg',
    Russian = 'ru',
    Ukrainian = 'uk',
    Hindi = 'hi',
    Thai = 'th',
    ChinesePRC = 'zh-CN',
    Japanese = 'ja',
    ChineseROC = 'zh-TW',
    Korean = 'ko'
  }

  enum DiscordUserFlags {
    None = 0,
    DiscordEmployee = 1 << 0,
    DiscordPartner = 1 << 1,
    HypeSquadEvents = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    HouseBravery = 1 << 6,
    HouseBrilliance = 1 << 7,
    HouseBalance = 1 << 8,
    EarlySupporter = 1 << 9,
    TeamUser = 1 << 10,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    EarlyVerifiedBotDeveloper = 1 << 17,
    DiscordCertifiedModerator = 1 << 18,
    BotHttpInteractions = 1 << 19,
    ActiveDeveloper = 1 << 22
  }

  interface DiscordUserResponseBase {
    /** Discord user ID. */
    id: string
    /** Discord username. */
    username: string
    /** Discord avatar hash. */
    avatar: string | null
    /** Discord tag (always `'0'` for human users). */
    discriminator: '0'
    /** Public flags on the user's account. */
    public_flags: number
    /** The type of Discord Nitro the user is subscribed to. */
    premium_type: DiscordPremiumType
    /** Flags on the user's account. */
    flags: number
    /** Discord banner hash. */
    banner: string | null
    /** Accent color encoded as an integer representation of hexadecimal color code. */
    accent_color: number | null
    /** User's display name, if set. */
    global_name: string | null
    /** Avatar decoration hash. */
    avatar_decoration_data: string | null
    /** Banner color encoded as an integer representation of hexadecimal color code. */
    banner_color: number | null
    /** Whether multi-factor authentication is enabled on the user's account. */
    mfa_enabled: boolean
    /** The user's chosen language. */
    locale: Locale
  }

  /** The Discord user data of a Nitro Basic subscriber. */
  interface DiscordUserResponseNitroBasic extends DiscordUserResponseBase {
    premium_type: DiscordPremiumType.NitroBasic
    banner: null
    accent_color: null
  }

  /** The Discord user data of a Nitro subscriber. */
  interface DiscordUserResponseNitro extends DiscordUserResponseBase {
    premium_type: DiscordPremiumType.Nitro
  }

  /** The Discord user data of a Nitro Classic subscriber. */
  interface DiscordUserResponseNitroClassic extends DiscordUserResponseBase {
    premium_type: DiscordPremiumType.NitroClassic
  }

  /** The Discord user data of a non-subscriber. */
  interface DiscordNoneUserResponse extends DiscordUserResponseBase {
    premium_type: DiscordPremiumType.None
    banner: null
    accent_color: null
  }

  /** The response from Discord when getting user information. */
  type DiscordUserResponse = DiscordUserResponseNitroBasic | DiscordUserResponseNitro | DiscordUserResponseNitroClassic | DiscordNoneUserResponse
}
