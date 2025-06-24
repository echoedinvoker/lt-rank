## 環境需求

- Node.js 22.x 或更高版本
- npm 或其他包管理工具

## 生產部署流程

1. **複製專案**
   ```bash
   git clone <repository-url>
   cd lt-rank
   ```

2. **安裝依賴**
   ```bash
    npm install
    ```


3. **更新環境變數** (`.env.production`)
   - `VITE_API_URL`: 設定為正式後端 API URL
   - `VITE_USE_MOCK`: 設定為 `false`
   - `VITE_WEB_URL`: 設定為正式網站 URL

4. **建置專案**
   ```bash
   npm run build
   ```

5. **部署 `dist` 資料夾**到您的網頁伺服器
