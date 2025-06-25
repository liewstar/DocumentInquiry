<template>
  <div class="detail-container">
    <div class="detail-header">
      <el-button @click="$router.back()" icon="Back" type="primary" plain>返回列表</el-button>
    </div>

    <el-skeleton :rows="10" animated v-if="loading" />

    <div v-else-if="fetchError" class="error-content">
      <el-result
        :icon="fetchError.icon || 'error'"
        :title="fetchError.title"
        :sub-title="fetchError.message"
      >
        <template #extra>
          <el-button type="primary" @click="$router.push('/')">返回搜索</el-button>
        </template>
      </el-result>
    </div>

    <div v-else-if="wenshuDetail" class="detail-content">
      <el-card class="detail-card">
        <div class="card-header">
          <h1 class="detail-title">{{ wenshuDetail.title || '无标题文书' }}</h1>
          <div class="detail-meta-tags">
            <el-tag v-if="wenshuDetail.case_number" size="large" effect="plain">案号: {{ wenshuDetail.case_number }}</el-tag>
            <el-tag v-if="wenshuDetail.cause" size="large" type="success" effect="plain">案由: {{ wenshuDetail.cause }}</el-tag>
            <el-tag v-if="wenshuDetail.publish_date" size="large" type="info" effect="plain">发布日期: {{ formatDate(wenshuDetail.publish_date) }}</el-tag>
          </div>
        </div>

        <el-divider content-position="center">文书内容</el-divider>

        <div class="detail-document">
          <div class="document-content" v-if="wenshuDetail.content">
            <div class="document-text">
              <p v-for="(paragraph, index) in contentParagraphs" :key="index" class="content-paragraph">{{ paragraph }}</p>
            </div>
          </div>
          <el-empty v-else description="暂无文书内容" />
        </div>
      </el-card>

      <div class="detail-actions">
        <el-button type="primary" @click="$router.push('/')">返回搜索</el-button>
        <el-button type="success" @click="printDocument" icon="Printer">打印文书</el-button>
      </div>
    </div>

    <el-empty v-else description="未找到文书信息" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const wenshuDetail = ref(null)
const fetchError = ref(null)

// 文书ID
const wenshuId = computed(() => {
  const id = route.params.id
  if (!id) return null
  
  try {
    // 如果是编码的URL，尝试解码
    return decodeURIComponent(id)
  } catch (e) {
    console.error('ID解码失败:', e)
    return id
  }
})

// 初始化文书详情
onMounted(() => {
  // 1. 首先尝试从sessionStorage获取文书数据
  try {
    const storedData = sessionStorage.getItem('wenshu_detail');
    if (storedData) {
      wenshuDetail.value = JSON.parse(storedData);
      console.log('从sessionStorage获取文书数据:', wenshuDetail.value);
      return;
    }
  } catch (e) {
    console.error('从sessionStorage获取数据失败:', e);
  }
  
  // 2. 如果sessionStorage没有数据，尝试从路由state中获取
  if (history.state && history.state.wenshuItem) {
    wenshuDetail.value = history.state.wenshuItem;
    console.log('从路由state获取文书数据:', wenshuDetail.value);
    return;
  }
  
  // 3. 如果都没有数据，显示错误信息
  fetchError.value = {
    title: '数据丢失',
    message: '无法获取文书详情，请返回列表页重新选择',
    icon: 'warning'
  };
  console.warn('未找到文书数据，可能是直接访问了详情页或刷新了页面');
});

// 分段文书内容
const contentParagraphs = computed(() => {
  if (!wenshuDetail.value || !wenshuDetail.value.content) return []
  
  // 按段落分割文本
  return wenshuDetail.value.content
    .split(/\n+/)
    .filter(paragraph => paragraph.trim().length > 0)
})

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

// 打印文档
const printDocument = () => {
  window.print();
}
</script>

<style scoped>
.detail-container {
  padding: 20px 0;
  max-width: 1000px;
  margin: 0 auto;
}

.detail-header {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
}

.detail-content {
  margin-bottom: 40px;
}

.error-content {
  margin: 30px 0;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.detail-card {
  margin-bottom: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.card-header {
  padding: 10px 0;
}

.detail-title {
  font-size: 24px;
  margin: 0 0 20px 0;
  text-align: center;
  color: #303133;
  font-weight: bold;
}

.detail-meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.document-content {
  padding: 20px 10px;
}

.document-text {
  line-height: 1.8;
  color: #303133;
}

.content-paragraph {
  margin-bottom: 16px;
  text-indent: 2em;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.detail-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
}

@media print {
  .detail-header, .detail-actions {
    display: none;
  }
  
  .detail-card {
    box-shadow: none;
    border: none;
  }
  
  .detail-container {
    padding: 0;
  }
}
</style> 