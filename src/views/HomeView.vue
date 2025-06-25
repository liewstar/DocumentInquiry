<template>
  <div class="home-container">
    <el-card class="search-card">
      <template #header>
        <div class="search-header">
          <h3>文书搜索</h3>
          <el-button type="primary" @click="resetSearch">重置</el-button>
        </div>
      </template>
      <el-form :model="searchForm" label-width="90px" @submit.prevent="handleSearch">
        <!-- 第一行：关键词和案号 -->
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="关键词">
              <el-input v-model="searchForm.keyword" placeholder="标题或内容关键词" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="案号">
              <el-input v-model="searchForm.case_number" placeholder="案号" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 第二行：案由和法院层级 -->
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="案由">
              <el-input v-model="searchForm.cause" placeholder="文书案由" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="法院层级">
              <el-select v-model="searchForm.court_level" placeholder="请选择法院层级" clearable style="width: 100%">
                <el-option label="高级法院" value="高级法院"></el-option>
                <el-option label="中级法院" value="中级法院"></el-option>
                <el-option label="基层法院" value="基层法院"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 第三行：地域及法院和发布日期 -->
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12">
            <el-form-item label="地域及法院">
              <el-select v-model="searchForm.court_region" placeholder="请选择地域及法院" clearable style="width: 100%">
                <el-option-group label="直辖市">
                  <el-option label="北京市" value="北京市"></el-option>
                  <el-option label="上海市" value="上海市"></el-option>
                  <el-option label="天津市" value="天津市"></el-option>
                  <el-option label="重庆市" value="重庆市"></el-option>
                </el-option-group>
                <el-option-group label="省份">
                  <el-option label="河北省" value="河北省"></el-option>
                  <el-option label="山西省" value="山西省"></el-option>
                  <el-option label="辽宁省" value="辽宁省"></el-option>
                  <el-option label="吉林省" value="吉林省"></el-option>
                  <el-option label="黑龙江省" value="黑龙江省"></el-option>
                  <el-option label="江苏省" value="江苏省"></el-option>
                  <el-option label="浙江省" value="浙江省"></el-option>
                  <el-option label="安徽省" value="安徽省"></el-option>
                  <el-option label="福建省" value="福建省"></el-option>
                  <el-option label="江西省" value="江西省"></el-option>
                  <el-option label="山东省" value="山东省"></el-option>
                  <el-option label="河南省" value="河南省"></el-option>
                  <el-option label="湖北省" value="湖北省"></el-option>
                  <el-option label="湖南省" value="湖南省"></el-option>
                  <el-option label="广东省" value="广东省"></el-option>
                  <el-option label="海南省" value="海南省"></el-option>
                  <el-option label="四川省" value="四川省"></el-option>
                  <el-option label="贵州省" value="贵州省"></el-option>
                  <el-option label="云南省" value="云南省"></el-option>
                  <el-option label="陕西省" value="陕西省"></el-option>
                  <el-option label="甘肃省" value="甘肃省"></el-option>
                  <el-option label="青海省" value="青海省"></el-option>
                  <el-option label="台湾省" value="台湾省"></el-option>
                </el-option-group>
                <el-option-group label="自治区">
                  <el-option label="内蒙古自治区" value="内蒙古自治区"></el-option>
                  <el-option label="广西壮族自治区" value="广西壮族自治区"></el-option>
                  <el-option label="西藏自治区" value="西藏自治区"></el-option>
                  <el-option label="宁夏回族自治区" value="宁夏回族自治区"></el-option>
                  <el-option label="新疆维吾尔自治区" value="新疆维吾尔自治区"></el-option>
                  <el-option label="新疆维吾尔自治区高级人民法院生产建设兵团分院" value="新疆维吾尔自治区高级人民法院生产建设兵团分院"></el-option>
                </el-option-group>
                <!-- <el-option-group label="特别行政区">
                  <el-option label="香港特别行政区" value="香港特别行政区"></el-option>
                  <el-option label="澳门特别行政区" value="澳门特别行政区"></el-option>
                </el-option-group> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-form-item label="发布日期">
              <el-date-picker
                v-model="searchForm.date_range"
                type="daterange"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="YYYY-MM-DD"
                value-format="YYYY-MM-DD"
                style="width: 100%"
                @change="handleDateRangeChange"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        
        <!-- 第五行：按钮区域 -->
        <el-row>
          <el-col :span="24" class="search-button-container">
            <el-button type="primary" @click="handleSearch" :loading="loading" icon="Search">查询</el-button>
            <el-button @click="resetSearch" icon="Refresh">重置</el-button>
          </el-col>
        </el-row>
      </el-form>
    </el-card>

    <!-- 搜索结果显示区域 -->
    <div class="search-result">
      <el-card v-if="totalCount > 0" class="count-card">
        <div class="count-info">
          <el-icon><InfoFilled /></el-icon>
          <span>共找到 <strong>{{ totalCount }}</strong> 条符合条件的文书记录</span>
        </div>
      </el-card>

      <el-empty v-if="wenshuList.length === 0 && !loading" description="暂无符合条件的数据"></el-empty>

      <el-card 
        v-for="item in wenshuList" 
        :key="item._id || item.id" 
        class="wenshu-card" 
        @click="goToDetail(item)"
      >
        <div class="wenshu-item">
          <h3 class="wenshu-title">{{ item.title }}</h3>
          <div class="wenshu-meta">
            <el-tag size="small" effect="plain">案号: {{ item.case_number || '未知' }}</el-tag>
            <el-tag size="small" type="success" effect="plain">案由: {{ item.cause || '未知' }}</el-tag>
            <el-tag size="small" type="info" effect="plain">发布日期: {{ formatDate(item.publish_date) }}</el-tag>
          </div>
          <div class="wenshu-content" v-if="item.content">
            <p>{{ truncateContent(item.content) }}</p>
          </div>
          <div class="wenshu-footer">
            <el-button type="primary" link @click.stop="goToDetail(item)">
              查看详情
              <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </div>
        </div>
      </el-card>

      <!-- 分页 -->
      <div class="pagination-container" v-if="wenshuList.length > 0">
        <el-pagination
          v-model="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import wenshuApi from '../api/wenshu'

const router = useRouter()
const loading = ref(false)
const wenshuList = ref([])
const totalCount = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 搜索表单
const searchForm = reactive({
  keyword: '',
  cause: '',
  case_number: '',
  court_level: '',
  court_region: '',
  date_range: [], // 日期范围
  start_date: '',
  end_date: ''
})

// 获取文书列表
const fetchWenshuList = async () => {
  loading.value = true
  try {
    const params = {
      ...searchForm,
      page: currentPage.value,
      page_size: pageSize.value
    }

    // 获取列表数据
    const data = await wenshuApi.getWenshuList(params)
    wenshuList.value = Array.isArray(data) ? data : []
    
    // 调试: 打印第一个文书的结构
    if (wenshuList.value.length > 0) {
      console.log('文书数据结构:', Object.keys(wenshuList.value[0]));
      console.log('文书ID示例:', getValidId(wenshuList.value[0]));
    }
    
    // 获取总数
    const countData = await wenshuApi.getWenshuCount({
      keyword: searchForm.keyword,
      cause: searchForm.cause,
      case_number: searchForm.case_number,
      court_level: searchForm.court_level,
      court_region: searchForm.court_region,
      start_date: searchForm.start_date,
      end_date: searchForm.end_date
    })
    totalCount.value = countData?.total || 0
  } catch (error) {
    console.error('获取文书列表失败:', error)
    
    // 根据错误类型提供更详细的错误信息
    if (error.message && error.message.includes('timeout')) {
      ElMessage.error('查询请求超时，请检查后端服务或数据量是否过大')
    } else if (error.message && error.message.includes('Network Error')) {
      ElMessage.error('网络连接错误，请检查API服务是否正常运行')
    } else {
      ElMessage.error('获取文书列表失败，请稍后再试')
    }
    
    wenshuList.value = []
    totalCount.value = 0
  } finally {
    loading.value = false
  }
}

// 搜索处理
const handleSearch = () => {
  currentPage.value = 1
  fetchWenshuList()
}

// 处理日期范围变更
const handleDateRangeChange = (val) => {
  if (val) {
    searchForm.start_date = val[0]
    searchForm.end_date = val[1]
  } else {
    searchForm.start_date = ''
    searchForm.end_date = ''
  }
}

// 重置搜索条件
const resetSearch = () => {
  Object.keys(searchForm).forEach(key => {
    if (key === 'date_range') {
      searchForm[key] = []
    } else {
      searchForm[key] = ''
    }
  })
  currentPage.value = 1
  fetchWenshuList()
}

// 页大小改变处理
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1 // 重置到第一页
  fetchWenshuList()
}

// 页码改变处理
const handleCurrentChange = (page) => {
  currentPage.value = page
  fetchWenshuList()
}

// 去详情页
const goToDetail = (item) => {
  // 处理ID
  const id = getValidId(item);
  
  // 将文书数据存储在sessionStorage中
  try {
    // 存储文书数据
    sessionStorage.setItem('wenshu_detail', JSON.stringify(item));
    console.log('文书数据已存储到sessionStorage');
    
    // 导航到详情页
    router.push({
      name: 'detail',
      params: { id }
    });
  } catch (e) {
    console.error('存储文书数据失败:', e);
    // 如果无法使用sessionStorage，退回到state方式
    router.push({
      name: 'detail',
      params: { id },
      state: { wenshuItem: item }
    });
  }
}

// 格式化日期
const formatDate = (dateString) => {
  if (!dateString) return '未知'
  
  // 判断日期格式，支持多种格式
  let formattedDate = '未知'
  
  try {
    // 尝试直接使用日期字符串
    if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}/)) {
      const parts = dateString.split('T')[0].split('-')
      if (parts.length === 3) {
        formattedDate = `${parts[0]}年${parts[1]}月${parts[2]}日`
        return formattedDate
      }
    }
    
    // 尝试作为日期对象处理
    const date = new Date(dateString)
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      })
    }
    
    return dateString // 如果上述都失败，返回原始字符串
  } catch (e) {
    console.error('日期格式化错误:', e)
    return dateString
  }
}

// 截断内容
const truncateContent = (content, maxLength = 150) => {
  if (!content) return ''
  if (content.length <= maxLength) return content
  return content.substring(0, maxLength) + '...'
}

// 获取有效ID
const getValidId = (item) => {
  // 处理URL类型的ID
  const processUrl = (url) => {
    try {
      // 尝试从URL中提取docId参数
      const urlObj = new URL(url);
      const docId = urlObj.searchParams.get('docId');
      if (docId) return docId;
      
      // 如果没有docId参数，使用URL的路径部分
      const pathParts = urlObj.pathname.split('/');
      const lastPart = pathParts[pathParts.length - 1];
      if (lastPart && lastPart !== 'index.html') return lastPart;
      
      // 如果都没有，使用整个URL的哈希值作为唯一标识
      return btoa(url).replace(/[+/=]/g, '').substring(0, 10);
    } catch (e) {
      console.error('URL处理失败:', e);
      return url;
    }
  };

  // 检查各种可能的ID字段
  if (item.id) {
    return typeof item.id === 'string' && item.id.startsWith('http') 
      ? processUrl(item.id) 
      : item.id;
  }
  
  if (item.docId) return item.docId;
  
  if (item._id) return item._id;
  
  if (item.case_number) return item.case_number;
  
  // 如果都没有，尝试返回标题或其他唯一标识
  return item.title ? btoa(item.title).replace(/[+/=]/g, '').substring(0, 10) : 'unknown';
}

// 组件挂载后获取数据
onMounted(() => {
  // 初始化日期范围
  if (searchForm.start_date && searchForm.end_date) {
    searchForm.date_range = [searchForm.start_date, searchForm.end_date]
  }
  fetchWenshuList()
})
</script>

<style scoped>
.home-container {
  padding: 20px 0;
}

.search-card {
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.search-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search-header h3 {
  margin: 0;
  font-size: 18px;
  color: #303133;
  font-weight: 600;
}

.search-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  gap: 15px;
}

/* 添加表单行间距 */
.el-row {
  margin-bottom: 5px;
}

.count-card {
  margin-bottom: 20px;
}

.count-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #409eff;
}

.wenshu-card {
  margin-bottom: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.wenshu-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.wenshu-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #303133;
}

.wenshu-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.wenshu-content {
  margin: 12px 0;
  color: #606266;
  line-height: 1.6;
}

.wenshu-content p {
  margin: 0;
}

.wenshu-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .search-button-col {
    margin-top: 20px;
    justify-content: center;
  }
}
</style> 