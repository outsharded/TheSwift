#! usr/bin/bash
cd
pm2 stop Swift
mv TheSwift/config.json config.json
rm -r TheSwift
git clone https://github.com/tectrainguy/TheSwift.git
mv config.json TheSwift
cd TheSwift
npm update
pm2 restart Swift
