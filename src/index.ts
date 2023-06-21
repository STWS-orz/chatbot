import { urlSearchParams } from '../src/ultil'
import { createDom } from './createDom'
import { editDom } from './editDom'
import { metadata, style, client } from './config'

editDom()
urlSearchParams(style, client)
new createDom(style, client, metadata)
