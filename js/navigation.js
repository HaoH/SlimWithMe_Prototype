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
  
  // 导航项配置
  const navItems = [
    { icon: '<path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>', text: '首页', url: 'home.html' },
    { icon: '<path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>', text: '饮食', url: 'diet.html' },
    { icon: '<path fill-rule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path>', text: '拍照', url: 'camera.html', special: true },
    { icon: '<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clip-rule="evenodd"></path>', text: '运动', url: 'exercise.html' },
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