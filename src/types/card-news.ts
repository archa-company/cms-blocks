export interface ICardNews {
  data: ICardData
  haveBorder: boolean
}

type CardFormat =
  | 'highlight'
  | 'vertical'
  | 'vertical-top'
  | 'vertical-bottom'
  | 'horizontal'
  | 'horizontal-left'
  | 'horizontal-right'
type CardSize = 'small' | 'medium' | 'large'

export interface ICardData {
  //postObject: 1,
  //_postObject: string,
  //hasImage: string
  //_hasImage: string
  //overwrite: string
  //_overwrite: string
  hat: string
  uri?: string
  //_hat: string
  title: string
  //_title: string
  link: string
  //_link: string
  image: string
  //_image: string
  format: CardFormat
  //_format: string
  size: CardSize
  //_size: string
  sponsor: string
  //_sponsor: string
  //widthLimit: string
  //_widthLimit: string
  relateds?: string
  //_relateds: string
}
