### **Nextjs记账本**
一款简洁高效的记账工具，帮助用户轻松记录每日收支、分类管理财务，支持数据可视化分析。旨在提供直观易用的界面和便捷的操作，助力用户养成良好的财务管理习惯，掌控个人或家庭经济。

#### **技术栈：**
1. **前端**
   - **框架**：Next.js。
   - **样式**：CSS Modules。
   - **状态管理**：Context API。
   - **图表库**：Chart.js。

2. **后端**
   - **API 路由**：Next.js 内置 API。
   - **数据库**：postgres。

3. **部署**
   - 使用 **Vercel** 部署

#### **核心功能：**
1. **收入/支出记录**
   - 用户可以记录收入或支出的金额、类别、日期、备注。
   - 提供基本的输入验证。

2. **分类管理**
   - 默认提供常见分类（如餐饮、购物、工资等）。
   - 支持用户自定义分类。

3. **数据统计**
   - 月度收支统计。
   - 分类支出比例饼图（如餐饮占比 xx%）。
   - 支持时间筛选（本月、本年、自定义日期）。

4. **存储**
   - Postgres数据库

5. **用户界面**
   - 支持简洁明了的 UI，显示记录的列表和统计图表。
   - 响应式设计，适配手机和电脑。

#### **前端结构**
- **页面设计**
  1. 首页（Dashboard）
     - 显示当月总收入、总支出、结余。
     - 收支分类饼图。
  2. 记录页面
     - 添加收入/支出记录的表单。
     - 收支列表，按日期排序。
  3. 分类管理页面
     - 分类的增删改查。
  4. 设置页面（可选）
     - 云同步开关、预算管理。

- **组件拆分**
  - **Header**：导航栏。
  - **Footer**：固定底部。
  - **Form**：添加记录的表单。
  - **RecordList**：展示记录的列表。
  - **StatsChart**：统计图表。

#### **核心逻辑**
1. **记录收支**
   - 使用表单提交数据，存储到 `postgres` 数据库。
   - 每条记录结构示例：
     ```json
     {
       "id": "1",
       "type": "支出",
       "amount": 50,
       "tag": "餐饮",
       "date": "2024-11-16",
       "note": "午餐"
     }
     ```

2. **统计数据**
   - 按日期、分类汇总数据。
   - 饼图数据：

3. **时间筛选**
   - 提供日期选择器，筛选特定时间范围的数据。

#### **首页 (Dashboard)**：
- 顶部：显示总收入、总支出、结余。
- 中间：分类饼图 + 柱状图（月度趋势）。
- 底部：快捷入口（添加记录、查看列表）。

#### **记录页面**：
- 表单：
  - 金额输入框。
  - 类型（收入/支出）单选框。
  - 分类下拉选择框。
  - 日期选择器。
  - 备注输入框。
- 收支记录列表：
  - 每条记录显示金额、分类、日期、备注。
  - 支持删除或编辑记录。

#### **统计页面**：
- 支出按分类统计饼图。
- 收入/支出时间趋势柱状图。

#### **扩展功能（Todo）：**
 **多用户支持**
   - 用户登录/注册功能，支持不同用户独立数据。
   - 登录方式：用户名+密码。

 **预算功能**
   - 设置每月预算，超支提醒。

**导出数据**
   - 导出收支记录为 Excel 或 CSV 文件。

