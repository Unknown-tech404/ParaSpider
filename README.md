# 🔥 Ultimate ParaSpider v3.0

> Next Generation URL & Parameter Discovery Tool for Bug Bounty Hunters & Security Researchers

[![GitHub stars](https://img.shields.io/github/stars/Unknown-tech404/ParaSpider)](https://github.com/Unknown-tech404/ParaSpider/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Unknown-tech404/ParaSpider)](https://github.com/Unknown-tech404/ParaSpider/network)
[![GitHub issues](https://img.shields.io/github/issues/Unknown-tech404/ParaSpider)](https://github.com/Unknown-tech404/ParaSpider/issues)
[![GitHub license](https://img.shields.io/github/license/Unknown-tech404/ParaSpider)](https://github.com/Unknown-tech404/ParaSpider/blob/main/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/Unknown-tech404/ParaSpider)](https://github.com/Unknown-tech404/ParaSpider/commits/main)

---

## 📌 Overview

**Ultimate ParaSpider** is a powerful, multi-threaded URL and parameter discovery tool designed for bug bounty hunters and security researchers. It combines multiple wordlists and smart detection algorithms to find hidden admin panels, parameters, and endpoints.

### ✨ Features

- 🔍 **5000+ Wordlist** - Comprehensive admin, file, and parameter list
- 🚀 **Multi-threaded** - Fast scanning with configurable threads
- 🎯 **Smart Detection** - AI-like pattern matching for admin panels
- 📊 **Parameter Discovery** - Find GET/POST parameters automatically
- 🔑 **Admin Panel Detection** - Identify hidden admin login pages
- 💾 **Export Results** - JSON and CSV export support
- 🖥️ **Cross-Platform** - Works on Linux, Windows, Mac, and Termux
- 📈 **Real-time Progress** - Live progress bar with ETA

---

## 📦 Installation

### Linux / macOS / Windows

```bash
# Clone the repository
git clone https://github.com/Unknown-tech404/ParaSpider.git
cd ParaSpider

# Install dependencies
npm install
```

### Termux (Android)

```bash
pkg update && pkg upgrade
pkg install nodejs git
git clone https://github.com/Unknown-tech404/ParaSpider.git
cd ParaSpider
npm install
```

---

## 🚀 Usage

### Basic Usage

```bash
node paraspider.js https://target.com
```

### Advanced Options

```bash
# Increase threads for faster scanning
node paraspider.js https://target.com --threads 20

# Custom timeout
node paraspider.js https://target.com --timeout 3000

# Save results to custom file
node paraspider.js https://target.com --output results.json

# Verbose mode
node paraspider.js https://target.com --verbose
```

### Available Options

| Option | Description | Default |
|--------|-------------|---------|
| `--threads <n>` | Number of concurrent threads | 10 |
| `--timeout <ms>` | Timeout per request (milliseconds) | 5000 |
| `--output <file>` | Output file name | paraspider_results.json |
| `--verbose` | Show verbose output | false |

---

## 📊 Output

### Sample Output

```
======================================================================
🔥 ULTIMATE PARASPIDER v3.0 - Terminal Edition
======================================================================
ℹ 📌 Target: https://target.com
ℹ 📌 Threads: 10
ℹ 📌 Wordlist: 1560 entries
ℹ 📌 Timeout: 5000ms
======================================================================

▶ Phase 1: Discovering URLs...

📊 [██████████████████████████████] 100.0% | Found: 47 | 12.5s

✔ URL Discovery Complete: 47 URLs found
✔ Admin Panels Found: 2

▶ Discovering Parameters...

✔ Parameter Found: id on https://target.com/admin/index.php
✔ Parameter Found: page on https://target.com/admin/index.php

======================================================================
📊 FINAL REPORT
======================================================================
ℹ 📌 Target: https://target.com
ℹ ⏱️ Time: 15.2s
ℹ 📂 URLs Found: 47
ℹ 🔑 Admin Panels: 2
ℹ 📝 Parameters: 3
======================================================================
```

### Results Files

- `paraspider_results.json` - Complete JSON output
- `paraspider_results.csv` - CSV format for Excel

---

## 🛠️ How It Works

1. **URL Discovery** - Scans thousands of common paths
2. **Admin Panel Detection** - Identifies hidden admin login pages
3. **Parameter Discovery** - Finds GET/POST parameters
4. **Deep Scan** - Parses HTML for forms, JS, CSS files
5. **Report Generation** - Creates comprehensive JSON & CSV reports

---

## 📁 Project Structure

```
ParaSpider/
├── paraspider.js          # Main tool
├── package.json           # Dependencies
├── README.md              # Documentation
├── LICENSE                # MIT License
├── .gitignore             # Git ignore file
└── .github/
    └── workflows/
        └── npm-publish.yml # GitHub Actions (optional)
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## ⚠️ Disclaimer

This tool is for **educational and authorized testing purposes only**. Use only on websites you own or have explicit permission to test. The author is not responsible for any misuse of this tool.

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Unknown-tech404/ParaSpider&type=Date)](https://star-history.com/#Unknown-tech404/ParaSpider&Date)

---

## 📧 Contact

- **Author**: Unknown-tech404
- **GitHub**: [@Unknown-tech404](https://github.com/Unknown-tech404)
- **Repository**: [ParaSpider](https://github.com/Unknown-tech404/ParaSpider)

---

## 🙏 Acknowledgments

- Built for the bug bounty community
- Inspired by various security tools and wordlists

---

**🔥 Happy Hunting!** 🚀
