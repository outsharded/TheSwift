#! usr/bin/bash
cd
pm2 stop Swift
mv TheSwift/config.json config.json
rm -r TheSwift
git clone https://github.com/tecdude/TheSwift.git
mv config.json TheSwift/config.json
cd TheSwift
npm install
cd
pm2 start Swift
