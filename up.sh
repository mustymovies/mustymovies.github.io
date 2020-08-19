#!/bin/bash

cd /mnt/E1/Video/page/git/mustymovies.github.io/


if [ -f /usr/bin/git ]; then 
	echo '/usr/bin/git'
else
 	installpkg --terse /mnt/sda2/Video/page/git-2.26.2-x86_64-1.txz
fi


kate ../pass
rm -rf /mnt/E1/Video/page/git/mustymovies.github.io/.git/

git init
git add --all
git remote add origin  https://github.com/mustymovies/mustymovies.github.io.git


git commit -m "initial commit"
#git push -u origin master
git push  --all --force

exit
rm -rf /mnt/E1/Video/page/git/mustymovies.github.io/.git/
git init
git add --all
git remote add origin  https://github.com/mustymovies/mustymovies.github.io
git push  --all --force

 exit
 
git push --set-upstream origin master --force

 
git remote add origin m4qu3l4n@gmail.com:mustymovies/mustymovies.github.io


git push -u origin master
rm -rf /mnt/E1/Video/page/git/mustymovies.github.io/.git/
git init
git add --all
git commit -m "First Commit"

 git remote add origin  https://github.com/mustymovies/mustymovies.github.io
 




git push --set-upstream origin maste


git add --all

git commit -m "Initial commit"

git push -u origin master

git push  --all --force


exit
git config --global user.name "m4qu3l4n"
git config --global user.email "m4qu3l4n@gmail.com"

https://mustymovies.github.io/

exit
git clone https://github.com/mustymovies/mustymovies.github.io

