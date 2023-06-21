/*
 * Description: config
 * File Created:  21st June 2023 10:34:12 pm
 * Author: shiqin
 */
export let style:string, client:string;
export let metadata = {
    assistantName: "Assistant",
    userName: "User",
    style: style || "generic",
    client: client || "generic"
  }
export  const userImageData = {
    url: "",
    data: "",
    type: "",
    base64: ""
  }
  
  export  const userDocumentData = {
    data: "",
    type: "",
    base64: ""
  }
  
  export  const botImageData = {
    url: "",
    data: "",
    type: "",
    base64: ""
  }
  export const dom ={
    inputElement:document.createElement("textarea"),// Create a toggle button element for the chatbot
    imagePreview: document.createElement("img"), // Create a container element for the chatbot
    toggleButton: document.createElement("button"),
    chatContainer: document.createElement("div"),
    assetContainer: document.createElement("div"),
    messagesContainer: document.createElement("div"),
    sendButtonContainer: document.createElement("div"),
    imageInput: document.createElement("input"),
    imageUploadButton: document.createElement("image-upload-button"),
    documentInput: document.createElement("input"),
    documentUploadButton : document.createElement("document-upload-button"),
    sendButtonElement : document.createElement("button"),
    voiceInputButton : document.createElement("button"),
    clearButtonContainer :document.createElement("div"),
    clearButtonElement : document.createElement("button"),
    poweredByContainer: document.createElement("div"),
    poweredByLabel: document.createElement("p"),
    buttonRowContainer : document.createElement("div")
}