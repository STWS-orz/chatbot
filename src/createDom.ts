import {
  stripScripts,
  isHtml,
  addCopyButtonsListener,
  markdownToHtmlTable,
  parseCodeMessage,
  handleDragOver,
  saveChatHistory,
  domContentLoad,
} from '../src/ultil'
import { editDom } from './editDom'
import { dom, userImageData, userDocumentData, botImageData } from './config'
export class createDom {
  style: string
  client: string
  metadata: any
  constructor(style: any, client: any, metadata: any) {
    this.init()
    this.effect()
    this.initDatabase()
    this.client = client
    this.style = style
    this.metadata = metadata
  }
  init() {
    editDom()
  }
  effect() {
    dom.inputElement.addEventListener('keydown', this.inputElentFun.bind(this))
    dom.chatContainer.addEventListener('dragover', handleDragOver)
    dom.chatContainer.addEventListener('drop', this.handleDrop)
    dom.inputElement.addEventListener('paste', this.inputElemt)
    dom.imageInput.addEventListener('change', this.imageInputFun)
    dom.documentInput.addEventListener('change', this.documentInputFun)
    dom.sendButtonElement.addEventListener(
      'click',
      this.sendButtonElementFun.bind(this)
    )
    dom.toggleButton.addEventListener('click', this.toggleChatbot)
    dom.clearButtonElement.addEventListener('click', this.clearButtonElementFun)
    dom.imageUploadButton.addEventListener('click', () => {
      dom.imageInput.click()
    })
    dom.documentUploadButton.addEventListener('click', () => {
      dom.documentInput.click()
    })
    document.addEventListener('DOMContentLoaded', domContentLoad)
  }

  async inputElentFun(event: any) {
    if (event.key === 'Enter') {
      const inputElement = dom.inputElement
      const imagePreview = dom.imagePreview
      const style = window.getComputedStyle(inputElement)
      if (event.shiftKey) {
        event.preventDefault()
        const cursorPosition = inputElement.selectionStart
        const currentValue = inputElement.value
        const newValue =
          currentValue.substring(0, cursorPosition) +
          '\n' +
          currentValue.substring(cursorPosition)
        inputElement.value = newValue
        inputElement.selectionStart = inputElement.selectionEnd =
          cursorPosition + 1
        inputElement.style.height = `${Math.min(
          inputElement.scrollHeight,
          parseInt(style.getPropertyValue('max-height'))
        )}px`
      } else {
        event.preventDefault()
        const message = inputElement.value
        inputElement.style.height = style.getPropertyValue('min-height')
        inputElement.value = ''
        imagePreview.src = ''
        imagePreview.style.display = 'none'
        // this.sendMessage(message).then(() => { });
        await this.sendMessage(message)
      }
    }
  }

  imageInputFun(event: any) {
    const imagePreview = dom.imagePreview
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      // Pass the data URL to the sendMessage function as the imageUrl parameter
      userImageData.data = reader.result
      userImageData.type = userImageData.data.match(
        /^data:(image\/.*);base64,/
      )[1]
      // console.log(userImageData.type);
      // console.log(userImageData.data)
    })
    reader.onerror = (error) => console.log(error)

    if (file) {
      reader.readAsDataURL(file)
      reader.onload = (event: any) => {
        imagePreview.src = event.target.result
        imagePreview.style.display = 'block'
      }
      reader.onerror = (error) => console.log(error)
    }
  }

  // Send a message when the user clicks the "Send" button
  async sendButtonElementFun() {
    const message = dom.inputElement.value
    dom.inputElement.value = ''
    dom.inputElement.style.height = '40px'
    dom.imagePreview.src = ''
    dom.imagePreview.style.display = 'none'
    await this.sendMessage(message)
  }

  documentInputFun(event: any) {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.addEventListener('load', () => {
      // Pass the data URL to the sendMessage function as the imageUrl parameter
      userDocumentData.data = reader.result
      userDocumentData.type = file.type
      // console.log(userDocumentData.data);
      // console.log(userDocumentData.type);
    })
    reader.onerror = (error) => console.log(error)

    if (file) {
      reader.readAsDataURL(file)
      if (file.type.startsWith('public/')) {
        reader.onload = (event: any) => {
          dom.imagePreview.src = event.target.result
          dom.imagePreview.style.display = 'block'
        }
      } else {
        dom.imagePreview.src = '../public/documents.png'
        dom.imagePreview.style.display = 'block'
      }
      reader.onerror = (error) => console.log(error)
    }
  }

  // Function to add a message to the chat interface
  addMessage(message: string, isUserMessage: any, imageUrl: string) {
    const messagesContainer = dom.messagesContainer
    const messageElement = document.createElement('div')
    messageElement.classList.add('chat-message')

    // Create a div for the user icon and bot icon
    const userIcon = document.createElement('div')
    userIcon.classList.add('user-message')
    userIcon.classList.add('user-icon')
    const userImage = document.createElement('img')
    const userProfilePictureUrl = sessionStorage.getItem(
      'userProfilePictureUrl'
    )
    if (userProfilePictureUrl && userProfilePictureUrl !== 'null') {
      userImage.src = userProfilePictureUrl
    } else {
      userImage.src = 'public/user-icon.png'
    }
    userIcon.appendChild(userImage)

    const botIcon = document.createElement('div')
    botIcon.classList.add('bot-message')
    botIcon.classList.add('bot-icon')
    const botImage = document.createElement('img')
    botImage.src = 'public/bot-icon.png'
    botIcon.appendChild(botImage)

    // Create a div for the message content
    const textElement = document.createElement('div')
    if (isUserMessage) {
      textElement.classList.add('user-message')
      if (this.style === 'business') {
        textElement.classList.add('user-message-content-business')
      } else if (this.style === 'education') {
        textElement.classList.add('user-message-content-education')
      } else if (this.style === 'fitness') {
        textElement.classList.add('user-message-content-fitness')
      } else if (this.style === 'personal') {
        textElement.classList.add('user-message-content-personal')
      } else {
        textElement.classList.add('user-message-content')
      }
    } else {
      textElement.classList.add('bot-message')
      if (this.style === 'business') {
        textElement.classList.add('bot-message-content-business')
      } else if (this.style === 'education') {
        textElement.classList.add('bot-message-content-education')
      } else if (this.style === 'fitness') {
        textElement.classList.add('bot-message-content-fitness')
      } else if (this.style === 'personal') {
        textElement.classList.add('bot-message-content-personal')
      } else {
        textElement.classList.add('bot-message-content')
      }
    }
    let parsedMessage
    if (isUserMessage) {
      parsedMessage = parseCodeMessage(stripScripts(message)).message
    } else {
      try {
        parsedMessage = markdownToHtmlTable(parseCodeMessage(message).message)
      } catch (error) {
        console.log(error)
        parsedMessage = parseCodeMessage(message).message
      }
    }
    if (isHtml(parsedMessage)) {
      textElement.innerHTML = parsedMessage
      if (!isUserMessage) {
        // Find and execute script tags inside 'bot-message'
        const scriptTags = textElement.getElementsByTagName('script')
        for (let i = 0; i < scriptTags.length; i++) {
          const script = document.createElement('script')
          script.type = 'text/javascript'
          if (scriptTags[i].src) {
            script.src = scriptTags[i].src
          } else {
            script.textContent = scriptTags[i].textContent
          }
          document.head.appendChild(script).parentNode.removeChild(script)
        }
      }
    } else {
      textElement.innerText = parsedMessage
    }

    if (isUserMessage) {
      messageElement.classList.add('user-message')
      messageElement.appendChild(textElement)
      messageElement.appendChild(userIcon)
    } else {
      messageElement.classList.add('bot-message')
      messageElement.appendChild(botIcon)
      messageElement.appendChild(textElement)
    }

    if (imageUrl) {
      const imageDiv = document.createElement('div')
      const imageElement = document.createElement('img')
      imageElement.src = imageUrl
      imageDiv.appendChild(imageElement)
      textElement.appendChild(imageDiv)
    }
    messagesContainer.appendChild(messageElement)
    messagesContainer.scrollTop = messagesContainer.scrollHeight
    addCopyButtonsListener()
  }

  // Function to send a message to the chatbot
  async sendMessage(message: any) {
    const userMessage = message
    console.log(userMessage)
    // Replace the URLs in the bot message content with HTML anchor tags
    const formattedUserMessage = message.replace(
      /((?:https?:\/\/|www\.)\S+(?:[.,;:?!]+)?)/g,
      (match: any) => {
        if (match.startsWith('www.')) {
          return `<a href="https://${match}" target="_blank">${match}</a>`
        } else {
          return `<a href="${match}" target="_blank">${match}</a>`
        }
      }
    )
    // Add the user message to the chat interface
    this.addMessage(formattedUserMessage, true, userImageData.data)

    // Implementation of the getChatbotResponse function should be overwritten
    const botResponse = await this.getChatbotResponse(stripScripts(userMessage))
    console.log(botResponse)

    // Replace the URLs in the bot message content with HTML anchor tags
    const formattedBotResponse = botResponse.replace(
      /(?!(src|href)=")((?:https?:\/\/|www\.)\S+(?:[.,;:?!]+)?)(?!.*")/g,
      (match: any) => {
        if (match.startsWith('www.')) {
          return `<a href="https://${match}" target="_blank">${match}</a>`
        } else {
          return `<a href="${match}" target="_blank">${match}</a>`
        }
      }
    )
    // Add the chatbot's response to the chat interface
    if (botImageData.url) {
      // console.log("botImage.url: " + botImage.url)
      this.addMessage(formattedBotResponse, false, botImageData.url)
    } else {
      // console.log("botImage.data received: " + botImage.data.length + " bytes")
      this.addMessage(formattedBotResponse, false, botImageData.data)
    }

    // Save the chat history and session data
    saveChatHistory(dom.messagesContainer)
    // saveSessionData();

    // Clear the image data
    userImageData.url = ''
    userImageData.data = ''
    userImageData.type = ''
    botImageData.url = ''
    botImageData.data = ''
    botImageData.type = ''
    botImageData.base64 = ''
    dom.imageInput.value = ''

    // Clear the document data
    userDocumentData.data = ''
    userDocumentData.type = ''
    userDocumentData.base64 = ''
  }

  // Handle paste event for user input
  inputElemt(event: any) {
    const items = event.clipboardData.items
    for (const item of items) {
      if (item.type.startsWith('image')) {
        const file = item.getAsFile()
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          // Pass the data URL to the sendMessage function as the imageUrl parameter
          userImageData.data = reader.result
          userImageData.type = userImageData.data.match(
            /^data:(image\/.*);base64,/
          )[1]
          // console.log(userImage.type);
          // console.log(userImage.data)
        })
        reader.onerror = (error) => console.log(error)
        if (file) {
          reader.readAsDataURL(file)
          reader.onload = (event: any) => {
            dom.imagePreview.src = event.target.result
            dom.imagePreview.style.display = 'block'
          }
          reader.onerror = (error) => console.log(error)
        }
      }
    }
  }

  // Implementation of the getChatbotResponse function
  async getChatbotResponse(message: any) {
    // Fetch the response from a chatbot server running on http://localhost:8000/chat with POST method
    let payload = {
      message: message,
      metadata: this.metadata,
      image: {},
      document: {},
    }
    if (userImageData.type && userImageData.data) {
      // console.log("adding image")
      payload.image = {
        type: userImageData.type,
        base64: userImageData.data.split(',')[1],
      }
    }
    if (userDocumentData.type && userDocumentData.data) {
      // console.log("adding document")
      payload.document = {
        type: userDocumentData.type,
        base64: userDocumentData.data.split(',')[1],
      }
    }
    // console.log("Payload:" + JSON.stringify(payload));
    const sessionToken = sessionStorage.getItem('sessionToken')
    const guestToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwMDYiLCJ1c2VybmFtZSI6InNhYXNfZGVtb0Bwcm8tYWkub3JnIiwidXNlcl9pZCI6IjExY2JlOWU2YjgzZDRkZjU4MzhjMjYxYzk0MzEyZjJmIiwiY2xpZW50X2lkIjoiMGNkZWY4YTc0M2JhNGM0YWE4YWNlOGE3ZDQ5Njc3ODkiLCJlbWFpbCI6ImluZm9AcHJvLWFpLm9yZyIsIm5hbWUiOiJCdXNpbmVzcyBTYWFTIERlbW8iLCJpYXQiOjE2NDUyMzkwMTl9.DGmhYIT_Qs98888gJY6viKpbzcxfAq3Alkm5wItN3FU'
    let response = null
    try {
      response = await fetch('https://conversation1st.com/api/chat', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + (sessionToken ? sessionToken : guestToken),
        },
        body: JSON.stringify(payload),
      })
    } catch (error) {
      console.log(error)
      return '......'
    }
    let data = await response.json()
    // console.log("Response data: " + JSON.stringify(data));
    this.metadata = data.metadata

    if (
      data.additional_data &&
      data.additional_data.images &&
      data.additional_data.images.length > 0
    ) {
      if (
        data.additional_data.images[0].type &&
        data.additional_data.images[0].type.length > 0 &&
        data.additional_data.images[0].base64 &&
        data.additional_data.images[0].base64.length > 0
      ) {
        botImageData.type = data.additional_data.images[0].type
        botImageData.base64 = data.additional_data.images[0].base64
        botImageData.data =
          'data:' + botImageData.type + ';base64,' + botImageData.base64
        // console.log("Received bot image data: " + botImage.base64.length);
      } else if (
        data.additional_data.images[0].url &&
        data.additional_data.images[0].url.length > 0
      ) {
        botImageData.url = data.additional_data.images[0].url
        // console.log("Received bot image URL: " + botImage.url);
      }
    }

    return data.response
  }

  handleDrop(event: any) {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      if (file.type.startsWith('image')) {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          userImageData.data = reader.result
          userImageData.type = userImageData.data.match(
            /^data:(image\/.*);base64,/
          )[1]
          userImageData.base64 = userImageData.data.split(',')[1]
        })
        reader.onerror = (error) => console.log(error)
        reader.readAsDataURL(file)
        reader.onload = (event: any) => {
          dom.imagePreview.src = event.target.result
          dom.imagePreview.style.display = 'block'
        }
        reader.onerror = (error) => console.log(error)
      } else {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          userDocumentData.data = reader.result
          userDocumentData.type = file.type
        })
        reader.onerror = (error) => console.log(error)

        reader.readAsDataURL(file)
        reader.onload = (event) => {
          dom.imagePreview.src = '../public/documents.png'
          dom.imagePreview.style.display = 'block'
        }
        reader.onerror = (error) => console.log(error)
      }
    }
  }
  // anyfun clearButtonElement
  clearButtonElementFun() {
    // clear the 'chatHistory' in local storage
    sessionStorage.removeItem('chatHistory')
    // clear the 'sessionData' in local storage
    sessionStorage.removeItem('sessionData')
    // clear the messages window
    dom.messagesContainer.innerHTML = ''
  }

  // Function to toggle the visibility of the chatbot
  toggleChatbot() {
    console.log(dom.chatContainer.style.display === 'none')
    if (dom.chatContainer.style.display === 'none') {
      dom.chatContainer.style.display = 'block'
      dom.toggleButton.innerText = 'Close'
    } else {
      dom.chatContainer.style.display = 'none'
      dom.toggleButton.innerText = 'Assistant'
    }
  }

  // eslint-disable-next-line no-unused-vars
  saveSessionData(sessionData: any) {
    sessionStorage.setItem('sessionData', JSON.stringify(sessionData))
  }

  // Initialize the IndexedDB database
  initDatabase() {
    const openRequest = indexedDB.open('chatDatabase', 1)
    openRequest.onupgradeneeded = function (event: any) {
      const db = event.target.result
      db.createObjectStore('chatHistory', { keyPath: 'id' })
    }
  }
}
