#!/usr/bin/env bash

setReleaseDir() {
    INITIAL_DIR=$PWD
    cd $(dirname $0)/../build/releases
}

restoreRootDir() {
    cd $PWD;
}

setReleaseDir
bash bin/validateDeps.sh

echo "\n==================== Running Command ===================="

unzip vanilla-Thor.zip
#chown -R composer:composer package

#chown -R composer:www-data package/cache
#chown -R composer:www-data package/conf
#chown -R composer:www-data package/uploads

#chmod -R g+w package/cache
#chmod -R g+w package/conf
#chmod -R g+w package/uploads

rsync -a package/ ../../
rm -r package

# Make the release
restoreRootDir
