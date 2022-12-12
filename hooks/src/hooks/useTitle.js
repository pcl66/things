import { useEffect } from "react"

/**
 * @description 
 * 对于不同的路由我们同样希望想
 * 多页应用一样能切换到对应的标题，
 * 这样可以让用户更好的知道页面的主题和内容
 * @author clp
 * @param {string} title
 * @return {void}
 */
const useTitle = (title) => {
  useEffect(() => {
    document.title = title
  }, [])
  return
}

export default useTitle
