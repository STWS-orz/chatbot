/*
 * Description: parseCodeMessage
 * File Created:  21st June 2023 10:34:12 pm
 * Author: shiqin
 */
// Function to parse the code blocks in the message
export function parseCodeMessage(message: string) {
  const codeBlockRegex = /```(\w+)?\n?([\s\S]*?)```/g
  const codeBlocks = message.match(codeBlockRegex)

  if (!codeBlocks) {
    return { message: message }
  }

  let newMessage = message
  codeBlocks.forEach((codeBlock) => {
    const [, language = 'python', code] = codeBlock.match(
      /```(\w+)?\n?([\s\S]*?)```/
    )
    const codeElement = `
        <div class="code-block">
          <div class="code-block-header">
            <div class="copy-button">Copy</div>
          </div>
          <pre><code class="language-${language}">${code}</code></pre>
        </div>
      `
    newMessage = newMessage.replace(codeBlock, codeElement)
  })
  return {
    message: newMessage,
    codeBlocks: codeBlocks,
  }
}
