#!/usr/bin/env node

// ================================================================
// 🔥 PARASPIDER v3.0 - TERMINAL EDITION
// ================================================================
// Installation: 
//   npm install axios chalk ora cli-progress
//   node paraspider.js https://target.com
// ================================================================

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Colors for terminal
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m'
};

// Simple logger
const log = {
    info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
    success: (msg) => console.log(`${colors.green}✔${colors.reset} ${msg}`),
    error: (msg) => console.log(`${colors.red}✘${colors.reset} ${msg}`),
    warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
    highlight: (msg) => console.log(`${colors.cyan}${msg}${colors.reset}`),
    header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${'='.repeat(70)}${colors.reset}`),
    subheader: (msg) => console.log(`${colors.bright}${colors.magenta}▶ ${msg}${colors.reset}`),
    blank: () => console.log('')
};

class UltimateParaSpiderCLI {
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl.replace(/\/$/, '');
        this.options = {
            threads: options.threads || 10,
            timeout: options.timeout || 5000,
            maxDepth: options.maxDepth || 3,
            userAgent: options.userAgent || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            output: options.output || 'paraspider_results.json',
            verbose: options.verbose || false,
            ...options
        };
        
        this.results = {
            urls: [],
            adminPanels: [],
            parameters: [],
            hiddenParams: [],
            forms: [],
            jsFiles: [],
            cssFiles: [],
            images: [],
            errors: []
        };
        
        this.stats = {
            totalChecked: 0,
            totalFound: 0,
            startTime: Date.now(),
            requestsPerSecond: 0
        };
        
        this.processed = new Set();
        this.wordlist = this.buildWordlist();
        this.running = false;
    }

    buildWordlist() {
        const admin = [
            'admin', 'login', 'admin/login', 'adminpanel', 'administrator',
            'admincp', 'adminarea', 'admin-login', 'admin_login',
            'dashboard', 'admin/dashboard', 'admin/index',
            'wp-admin', 'wp-login', 'login.php', 'admin.php',
            'administrator/index.php', 'admin/index.php',
            'panel', 'cpanel', 'cp', 'controlpanel',
            'auth', 'login/admin', 'admin/login.php',
            'moderator', 'staff', 'backend', 'admin/panel',
            'sysadmin', 'admin/home', 'admin/main',
            'manager', 'admin/manager', 'administration',
            'admin/control', 'admin/console', 'admin/dashboard',
            'management', 'admin/management', 'control',
            'panel/admin', 'admin/web', 'webadmin', 'siteadmin',
            'admin_site', 'admin-tool', 'admin_dashboard',
            'backend/login', 'backend/admin', 'backend/panel',
            'cms/admin', 'cms/login', 'cms/dashboard',
            'portal/admin', 'portal/login', 'portal/panel',
            'office', 'office/admin', 'office/login',
            'school', 'school/admin', 'school/login',
            'college', 'college/admin', 'college/login',
            'university', 'university/admin', 'university/login',
            'institute', 'institute/admin', 'institute/login',
            'academy', 'academy/admin', 'academy/login',
            'center', 'center/admin', 'center/login',
            'hub', 'hub/admin', 'hub/login',
            'node', 'node/admin', 'node/login',
            'secure', 'secure/login', 'secure/admin',
            'private', 'private/login', 'private/admin',
            'staff', 'staff/login', 'staff/admin',
            'employee', 'employee/login', 'employee/admin',
            'member', 'member/login', 'member/admin',
            'user', 'user/login', 'user/admin',
            'account', 'account/login', 'account/admin',
            'profile', 'profile/login', 'profile/admin',
            'settings', 'settings/login', 'settings/admin',
            'config', 'config/login', 'config/admin',
            'setup', 'setup/login', 'setup/admin',
            'install', 'install/login', 'install/admin',
            'update', 'update/login', 'update/admin',
            'upgrade', 'upgrade/login', 'upgrade/admin',
            'migrate', 'migrate/login', 'migrate/admin',
            'backup', 'backup/login', 'backup/admin',
            'restore', 'restore/login', 'restore/admin',
            'import', 'import/login', 'import/admin',
            'export', 'export/login', 'export/admin',
            'upload', 'upload/login', 'upload/admin',
            'download', 'download/login', 'download/admin',
            'files', 'files/login', 'files/admin',
            'media', 'media/login', 'media/admin',
            'gallery', 'gallery/login', 'gallery/admin',
            'content', 'content/login', 'content/admin',
            'pages', 'pages/login', 'pages/admin',
            'posts', 'posts/login', 'posts/admin',
            'comments', 'comments/login', 'comments/admin',
            'feedback', 'feedback/login', 'feedback/admin',
            'support', 'support/login', 'support/admin',
            'tickets', 'tickets/login', 'tickets/admin',
            'orders', 'orders/login', 'orders/admin',
            'products', 'products/login', 'products/admin',
            'services', 'services/login', 'services/admin',
            'payments', 'payments/login', 'payments/admin',
            'transactions', 'transactions/login', 'transactions/admin',
            'invoices', 'invoices/login', 'invoices/admin',
            'reports', 'reports/login', 'reports/admin',
            'analytics', 'analytics/login', 'analytics/admin',
            'statistics', 'statistics/login', 'statistics/admin',
            'metrics', 'metrics/login', 'metrics/admin',
            'kpi', 'kpi/login', 'kpi/admin',
            'performance', 'performance/login', 'performance/admin',
            'audit', 'audit/login', 'audit/admin',
            'compliance', 'compliance/login', 'compliance/admin',
            'security', 'security/login', 'security/admin',
            'maintenance', 'maintenance/login', 'maintenance/admin'
        ];

        const files = [
            'index', 'default', 'home', 'main', 'dashboard', 'login', 'register',
            'signup', 'logout', 'profile', 'account', 'settings', 'config', 'db',
            'database', 'backup', 'restore', 'import', 'export', 'upload', 'download',
            'files', 'media', 'gallery', 'content', 'pages', 'posts', 'comments',
            'feedback', 'support', 'tickets', 'orders', 'products', 'services',
            'payments', 'transactions', 'invoices', 'reports', 'analytics', 'statistics',
            'metrics', 'kpi', 'performance', 'audit', 'compliance', 'security',
            'maintenance', 'update', 'upgrade', 'migrate', 'seed', 'refresh', 'clear',
            'cache', 'session', 'cookie', 'token', 'api', 'webhook', 'notification',
            'email', 'sms', 'push', 'websocket', 'event', 'schedule', 'job', 'queue',
            'worker', 'task', 'process', 'thread', 'cron', 'daemon', 'service',
            'container', 'pod', 'node', 'cluster', 'load', 'balance', 'failover',
            'replica', 'shard', 'partition', 'optimize', 'repair', 'analyze', 'check',
            'verify', 'validate', 'authenticate', 'authorize', 'permission', 'role',
            'group', 'team', 'department', 'division', 'unit', 'section', 'branch',
            'office', 'center', 'hub', 'station', 'post', 'position', 'rank', 'grade',
            'level', 'step', 'stage', 'phase', 'cycle', 'round', 'term', 'semester',
            'trimester', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second'
        ];

        const extensions = ['php', 'html', 'htm', 'asp', 'aspx', 'jsp', 'jspx', 'do', 'action', 'cgi', 'pl', 'py', 'rb', 'cfm', 'shtml', 'xhtml', 'js', 'css', 'json', 'xml', 'txt'];

        const combined = [];
        
        for (const word of [...admin, ...files]) {
            combined.push(word);
            combined.push(`${word}.php`);
            combined.push(`${word}.html`);
            combined.push(`${word}.asp`);
            combined.push(`${word}.aspx`);
            combined.push(`${word}.jsp`);
        }

        // Add common paths with slashes
        const paths = ['admin', 'login', 'dashboard', 'panel', 'control', 'manage'];
        for (const p of paths) {
            combined.push(p);
            combined.push(`${p}/`);
            combined.push(`${p}/index.php`);
            combined.push(`${p}/login.php`);
            combined.push(`${p}/dashboard.php`);
        }

        return [...new Set(combined)];
    }

    // ----------------------------------------------------------------
    // HTTP Request Function (Node.js native)
    // ----------------------------------------------------------------
    makeRequest(url, method = 'HEAD') {
        return new Promise((resolve) => {
            const parsedUrl = new URL(url);
            const options = {
                hostname: parsedUrl.hostname,
                port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
                path: parsedUrl.pathname + parsedUrl.search,
                method: method,
                headers: {
                    'User-Agent': this.options.userAgent,
                    'Accept': '*/*',
                    'Connection': 'close'
                },
                timeout: this.options.timeout,
                rejectUnauthorized: false
            };

            const protocol = parsedUrl.protocol === 'https:' ? https : http;
            const req = protocol.request(options, (res) => {
                let data = '';
                res.on('data', (chunk) => { data += chunk; });
                res.on('end', () => {
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        data: data,
                        url: url
                    });
                });
            });

            req.on('error', () => {
                resolve({ status: 0, error: true });
            });

            req.on('timeout', () => {
                req.destroy();
                resolve({ status: 0, error: true });
            });

            req.end();
        });
    }

    // ----------------------------------------------------------------
    // CHECK URL
    // ----------------------------------------------------------------
    async checkUrl(path) {
        const url = `${this.baseUrl}/${path}`;
        if (this.processed.has(url)) return;
        this.processed.add(url);

        try {
            const response = await this.makeRequest(url, 'HEAD');
            
            if (response.status === 200 || response.status === 301 || response.status === 302) {
                const result = {
                    url: url,
                    status: response.status,
                    contentType: response.headers['content-type'] || 'unknown'
                };
                
                this.results.urls.push(result);
                this.stats.totalFound++;

                // Check if admin panel
                if (this.isAdminPath(path)) {
                    this.results.adminPanels.push(result);
                    log.success(`Admin Panel: ${url}`);
                } else if (response.status === 200) {
                    // Get content to check
                    const contentResponse = await this.makeRequest(url, 'GET');
                    if (this.isAdminContent(contentResponse.data)) {
                        this.results.adminPanels.push({
                            ...result,
                            detected: 'content_pattern'
                        });
                        log.success(`Admin Panel (detected): ${url}`);
                    }
                }
            }

            this.stats.totalChecked++;

        } catch (error) {
            // Silently skip
        }
    }

    // ----------------------------------------------------------------
    // DISCOVER PARAMETERS
    // ----------------------------------------------------------------
    async discoverParameters() {
        log.subheader('Discovering Parameters...');
        
        const testParams = [
            'id', 'page', 'cat', 'view', 'action', 'mode', 'type',
            'q', 'search', 'query', 'keyword', 'user', 'email',
            'login', 'auth', 'token', 'session', 'file', 'path'
        ];

        let found = 0;
        for (const urlObj of this.results.urls.slice(0, 20)) {
            const baseUrl = urlObj.url.split('?')[0];
            
            for (const param of testParams) {
                const testUrl = `${baseUrl}?${param}=test123`;
                try {
                    const response = await this.makeRequest(testUrl, 'GET');
                    if (response.status === 200 && response.data.includes('test123')) {
                        this.results.parameters.push({
                            url: baseUrl,
                            param: param,
                            status: response.status
                        });
                        found++;
                        log.success(`Parameter Found: ${param} on ${baseUrl}`);
                    }
                } catch (e) {}
            }
        }

        log.info(`Found ${found} parameters\n`);
    }

    // ----------------------------------------------------------------
    // DEEP SCAN
    // ----------------------------------------------------------------
    async deepScan() {
        log.subheader('Deep Scanning (HTML Parsing)...');
        
        let forms = 0, jsFiles = 0, cssFiles = 0;

        for (const urlObj of this.results.urls.slice(0, 10)) {
            try {
                const response = await this.makeRequest(urlObj.url, 'GET');
                if (response.status !== 200) continue;
                
                const html = response.data;
                
                // Find forms
                const formMatches = html.match(/<form[^>]*action=['"]([^'"]+)['"]/g);
                if (formMatches) {
                    formMatches.forEach(form => {
                        this.results.forms.push({ url: urlObj.url, form: form });
                        forms++;
                    });
                }

                // Find JS files
                const jsMatches = html.match(/<script[^>]*src=['"]([^'"]+\.js)['"]/g);
                if (jsMatches) {
                    jsMatches.forEach(js => {
                        this.results.jsFiles.push(js);
                        jsFiles++;
                    });
                }

                // Find CSS files
                const cssMatches = html.match(/<link[^>]*href=['"]([^'"]+\.css)['"]/g);
                if (cssMatches) {
                    cssMatches.forEach(css => {
                        this.results.cssFiles.push(css);
                        cssFiles++;
                    });
                }

            } catch (e) {}
        }

        log.info(`Found ${forms} forms, ${jsFiles} JS files, ${cssFiles} CSS files\n`);
    }

    // ----------------------------------------------------------------
    // HELPERS
    // ----------------------------------------------------------------
    isAdminPath(path) {
        const adminKeywords = ['admin', 'login', 'dashboard', 'panel', 'control', 'manage', 'staff', 'backend', 'cms'];
        return adminKeywords.some(keyword => path.toLowerCase().includes(keyword));
    }

    isAdminContent(content) {
        if (!content) return false;
        const adminIndicators = [
            'login', 'username', 'password', 'admin', 'dashboard',
            'panel', 'control', 'management', 'staff', 'backend',
            'sign in', 'log in', 'welcome', 'account', 'profile'
        ];
        const lowerContent = content.toLowerCase();
        let count = 0;
        for (const indicator of adminIndicators) {
            if (lowerContent.includes(indicator)) count++;
        }
        return count >= 3;
    }

    // ----------------------------------------------------------------
    // PROGRESS BAR
    // ----------------------------------------------------------------
    showProgress(current, total) {
        const percent = ((current / total) * 100).toFixed(1);
        const elapsed = ((Date.now() - this.stats.startTime) / 1000).toFixed(1);
        const barLength = 30;
        const filled = Math.floor((current / total) * barLength);
        const bar = '█'.repeat(filled) + '░'.repeat(barLength - filled);
        process.stdout.write(`\r${colors.cyan}📊${colors.reset} [${bar}] ${percent}% | Found: ${this.stats.totalFound} | ${elapsed}s`);
    }

    // ----------------------------------------------------------------
    // MAIN SCAN
    // ----------------------------------------------------------------
    async scan() {
        log.header();
        log.info(`${colors.bright}🔥 PARASPIDER v3.0 - Terminal Edition${colors.reset}`);
        log.header();
        log.info(`📌 Target: ${colors.bright}${this.baseUrl}${colors.reset}`);
        log.info(`📌 Threads: ${this.options.threads}`);
        log.info(`📌 Wordlist: ${this.wordlist.length} entries`);
        log.info(`📌 Timeout: ${this.options.timeout}ms`);
        log.header();

        this.running = true;
        this.stats.startTime = Date.now();

        // Phase 1: Discover URLs
        log.subheader('Phase 1: Discovering URLs...');
        log.blank();

        const total = this.wordlist.length;
        let completed = 0;
        const batchSize = this.options.threads;

        for (let i = 0; i < this.wordlist.length; i += batchSize) {
            const batch = this.wordlist.slice(i, i + batchSize);
            const promises = batch.map(path => this.checkUrl(path));
            
            await Promise.allSettled(promises);
            
            completed += batch.length;
            this.showProgress(completed, total);
        }

        log.blank();
        log.success(`URL Discovery Complete: ${this.results.urls.length} URLs found`);
        log.success(`Admin Panels Found: ${this.results.adminPanels.length}`);
        log.blank();

        // Phase 2: Discover Parameters
        if (this.results.urls.length > 0) {
            await this.discoverParameters();
        }

        // Phase 3: Deep Scan
        await this.deepScan();

        // Phase 4: Generate Report
        this.generateReport();

        return this.results;
    }

    // ----------------------------------------------------------------
    // GENERATE REPORT
    // ----------------------------------------------------------------
    generateReport() {
        const elapsed = ((Date.now() - this.stats.startTime) / 1000).toFixed(1);
        
        log.header();
        log.info(`${colors.bright}📊 FINAL REPORT${colors.reset}`);
        log.header();
        log.info(`📌 Target: ${this.baseUrl}`);
        log.info(`⏱️ Time: ${elapsed}s`);
        log.info(`📂 URLs Found: ${this.results.urls.length}`);
        log.info(`🔑 Admin Panels: ${this.results.adminPanels.length}`);
        log.info(`📝 Parameters: ${this.results.parameters.length}`);
        log.info(`📋 Forms: ${this.results.forms.length}`);
        log.info(`📄 JS Files: ${this.results.jsFiles.length}`);
        log.info(`🎨 CSS Files: ${this.results.cssFiles.length}`);
        log.header();

        if (this.results.adminPanels.length > 0) {
            log.subheader('🔑 Admin Panels Found:');
            this.results.adminPanels.forEach((panel, i) => {
                log.success(`${i+1}. ${panel.url} (Status: ${panel.status})`);
            });
            log.blank();
        }

        if (this.results.parameters.length > 0) {
            log.subheader('📝 Parameters Found:');
            this.results.parameters.forEach((p, i) => {
                log.info(`${i+1}. ${p.url}?${p.param}= (Status: ${p.status})`);
            });
            log.blank();
        }

        // Save results
        this.saveResults();

        log.header();
        log.success('✅ Scan Complete!');
        log.info(`📁 Results saved to: ${this.options.output}`);
        log.header();
    }

    // ----------------------------------------------------------------
    // SAVE RESULTS
    // ----------------------------------------------------------------
    saveResults() {
        const data = {
            target: this.baseUrl,
            timestamp: new Date().toISOString(),
            stats: {
                totalChecked: this.stats.totalChecked,
                totalFound: this.stats.totalFound,
                elapsed: ((Date.now() - this.stats.startTime) / 1000).toFixed(1)
            },
            results: this.results
        };

        fs.writeFileSync(this.options.output, JSON.stringify(data, null, 2));
        
        // Also save CSV
        let csv = 'URL,Status,ContentType\n';
        this.results.urls.forEach(u => {
            csv += `${u.url},${u.status},${u.contentType}\n`;
        });
        const csvPath = this.options.output.replace('.json', '.csv');
        fs.writeFileSync(csvPath, csv);
    }
}

// ================================================================
// 🚀 COMMAND LINE INTERFACE
// ================================================================

async function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log(`
${colors.cyan}${'='.repeat(70)}${colors.reset}
${colors.bright}🔥 PARASPIDER v3.0 - Terminal Edition${colors.reset}
${colors.cyan}${'='.repeat(70)}${colors.reset}

${colors.yellow}Usage:${colors.reset}
  node paraspider.js <target-url> [options]

${colors.yellow}Options:${colors.reset}
  --threads <n>     Number of concurrent threads (default: 10)
  --timeout <ms>    Timeout per request (default: 5000)
  --output <file>   Output file (default: paraspider_results.json)
  --verbose         Show verbose output

${colors.yellow}Examples:${colors.reset}
  node paraspider.js https://target.com
  node paraspider.js https://target.com --threads 20 --timeout 3000
  node paraspider.js https://target.com --output my_results.json

${colors.cyan}${'='.repeat(70)}${colors.reset}
        `);
        process.exit(0);
    }

    const target = args[0];
    const options = {
        threads: 10,
        timeout: 5000,
        output: 'paraspider_results.json',
        verbose: false
    };

    for (let i = 1; i < args.length; i++) {
        if (args[i] === '--threads' && args[i+1]) {
            options.threads = parseInt(args[++i]);
        } else if (args[i] === '--timeout' && args[i+1]) {
            options.timeout = parseInt(args[++i]);
        } else if (args[i] === '--output' && args[i+1]) {
            options.output = args[++i];
        } else if (args[i] === '--verbose') {
            options.verbose = true;
        }
    }

    try {
        const spider = new UltimateParaSpiderCLI(target, options);
        await spider.scan();
    } catch (error) {
        log.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = UltimateParaSpiderCLI;
