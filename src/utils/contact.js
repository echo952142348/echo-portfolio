export const contactEmail = '952142348@qq.com'
export const emailCopySuccessMessage = '邮箱地址已复制'
export const emailCopyFailureMessage = '复制失败，请手动复制'

function copyTextFallback(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'fixed'
  textarea.style.left = '-9999px'
  textarea.style.top = '0'
  document.body.appendChild(textarea)
  textarea.focus()
  textarea.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)

  if (!copied) {
    throw new Error('fallback copy failed')
  }
}

export async function copyEmailAddress() {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(contactEmail)
      return
    } catch {
      copyTextFallback(contactEmail)
      return
    }
  }

  copyTextFallback(contactEmail)
}
