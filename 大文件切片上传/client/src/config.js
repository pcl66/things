const BASE_URL = 'http://localhost:8001/'

export const UPLOAD_INFO = {
  'NO_FILE': '请先选择文件',
  'INVALID_TYPE': '不支持的视频文件类型',
  'UPLOAD_SUCCESS': '上传成功',
  'UPLOAD_FAIL': '上传失败'
}

export const ALLOWED_TYPE = {
  'video/mp4': 'mp4',
  'video/webm': 'webm',
  'video/ogg': 'ogg'
}

export const CHUNK_SIZE = 64 * 1024

export const API = {
  UPLOAD_VIDEO: BASE_URL + 'upload_video'
}