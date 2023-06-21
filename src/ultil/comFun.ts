/*
 * Description: common fun
 * File Created:  21st June 2023 10:34:12 pm
 * Author: shiqin
 */

import { dom } from '../config'
// Text with HTML tags other than <a> tags with web links or <br> will be detected as HTML.
export function isHtml(text: string) {
  return /<(?:(?:(?:a\s+(?:[^>]*?\bhref\s*=)[^>]*?|[a-z]+\s*\/?>))(?:(?!<\s*\/\s*\1\s*>)[\s\S])*<\s*\/\s*\1\s*>|[a-z][\s\S]*>|br\s*\/?\s*>)/i.test(
    text
  )
}

// Strip all <script> tags from the message  stripScripts(inputText)
export function stripScripts(inputText: string) {
  return inputText.replace(
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    ''
  )
}

// Add handlers for drag and drop events
export function handleDragOver(event: any) {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'copy'
}

// Handle click event on the copy buttons
export function addCopyButtonsListener() {
  const copyButtons = document.querySelectorAll('.copy-button')
  copyButtons.forEach((button) => {
    button.addEventListener('click', (event: any) => {
      const codeBlock = event.target.closest('.code-block')
      const code = codeBlock.querySelector('pre').innerText
      navigator.clipboard.writeText(code)
      button.textContent = 'Copied!'
      setTimeout(() => {
        button.textContent = 'Copy'
      }, 3000)
    })
  })
}

export async function domContentLoad() {
  const messagesContainer = document.getElementById('messages-container')
  const sessionData = await restoreSessionData()
  if (messagesContainer) {
    // restoreChatHistory();
    restoreChatHistory(messagesContainer)
  }
  if (sessionData) {
    // Use the sessionData in your chatbot logic to restore the session
  }
}

async function restoreSessionData() {
  const sessionData = sessionStorage.getItem('sessionData')
  if (sessionData) {
    return JSON.parse(sessionData)
  }
  return null
}

// Load chat history from IndexedDB
async function restoreChatHistory() {
  const openRequest = indexedDB.open('chatDatabase', 1)
  openRequest.onsuccess = function (event: any) {
    const db = event.target.result
    const transaction = db.transaction('chatHistory', 'readonly')
    const chatHistoryStore = transaction.objectStore('chatHistory')

    const getRequest = chatHistoryStore.get('chat')
    getRequest.onsuccess = function (event: any) {
      const chatHistory = event.target.result && event.target.result.content
      if (chatHistory) {
        dom.messagesContainer.innerHTML = chatHistory
      }
    }
  }
}
// Save chat history to IndexedDB
export function saveChatHistory(messagesContainer: any) {
  const chatHistory = messagesContainer.innerHTML

  const openRequest = indexedDB.open('chatDatabase', 1)
  openRequest.onsuccess = function (event: any) {
    const db = event.target.result
    const transaction = db.transaction('chatHistory', 'readwrite')
    const chatHistoryStore = transaction.objectStore('chatHistory')
    const chatItem = { id: 'chat', content: chatHistory }
    chatHistoryStore.put(chatItem)
  }
}

// Add handling of session assets
// Function to create a new asset element
export function createAssetElement(filename: any, fileType: any) {
  // Create a new asset div
  const assetElement = document.createElement('div')
  assetElement.classList.add('asset-element')

  // Create a span for the filename (displaying up to 20 characters)
  const filenameElement = document.createElement('span')
  filenameElement.classList.add('asset-filename')
  filenameElement.innerText =
    filename.length > 20 ? filename.substring(0, 20) + '...' : filename
  assetElement.appendChild(filenameElement)

  // Create an icon to indicate the file type
  const fileTypeIcon = document.createElement('img')
  fileTypeIcon.classList.add('file-type-icon')
  fileTypeIcon.src = '../public/' + fileType + '.png' // Assuming you have images named after file types
  assetElement.appendChild(fileTypeIcon)

  // Create a checkbox to indicate whether the asset is selected or not
  const checkboxElement = document.createElement('input')
  checkboxElement.classList.add('asset-checkbox')
  checkboxElement.setAttribute('type', 'checkbox')
  assetElement.appendChild(checkboxElement)

  // Create a delete icon
  const deleteIcon = document.createElement('img')
  deleteIcon.classList.add('delete-icon')
  deleteIcon.src = '../public/delete.png' // Assuming you have a delete icon image
  assetElement.appendChild(deleteIcon)

  // Add the asset element to the asset container
  dom.assetContainer.appendChild(assetElement)
}
