/**
 * 导航条组件
 * 用于在需要的页面中引入导航功能
 */

// 创建导航条DOM元素
function createNavigation() {
  const nav = document.createElement('nav');
  nav.className = 'fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center';
  nav.style.zIndex = "999";
  nav.style.transition = "transform 0.3s ease";
  
  // 导航项配置（新顺序：行动，AI教练，拍照，成就，我的）
  const navItems = [
    { icon: 'ri-file-list-3-line', text: '行动', url: 'action.html' },
    { icon: 'ri-message-3-line', text: 'AI教练', url: 'ai-coach.html' },
    { icon: 'ri-camera-line', text: '拍照', url: 'camera.html', special: true },
    { icon: 'ri-trophy-line', text: '成就', url: 'achievements.html' },
    { icon: 'ri-user-line', text: '我的', url: 'profile.html' }
  ];
  
  // 生成导航项
  navItems.forEach((item, index) => {
    const button = document.createElement('button');
    button.className = `nav-item flex flex-col items-center p-2${index === 0 ? ' active' : ''}${item.special ? ' relative' : ''}`;
    button.setAttribute('data-url', item.url);
    
    // 特殊处理拍照按钮
    if (item.special) {
      const specialDiv = document.createElement('div');
      specialDiv.className = 'absolute -top-6 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg';
      
      const iconElement = document.createElement('i');
      iconElement.className = `${item.icon} text-white text-2xl`;
      specialDiv.appendChild(iconElement);
      
      button.appendChild(specialDiv);
      
      const span = document.createElement('span');
      span.className = 'text-xs mt-6';
      span.textContent = item.text;
      button.appendChild(span);
    } else {
      // 使用DOM API创建元素，确保图标正确渲染
      const iconElement = document.createElement('i');
      iconElement.className = `${item.icon} text-xl`;
      
      const textElement = document.createElement('span');
      textElement.className = 'text-xs mt-1';
      textElement.textContent = item.text;
      
      button.appendChild(iconElement);
      button.appendChild(textElement);
    }
    
    // 添加点击事件
    button.addEventListener('click', function() {
      // 移除所有活跃状态
      document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      // 添加活跃状态
      button.classList.add('active');
      
      // 导航到对应页面
      window.location.href = item.url;
    });
    
    nav.appendChild(button);
  });
  
  return nav;
}

// 将导航条添加到页面
function initNavigation() {
  // 检查当前页面是否存在导航条容器
  const navContainer = document.getElementById('navigation-container');
  if (navContainer) {
    navContainer.appendChild(createNavigation());
  }
}

// 初始化导航条
document.addEventListener('DOMContentLoaded', initNavigation);

// 导出全局函数
window.hideNavigation = function() {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.transform = 'translateY(100%)';
  }
};

window.showNavigation = function() {
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.transform = 'translateY(0)';
  }
};

// 导航组件
document.addEventListener('DOMContentLoaded', function() {
  const navigationContainer = document.getElementById('navigation-container');
  
  if (navigationContainer) {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    
    // 导航项配置
    const navItems = [
      {
        id: 'home',
        name: '行动',
        icon: 'ri-file-list-3-line',
        link: 'action.html'
      },
      {
        id: 'ai-coach',
        name: 'AI教练',
        icon: 'ri-message-3-line',
        link: 'ai-coach.html'
      },
      {
        id: 'camera',
        name: '拍照',
        icon: 'ri-camera-line',
        link: 'camera.html'
      },
      {
        id: 'achievements',
        name: '成就',
        icon: 'ri-trophy-line',
        link: 'achievements.html'
      },
      {
        id: 'profile',
        name: '我的',
        icon: 'ri-user-line',
        link: 'profile.html'
      }
    ];
    
    // 创建导航HTML
    let navigationHTML = `
      <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom max-w-md mx-auto z-50">
        <div class="grid grid-cols-5 h-16">
    `;
    
    // 添加导航项
    navItems.forEach(item => {
      const isActive = (pageName === item.link || 
                      (pageName === '' && item.id === 'home') || 
                      (pageName === 'index.html' && item.id === 'home'));
      
      navigationHTML += `
        <a href="${item.link}" class="flex flex-col items-center justify-center ${isActive ? 'text-indigo-600' : 'text-gray-500'}">
          <i class="${item.icon} text-xl"></i>
          <span class="text-xs mt-1">${item.name}</span>
        </a>
      `;
    });
    
    navigationHTML += `
        </div>
      </nav>
    `;
    
    // 注入导航HTML
    navigationContainer.innerHTML = navigationHTML;
    
    // 特殊页面处理
    const specialPages = ['camera.html', 'food-analysis.html'];
    if (specialPages.includes(pageName)) {
      // 通知父页面隐藏底部导航
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ action: 'hideNavigation' }, '*');
      }
      
      // 当前页面也隐藏导航
      navigationContainer.style.display = 'none';
    }
  }
  
  // 监听消息以隐藏/显示导航栏
  window.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'hideNavigation') {
      if (navigationContainer) {
        navigationContainer.style.display = 'none';
      }
    } else if (event.data && event.data.action === 'showNavigation') {
      if (navigationContainer) {
        navigationContainer.style.display = 'block';
      }
    }
  });
}); 