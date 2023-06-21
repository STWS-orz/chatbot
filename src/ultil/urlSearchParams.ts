/*
 * Description: urlSearchParams
 * File Created:  21st June 2023 10:34:12 pm
 * Author: shiqin
 */
export function urlSearchParams(style: string, client: string) {
  const scripts = document.getElementsByTagName('script')
  const myScript = scripts[scripts.length - 1]
  const queryString = myScript.src.replace(/^[^?]+\??/, '')
  if (!queryString) {
    // do nothing
    style = 'generic'
    client = 'generic'
  } else {
    const params = new URLSearchParams(myScript.src.split('?')[1])
    style = params.get('style')
    client = params.get('client')
  }
  console.log('style: ', style)
  console.log('client: ', client)
}
