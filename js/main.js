// 页面导航功能
function loadPage(url) {
  const frame = document.getElementById('content-frame');
  frame.src = url;
  
  // 更新导航栏活跃状态
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.classList.remove('active');
  });
  
  // 根据URL设置当前活跃的导航项
  const currentNav = document.querySelector(`.nav-item[onclick="loadPage('${url}')"]`);
  if (currentNav) {
    currentNav.classList.add('active');
  }
}

// 为所有按钮添加点击波纹效果
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button, .btn');
  buttons.forEach(button => {
    button.classList.add('ripple');
  });
  
  // 初始化加载首页
  // 已通过HTML iframe的src初始属性设置为home.html
});

// 适配iPhone刘海屏
function adjustSafeArea() {
  const safeAreaTop = getComputedStyle(document.documentElement).getPropertyValue('--safe-area-top');
  document.querySelector('.safe-area-top').style.height = safeAreaTop;
}

// 等待加载完成后执行
window.addEventListener('load', adjustSafeArea);

// 处理页面过渡动画
function pageTransition() {
  const frame = document.getElementById('content-frame');
  frame.classList.add('fade-in');
  setTimeout(() => {
    frame.classList.remove('fade-in');
  }, 500);
}

// 模拟数据加载
function simulateLoading(element, callback, delay = 800) {
  if (!element) return;
  
  const loadingSpinner = document.createElement('div');
  loadingSpinner.className = 'loading';
  element.appendChild(loadingSpinner);
  
  setTimeout(() => {
    loadingSpinner.remove();
    if (typeof callback === 'function') {
      callback();
    }
  }, delay);
}

// 显示提示消息
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg z-50 ${
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
  } text-white`;
  
  toast.textContent = message;
  document.body.appendChild(toast);
  
  // 添加进入动画
  setTimeout(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translate(-50%, 0)';
  }, 10);
  
  // 设置自动消失
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, duration);
}

// 虚拟教练对话功能
function coachMessage(message) {
  // 此功能将在聊天页面中使用
  console.log('[教练]:', message);
  return message;
}

// 格式化显示的数据
const formatters = {
  // 格式化数字
  number: (value, decimals = 0) => {
    return parseFloat(value).toFixed(decimals);
  },
  
  // 格式化日期
  date: (date, format = 'YYYY-MM-DD') => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day);
  },
  
  // 格式化时间
  time: (date) => {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    
    return `${hours}:${minutes}`;
  }
}; 