# GitHub Pages Deployment Setup - Complete Guide

## What Was Changed

This repository has been configured to automatically deploy to GitHub Pages using GitHub Actions. Here's what was implemented:

### 1. Vite Configuration (`vite.config.ts`)
- Added `base: '/'` to support the custom domain (www.johngabriel.io)
- This ensures all asset paths are absolute and work correctly with the custom domain

### 2. GitHub Actions Workflow (`.github/workflows/deploy.yml`)
- Created an automated deployment pipeline that:
  - Triggers on every push to the `main` branch
  - Can also be manually triggered via GitHub UI
  - Builds the React app using TypeScript and Vite
  - Deploys the built files to GitHub Pages
  - Uses proper permissions for Pages deployment

### 3. Updated `.gitignore`
- Added `dist` directory to prevent build artifacts from being committed
- Added common files like `.DS_Store` and log files

### 4. Package Configuration (`package.json`)
- Added a `deploy` script for convenience

### 5. Documentation (`README.md`)
- Created comprehensive documentation with:
  - Installation instructions
  - Development setup
  - Deployment guide
  - Technology stack overview

## How to Complete the Setup

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/JohnGabriel1998/React-Portfolio
2. Click on **Settings** tab
3. In the left sidebar, click on **Pages**
4. Under **Source**, select **GitHub Actions** (not the branch option)
5. Save the changes

### Step 2: Merge This Pull Request

1. Review the changes in this PR
2. Merge the PR to the `main` branch
3. The GitHub Actions workflow will automatically trigger

### Step 3: Verify Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow run for "Deploy to GitHub Pages"
3. Wait for it to complete (usually takes 2-3 minutes)
4. Once successful, your site will be live!

### Step 4: Configure Custom Domain (Optional)

Since you already have a `CNAME` file with `www.johngabriel.io`:

1. In your domain registrar's DNS settings, add/verify these records:
   ```
   Type: CNAME
   Name: www
   Value: johngabriel1998.github.io
   ```

2. In GitHub repository Settings > Pages:
   - Enter `www.johngabriel.io` in the Custom domain field
   - Check "Enforce HTTPS"
   - Save

3. Wait for DNS propagation (can take up to 24 hours, but usually much faster)

## Testing the Deployment

### Without Custom Domain
Your site will be available at:
- https://johngabriel1998.github.io/React-Portfolio/

### With Custom Domain
Once DNS is configured, your site will be available at:
- https://www.johngabriel.io

## Troubleshooting

### Workflow Fails
- Check the Actions tab for error messages
- Ensure Node.js version in workflow matches your local version
- Verify all dependencies are in package.json

### Custom Domain Not Working
- Verify DNS settings with your domain provider
- Check that CNAME file is in the root of the repository
- Wait for DNS propagation (up to 24 hours)
- In Settings > Pages, re-enter the custom domain

### Assets Not Loading
- The current configuration uses absolute paths (`/assets/...`)
- This works with custom domains
- If deploying without custom domain to a repository path, you may need to adjust `base` in `vite.config.ts`

## Manual Deployment

If you need to manually trigger deployment:
1. Go to **Actions** tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the `main` branch
5. Click "Run workflow"

## Future Updates

To update your site:
1. Make changes to your code
2. Commit and push to `main` branch
3. GitHub Actions will automatically rebuild and redeploy
4. No manual intervention needed!

## Security

✅ CodeQL security analysis passed with no vulnerabilities detected.

## Need Help?

- GitHub Pages Documentation: https://docs.github.com/pages
- Vite Documentation: https://vitejs.dev/
- React Documentation: https://react.dev/

---

**Deployment Status**: ⏳ Ready to deploy after merging to main
