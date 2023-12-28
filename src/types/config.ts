export interface IConfigBase {
  ads: IADsConfig
  analytics: IAnalyticsConfig
  domain: IDomainConfig
  features: IFeaturesConfig
  infra: IInfraConfig
  lgpd: ILGPDConfig
}

interface IADsConfig {
  accountUnit: string
  enable: boolean
  mappingCdn: string
  mappingFilePath: string
  scriptUrl: string
  seletor: string
  siteUnit: string
}

interface IAnalyticsConfig {
  enable: boolean
  ga3Id: string
  ga4BusinessId: string
  ga4Id: string
  gpTrackerId: string
  gtmId: string
}

interface IDomainConfig {
  id: string
  oficial: string
  cms: string
}

interface IFeaturesConfig {
  ampPost: boolean
  homeEditor: boolean
  webStories: boolean
}

interface IInfraConfig {
  elasticsearchEndpoint: string
  elasticsearchIndex: string
  elasticsearchPass: string
  elasticsearchUser: string
  enable: boolean
  eventbus: string
  s3BasePath: string
  s3Bucket: string
}

interface ILGPDConfig {
  enable: boolean
  privacyToolsAmpId: string
  privacyToolsId  : string
}
