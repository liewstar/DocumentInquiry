import http from './http'

/**
 * 文书API服务
 */
export default {
  /**
   * 查询文书列表
   * @param {Object} params 查询参数对象
   * @returns {Promise} Promise对象
   */
  getWenshuList(params) {
    return http.get('/wenshu', { params })
  },
  
  /**
   * 获取文书详情
   * @param {String} id 文书ID
   * @returns {Promise} Promise对象
   */
  getWenshuDetail(id) {
    return http.get(`/wenshu/${id}`)
  },
  
  /**
   * 获取文书统计数据
   * @param {Object} params 查询参数对象
   * @returns {Promise} Promise对象
   */
  getWenshuCount(params) {
    return http.get('/wenshu/stats/count', { params })
  }
} 