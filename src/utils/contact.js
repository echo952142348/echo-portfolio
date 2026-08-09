export const contactEmail = '952142348@qq.com'
export const emailCopySuccessMessage = '邮箱地址已复制'
export const emailCopyFailureMessage = '复制失败，请手动复制'

function copyTextFallback(text) {
  let copied = false
  const handleCopy = (event) => {
    event.clipboardData?.setData('text/plain', text)
    event.preventDefault()
    copied = true
  }

  document.addEventListener('copy', handleCopy)
  const commandResult = document.execCommand('copy')
  document.removeEventListener('copy', handleCopy)

  if (copied || commandResult) {
    return
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  textarea.style.top = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  const textareaCopied = document.execCommand('copy')
  document.body.removeChild(textarea)

  if (!textareaCopied) throw new Error('fallback copy failed')
}

export async function copyEmailAddress() {
  if (navigator.clipboard?.writeText) {
    try {
      await Promise.race([
        navigator.clipboard.writeText(contactEmail),
        new Promise((_, reject) => {
          window.setTimeout(() => reject(new Error('clipboard write timeout')), 800)
        }),
      ])
      return
    } catch {
      copyTextFallback(contactEmail)
      return
    }
  }

  copyTextFallback(contactEmail)
}
