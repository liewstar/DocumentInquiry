<template>
  <el-config-provider :locale="zhCn">
    <div class="app-container">
      <el-container>
        <el-header height="60px">
          <div class="header-content">
            <div class="logo" @click="$router.push('/')">
              <el-icon><Document /></el-icon>
              <h2>文书查询系统</h2>
            </div>
          </div>
        </el-header>
        
        <el-main>
          <div class="main-container">
            <router-view v-slot="{ Component }">
              <transition name="fade" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </el-main>
        
        <el-footer height="50px">
          <div class="footer-content">
            <!-- <p>© {{ currentYear }} 文书查询系统 - 提供高效便捷的法律文书检索服务</p> -->
          </div>
        </el-footer>
      </el-container>
    </div>
  </el-config-provider>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.app-container {
  min-height: 100vh;
}

.el-container {
  min-height: 100vh;
}

.el-header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.logo .el-icon {
  font-size: 24px;
  color: #409eff;
  margin-right: 10px;
}

.logo h2 {
  margin: 0;
  font-size: 20px;
  color: #303133;
}

.el-main {
  padding: 20px 0;
}

.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.el-footer {
  background-color: #fff;
  border-top: 1px solid #eee;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-content p {
  margin: 0;
  color: #909399;
  font-size: 14px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 