import { PostNews } from './Post'

export default interface NotFoundResponse {
  revalidate?: number
  notFound: true
}

export interface ISVGIconProps {
  width?: number
  height?: number
  fill?: string
  className?: string
}

export interface IAppPageProps {
  posts: PostNews[]
}
