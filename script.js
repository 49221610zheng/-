// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
    }
});

// 清除数据并重新初始化
function resetData() {
    console.log('开始重置数据...');
    localStorage.clear();
    console.log('本地存储已清除');
    PortfolioManager.init();
    console.log('数据重置完成');
}

// 在页面加载完成后添加重置按钮
document.addEventListener('DOMContentLoaded', () => {
    console.log('页面加载完成，开始初始化');
    
    // 初始化作品管理系统
    try {
        PortfolioManager.init();
    } catch (error) {
        console.error('作品管理系统初始化失败:', error);
    }
    
    // 更新关于我部分
    try {
        updateAboutSection();
    } catch (error) {
        console.error('关于我部分更新失败:', error);
    }
    
    // 创建重置按钮
    const resetButton = document.createElement('button');
    resetButton.textContent = '重置数据';
    resetButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 10px 20px;
        background: #f44336;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
    `;
    resetButton.onclick = resetData;
    
    // 添加到页面
    document.body.appendChild(resetButton);
    
    // 显示调试信息面板
    document.getElementById('debug-info').style.display = 'block';
});

// 默认占位图片（一个简单的灰色背景）
const DEFAULT_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmMGYwZjAiLz4KICAgIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2NjYiCiAgICAgICAgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+CiAgICAgICAg5Zu+54mH5Yqg6L295LitCiAgICA8L3RleHQ+Cjwvc3ZnPg==';

// 创建示例图片
const SAMPLE_IMAGES = {
    life: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImxpZmUtZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2ZmOWE5ZTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmYWQwYzQ7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNsaWZlLWdyYWQpIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+55Sf5rS75YaZ55yLPC90ZXh0Pjwvc3ZnPg==',
    model: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9Im1vZGVsLWdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNhMThjZDE7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojZmJjMmViO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjbW9kZWwtZ3JhZCkiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmaWxsPSIjZmZmIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj7mqKHniYjnuqrlsZU8L3RleHQ+PC9zdmc+',
    campus: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImNhbXB1cy1ncmFkIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojODRmYWIwO3N0b3Atb3BhY2l0eToxIiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzhmZDNmNDtzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2NhbXB1cy1ncmFkKSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPuagoeWbreWGmeecizwvdGV4dD48L3N2Zz4='
};

// 作品管理系统
const PortfolioManager = {
    // 作品数据存储
    works: [],
    categories: {},
    
    // 初始化作品管理系统
    init() {
        console.log('开始初始化作品管理系统');
        this.loadCategories();
        
        // 检查本地存储中是否有作品数据
        const storedWorks = localStorage.getItem('works');
        if (!storedWorks) {
            console.log('本地存储中没有作品数据，初始化默认数据');
            this.initializeDefaultWorks();
        } else {
            console.log('从本地存储加载作品数据');
            this.works = JSON.parse(storedWorks);
        }
        
        this.updateUI();
        console.log('作品管理系统初始化完成，当前作品数量:', this.works.length);
    },
    
    // 初始化默认作品数据
    initializeDefaultWorks() {
        // 使用示例图片代替真实图片
        this.works = [
            // 生活写真
            {
                id: 'life_1',
                category: 'life',
                image: 'imgs/生活写真/your-photo1.jpg',
                title: '渭南写真集',
                description: '记录生活中的美好瞬间'
            },
            {
                id: 'life_2',
                category: 'life',
                image: SAMPLE_IMAGES.life,
                title: '渭南写真集',
                description: '城市街头的随性拍摄'
            },
            {
                id: 'life_3',
                category: 'life',
                image: SAMPLE_IMAGES.life,
                title: '渭南写真集',
                description: '日常生活的温馨画面'
            },
            {
                id: 'life_4',
                category: 'life',
                image: SAMPLE_IMAGES.life,
                title: '渭南写真集',
                description: '城市角落的故事'
            },
            
            // 模特约拍
            {
                id: 'model_1',
                category: 'model',
                image: SAMPLE_IMAGES.model,
                title: '约拍写真',
                description: '室内棚拍作品'
            },
            {
                id: 'model_2',
                category: 'model',
                image: SAMPLE_IMAGES.model,
                title: '约拍写真',
                description: '自然光下的魅力展现'
            },
            {
                id: 'model_3',
                category: 'model',
                image: SAMPLE_IMAGES.model,
                title: '约拍写真',
                description: '时尚风格写真'
            },
            
            // 校园写真
            {
                id: 'campus_1',
                category: 'campus',
                image: SAMPLE_IMAGES.campus,
                title: '建大写真集',
                description: '校园生活记忆'
            },
            {
                id: 'campus_2',
                category: 'campus',
                image: SAMPLE_IMAGES.campus,
                title: '建大写真集',
                description: '青春时光定格'
            },
            {
                id: 'campus_3',
                category: 'campus',
                image: SAMPLE_IMAGES.campus,
                title: '建大写真集',
                description: '校园风光与人像'
            }
        ];
        
        // 保存到本地存储
        localStorage.setItem('works', JSON.stringify(this.works));
        console.log('默认作品数据已初始化，共', this.works.length, '个作品');
    },
    
    // 加载分类数据
    loadCategories() {
        console.log('加载分类数据');
        this.categories = {
            life: {
                id: 'life',
                name: '生活写真',
                description: '记录日常生活中的精彩瞬间',
                count: 0
            },
            model: {
                id: 'model',
                name: '模特约拍',
                description: '专业模特约拍作品',
                count: 0
            },
            campus: {
                id: 'campus',
                name: '校园写真',
                description: '校园青春记忆',
                count: 0
            }
        };
    },
    
    // 更新UI显示
    updateUI() {
        console.log('更新UI显示');
        // 更新分类计数
        Object.keys(this.categories).forEach(key => {
            this.categories[key].count = this.works.filter(work => work.category === key).length;
        });
        
        this.updateFilterButtons();
        this.updatePortfolioGrid();
    },
    
    // 更新筛选按钮
    updateFilterButtons() {
        console.log('更新筛选按钮');
        const filterContainer = document.querySelector('.portfolio-filters');
        if (!filterContainer) {
            console.error('找不到筛选按钮容器');
            return;
        }
        
        let buttonsHTML = `
            <button class="filter-btn active" data-filter="all">
                全部作品 <span class="count">(${this.works.length})</span>
            </button>`;
        
        Object.values(this.categories).forEach(category => {
            if (category.count > 0) {
                buttonsHTML += `
                    <button class="filter-btn" data-filter="${category.id}">
                        ${category.name} <span class="count">(${category.count})</span>
                    </button>
                `;
            }
        });
        
        filterContainer.innerHTML = buttonsHTML;
        this.attachFilterEvents();
    },
    
    // 更新作品网格
    updatePortfolioGrid() {
        console.log('更新作品网格');
        const grid = document.querySelector('.portfolio-grid');
        if (!grid) {
            console.error('找不到作品网格容器');
            return;
        }
        
        // 清空网格
        grid.innerHTML = '';
        
        // 设置网格布局
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';
        grid.style.gap = '20px';
        grid.style.padding = '20px';
        
        console.log('准备添加作品，总数:', this.works.length);
        
        // 添加所有作品
        this.works.forEach((work, index) => {
            console.log(`添加第 ${index + 1} 个作品:`, work.title);
            const workElement = this.createWorkElement(work);
            grid.appendChild(workElement);
        });
    },
    
    // 创建作品元素
    createWorkElement(work) {
        console.log('创建作品元素:', work.title, '图片地址:', work.image.substring(0, 100) + '...');
        const div = document.createElement('div');
        div.className = `portfolio-item ${work.category}`;
        div.style.background = '#fff';
        div.style.borderRadius = '8px';
        div.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        div.style.overflow = 'hidden';
        div.style.transition = 'transform 0.3s ease';
        div.style.minHeight = '400px'; // 确保有最小高度
        
        // 创建图片元素
        const img = document.createElement('img');
        img.alt = work.title;
        img.style.cssText = `
            width: 100%;
            height: 300px;
            object-fit: cover;
            display: block;
        `;
        
        // 添加图片加载事件处理
        img.onload = () => {
            console.log(`图片加载成功: ${work.title}`);
            div.classList.add('loaded');
        };
        
        img.onerror = (e) => {
            console.error(`图片加载失败: ${work.title}`, e);
            img.src = DEFAULT_IMAGE;
        };
        
        // 设置图片源
        img.src = work.image;
        
        // 创建内容容器
        const content = document.createElement('div');
        content.style.cssText = `
            padding: 16px;
            background: white;
        `;
        
        content.innerHTML = `
            <h3 style="margin: 0 0 8px 0; font-size: 18px; color: #333;">
                ${work.title}
            </h3>
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #666;">
                ${work.description || ''}
            </p>
            <div style="
                display: inline-block;
                padding: 4px 12px;
                background: #f5f5f5;
                border-radius: 12px;
                font-size: 12px;
                color: #666;
            ">
                ${this.categories[work.category]?.name || work.category}
            </div>
        `;
        
        // 组装元素
        div.appendChild(img);
        div.appendChild(content);
        
        // 添加悬停效果
        div.addEventListener('mouseenter', () => {
            div.style.transform = 'translateY(-5px)';
        });
        
        div.addEventListener('mouseleave', () => {
            div.style.transform = 'translateY(0)';
        });
        
        // 添加点击事件查看大图
        img.addEventListener('click', () => {
            this.showLightbox(work);
        });
        
        return div;
    },
    
    // 显示灯箱效果
    showLightbox(work) {
        console.log('显示灯箱:', work.title);
        
        // 创建灯箱容器
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        // 创建图片容器
        const imgContainer = document.createElement('div');
        imgContainer.style.cssText = `
            position: relative;
            max-width: 90%;
            max-height: 90%;
        `;
        
        // 创建图片
        const img = document.createElement('img');
        img.alt = work.title;
        img.style.cssText = `
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
            border: 5px solid white;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        
        // 添加图片加载事件
        img.onload = () => {
            console.log(`灯箱图片加载成功: ${work.title}`);
        };
        
        img.onerror = () => {
            console.error(`灯箱图片加载失败: ${work.title}`);
            img.src = DEFAULT_IMAGE;
        };
        
        img.src = work.image;
        
        // 创建关闭按钮
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.cssText = `
            position: absolute;
            top: -15px;
            right: -15px;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: white;
            border: none;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        `;
        
        // 创建标题
        const title = document.createElement('div');
        title.textContent = work.title;
        title.style.cssText = `
            color: white;
            font-size: 18px;
            margin-top: 10px;
            text-align: center;
        `;
        
        // 添加关闭事件
        closeBtn.addEventListener('click', () => {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
            }, 300);
        });
        
        // 点击背景也关闭
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            }
        });
        
        // 组装灯箱
        imgContainer.appendChild(img);
        imgContainer.appendChild(closeBtn);
        imgContainer.appendChild(title);
        lightbox.appendChild(imgContainer);
        
        // 添加到页面
        document.body.appendChild(lightbox);
        
        // 触发动画
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);
    },
    
    // 附加筛选事件
    attachFilterEvents() {
        console.log('添加筛选事件监听');
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // 更新按钮状态
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // 筛选作品
                const items = document.querySelectorAll('.portfolio-item');
                items.forEach(item => {
                    if (filter === 'all' || item.classList.contains(filter)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                
                // 重新初始化瀑布流布局
                setTimeout(initMasonry, 300);
            });
        });
    }
};

// 瀑布流布局
function initMasonry() {
    console.log('初始化作品网格布局');
    const grid = document.querySelector('.portfolio-grid');
    if (!grid) {
        console.error('找不到作品网格容器');
        return;
    }

    const items = Array.from(grid.children);
    console.log('作品数量:', items.length);

    // 设置网格容器样式
    grid.style.display = 'grid';
    grid.style.gap = '20px';
    grid.style.padding = '20px';
    grid.style.boxSizing = 'border-box';

    // 根据容器宽度设置列数
    const containerWidth = grid.offsetWidth;
    const minColumnWidth = 300; // 最小列宽
    let columnCount = Math.floor(containerWidth / minColumnWidth);
    columnCount = Math.max(1, Math.min(columnCount, 4)); // 限制列数在1-4之间

    // 设置网格模板
    grid.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;

    // 确保所有项目可见
    items.forEach(item => {
        if (item.style.display !== 'none') {
            item.style.display = 'block';
            item.style.width = '100%';
        }
    });
}

// 监听窗口大小变化
window.addEventListener('resize', () => {
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(() => {
        console.log('窗口大小改变，重新布局');
        initMasonry();
    }, 250);
});

// 个人信息
const photographerInfo = {
    name: '林木',
    gender: '男',
    specialty: '室内摄影',
    status: '学习中，欢迎互勉约拍',
    contacts: {
        phone: '17609238082',
        wechat: 'CapNov_08D',
        email: '1938697678@qq.com'
    }
};

// 更新关于我部分
function updateAboutSection() {
    console.log('更新关于我部分');
    const aboutSection = document.querySelector('#about');
    if (!aboutSection) {
        console.error('找不到关于我部分容器');
        return;
    }

    const aboutContent = `
        <div class="about-container">
            <div class="about-info">
                <span class="subtitle">关于我</span>
                <h2>摄影师 ${photographerInfo.name}</h2>
                <div class="quote">
                    <i class="fas fa-quote-left"></i>
                    <p>${photographerInfo.status}</p>
                </div>
                <div class="about-details">
                    <p><i class="fas fa-camera"></i> 专注${photographerInfo.specialty}</p>
                    <p><i class="fas fa-user"></i> ${photographerInfo.gender}摄影师</p>
                </div>
                <div class="contact-info">
                    <h3>联系方式</h3>
                    <ul>
                        <li><i class="fas fa-phone"></i> 手机：${photographerInfo.contacts.phone}</li>
                        <li><i class="fab fa-weixin"></i> 微信：${photographerInfo.contacts.wechat}</li>
                        <li><i class="fas fa-envelope"></i> 邮箱：${photographerInfo.contacts.email}</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    aboutSection.innerHTML = aboutContent;
}

// localStorage: users = [{username: 'admin', password: '123456'}, ...] 