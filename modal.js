const modalWindowBtn = document.getElementById('modalWindowBtn')
const modal = document.getElementById('gitModal')
const modalWindowMainDiv = document.getElementById('mainDiv')
const popupContent = document.getElementById('popupContent')
const popupHead = document.getElementById('popupHead')

const modalShowOrHide = () => {
  modal.classList.toggle('active')
}

const loadContent = (head, content) => {
  popupHead.innerHTML = head
  popupContent.innerHTML = content
  addCloseButton()
}

const loadLinks = (data) => {
  const keys = Object.keys(data)
  let finalText = ''
  for (let i = 0; i < keys.length; i++) {
    finalText += `
      <div style="
        border: 1px solid #ccc;
        padding: 5px;
        text-align: center;
        border-radius: 8px;
        margin-bottom: 8px;
        background-color: rgba(0, 0, 0, 0.5);">
        <a href="${data[keys[i]]}" target="_blank" style="
          text-decoration: none;
          color: #ffffffff;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
          font-weight: 500;">
          ${keys[i]}
        </a>
      </div>`
  }
  return finalText
}

const addCloseButton = () => {
  const closeBtn = document.createElement('button')
  closeBtn.textContent = 'Закрыть'
  closeBtn.style.cssText = `
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 10px 20px;
    margin-top: 15px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
  `
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active')
  })
  popupContent.appendChild(closeBtn)
}

fetch('config.json')
  .then(response => response.json())
  .then(data => {
    loadContent('Github проекты', loadLinks(data.linkTree))
  })
  .catch(error => {
    console.error('Ошибка загрузки JSON:', error)
  })

modalWindowBtn.addEventListener('click', modalShowOrHide)

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('active')
  }
})
