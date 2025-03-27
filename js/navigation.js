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
    { icon: '<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>', text: '行动', url: 'home.html' },
    { icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>', text: 'AI教练', url: 'ai-coach.html' },
    { icon: '<path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>', text: '拍照', url: 'camera.html', special: true },
    { icon: '<path d="M5 3h10v3c0 2.8-1.5 5.5-4 6.5L11 14h-2l0-1.5C6.5 11.5 5 8.8 5 6V3zm-1 0v3c0 4 2.5 7 6 8 3.5-1 6-4 6-8V3H4zm4 13h4v3h-4v-3zm2-19c-1 0-5 0-5 0v2h10V-3c0 0-4 0-5 0z"></path>', text: '成就', url: 'achievements.html' },
    { icon: '<path d="M6 3h12l-2 7c-1 3-3 5-5 5s-4-2-5-5L4 3h2zm8 14H10v2h4v-2zm0 3H10v1h4v-1z"></path>', text: '成就', url: 'achievements.html' },
    { icon: '<path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>', text: '我的', url: 'profile.html' }
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
      specialDiv.innerHTML = `<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">${item.icon}</svg>`;
      button.appendChild(specialDiv);
      
      const span = document.createElement('span');
      span.className = 'text-xs mt-6';
      span.textContent = item.text;
      button.appendChild(span);
    } else {
      button.innerHTML = `
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          ${item.icon}
        </svg>
        <span class="text-xs mt-1">${item.text}</span>
      `;
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
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>',
        link: 'home.html'
      },
      {
        id: 'ai-coach',
        name: 'AI教练',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>',
        link: 'ai-coach.html'
      },
      {
        id: 'camera',
        name: '拍照',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>',
        link: 'camera.html'
      },
      {
        id: 'achievements',
        name: '成就',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4h8m-4 4v6m-2 2h4m-4 2h4M6 4v3c0 3.3 2.7 6 6 6s6-2.7 6-6V4m6 11v3m-3 2h6"></path></svg>',
        link: 'achievements.html'
      },
      {
        id: 'profile',
        name: '我的',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>',
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
          <div class="w-6 h-6">
            ${item.icon}
          </div>
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