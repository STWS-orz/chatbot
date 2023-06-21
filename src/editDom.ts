/*
 * Description: 修改dom样式 属性
 * File Created:  21st June 2023 10:34:12 pm
 * Author: shiqin
 */
import { dom } from './config'
export function editDom() {
  // Create a toggle button element for the chatbot
  dom.toggleButton.innerText = 'Assistant'
  dom.toggleButton.classList.add('toggle-button')
  document.body.appendChild(dom.toggleButton)

  // Create a container element for the chatbot
  dom.chatContainer.setAttribute('id', 'chat-container')
  dom.chatContainer.classList.add('chat-container')
  dom.chatContainer.style.display = 'none'

  // Create a container element for the assets
  dom.assetContainer.setAttribute('id', 'asset-container')
  dom.assetContainer.classList.add('asset-container')
  dom.assetContainer.style.display = 'none' // Initially hidden
  dom.chatContainer.appendChild(dom.assetContainer)

  // Create a message container element
  dom.messagesContainer.setAttribute('id', 'messages-container')
  dom.messagesContainer.classList.add('messages-container')
  dom.chatContainer.appendChild(dom.messagesContainer)

  // Create an input element for the user to type messages
  dom.inputElement.classList.add('chat-input')
  dom.inputElement.setAttribute('type', 'text')
  dom.inputElement.setAttribute('placeholder', 'Type your message...')
  dom.chatContainer.appendChild(dom.inputElement)

  // Create an image preview element
  dom.imagePreview.classList.add('image-preview')
  dom.chatContainer.appendChild(dom.imagePreview)

  // Create a container element for the send button
  dom.sendButtonContainer.classList.add('send-button-container')

  // Create an input element for the user to select an image file
  dom.imageInput.classList.add('image-input')
  dom.imageInput.setAttribute('type', 'file')
  dom.imageInput.setAttribute('accept', 'image/*')
  dom.imageInput.style.display = 'none'

  // Create an image upload element
  dom.imageUploadButton.classList.add('image-upload-button')
  dom.imageUploadButton.innerHTML =
    '<img src="../public/upload_image.png" alt="Upload image" height=36>'

  // Create a document element for the user to select an image file
  dom.documentInput.classList.add('document-input')
  dom.documentInput.setAttribute('type', 'file')
  dom.documentInput.setAttribute('accept', 'image/*, application/pdf')
  dom.documentInput.style.display = 'none'

  // Create a document upload element
  dom.documentUploadButton.classList.add('document-upload-button')
  dom.documentUploadButton.innerHTML =
    '<img src="../public/upload_document.png" alt="Upload document" height=36>'

  // Create a button element to send messages
  dom.sendButtonElement.innerText = 'Send'
  dom.sendButtonElement.classList.add('send-button')

  // Create a voice input button element
  dom.voiceInputButton.classList.add('voice-input-button')
  dom.voiceInputButton.innerHTML =
    '<img src="../public/microphone.png" alt="Voice input" height=36>'

  // Add the button elements to the send button container
  dom.sendButtonContainer.appendChild(dom.imageInput)
  dom.sendButtonContainer.appendChild(dom.imageUploadButton)
  dom.sendButtonContainer.appendChild(dom.documentUploadButton)
  dom.sendButtonContainer.appendChild(dom.sendButtonElement)
  dom.sendButtonContainer.appendChild(dom.voiceInputButton)

  // Create a container element for the clear button
  dom.clearButtonContainer.classList.add('clear-button-container')

  // Create a button element to clear messagesclear
  dom.clearButtonElement.innerText = 'Clear'
  dom.clearButtonElement.classList.add('clear-button')

  // Add the clear button to the clear button container
  dom.clearButtonContainer.appendChild(dom.clearButtonElement)

  // Add a container element for the buttons and controls row
  dom.buttonRowContainer.classList.add('button-row-container')
  dom.buttonRowContainer.appendChild(dom.clearButtonContainer)
  dom.buttonRowContainer.appendChild(dom.sendButtonContainer)

  // Add button row container to the chat container
  dom.chatContainer.appendChild(dom.buttonRowContainer)

  // Create a container for the "Powered by" label
  dom.poweredByContainer.classList.add('powered-by-container')

  // Create the "Powered by" label
  dom.poweredByLabel.innerText = 'Powered by Conversation1st.ai'
  dom.poweredByLabel.classList.add('powered-by-label')

  // Add the label to the container
  dom.poweredByContainer.appendChild(dom.poweredByLabel)

  // Add the container to the chat container
  dom.chatContainer.appendChild(dom.poweredByContainer)

  // Add the chatbot to the page
  document.body.appendChild(dom.chatContainer)
}
