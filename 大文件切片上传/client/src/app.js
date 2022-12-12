import { UPLOAD_INFO, ALLOWED_TYPE, CHUNK_SIZE, API } from './config'
import axios from 'axios'

;(doc => {
  const oProgress = doc.querySelector('#uploadProgress')
  const oUploader = doc.querySelector('#videoUploader')
  const oInfo = doc.querySelector('#uploadInfo')
  const oBtn = doc.querySelector('#uploadBtn')
  
  // 当前上传的文件大小
  let uploadedSize = 0
  let uploadResult = null

  const init = () => {
    bindEvent()
  }

  function bindEvent() {
    oBtn.addEventListener('click', uploadVideo)
  }

  async function uploadVideo() {
    const {
      files: [file]
    } = oUploader
    console.log('file', file)
    // 判断是否选择了文件
    if (!file) return (oInfo.innerHTML = UPLOAD_INFO['NO_FILE'])
    // 判断视频文件类型
    if (!ALLOWED_TYPE[file.type]) (oInfo.innerHTML = UPLOAD_INFO['INVALID_TYPE'])

    const { name, type, size } = file
    const fileName = new Date().getTime() + '-' + name
    oProgress.max = size

    while( uploadedSize < size) {
      const fileChunk = file.slice(uploadedSize, uploadedSize + CHUNK_SIZE)
      console.log(' ', uploadedSize)
      const formData = createFormData({
          name,
          type,
          size,
          fileName,
          uploadedSize,
          file: fileChunk
        }
      )
      
      try {
        uploadResult = await axios.post(API.UPLOAD_VIDEO, formData)
      } catch (e) {
        oInfo.innerHTML = UPLOAD_INFO['UPLOAD_FAIL']
        return
      }
      uploadedSize += fileChunk.size
      oProgress.value = uploadedSize
    }
    oInfo.innerHTML = UPLOAD_INFO['UPLOAD_SUCCESS']
    oUploader.value = null
  }

  function createFormData ({
    name,
    type,
    size,
    fileName,
    uploadedSize,
    file
  }) {
    const fd = new FormData()
    fd.append('name', name)
    fd.append('type', type)
    fd.append('size', size)
    fd.append('fileName', fileName)
    fd.append('uploadedSize', uploadedSize)
    fd.append('file', file)
    return fd
  }
  init()
})(document)
