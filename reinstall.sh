#! usr/bin/bash
cd
pm2 stop Swift
mv TheSwift/config.json config.json
rm -r TheSwift
npm update

