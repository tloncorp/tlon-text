import author from './author'
import blockContent from './blockContent'
import blockImage from './blockImage'
import blockLink from './blockLink'
import blockVideo from './blockVideo'
import menu from './menu'
import page from './page'
import post from './post'
import globalContent from './globalContent';
import postTag from './postTag'
import separator from './separator'
import homeCard from './homeCard'

export const schemaTypes = [
  post,
  postTag,
  author,
  page,
  globalContent,
  blockContent,
  blockImage,
  blockLink,
  blockVideo,
  menu,
  separator,
  homeCard,
]