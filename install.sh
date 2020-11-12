apt-get update
apt-get upgrade
apt-get install gcc
apt-get install g++

echo "============ C++ =================="
ls /usr/include/c++/9.2.0

# cd /app/
# ls
# wget http://www.freedesktop.org/software/fontconfig/release/fontconfig-2.13.92.tar.gz
# tar -xzf fontconfig-2.13.92.tar.gz
# cd fontconfig-2.13.92
# cd fontconfig-2.13.92
# ls
# ./configure
# make

# export CPLUS_INCLUDE_PATH=/usr/include/c++/9.2.0

cd /app/
wget https://cmake.org/files/v3.18/cmake-3.18.4.tar.gz
tar -xzf cmake-3.18.4.tar.gz
echo "============ ls app =================="
ls
cd cmake-3.18.4
echo "============ ls cmake =================="
ls
sed -i '/"lib64"/s/64//' Modules/GNUInstallDirs.cmake &&
./bootstrap --prefix=/usr        \
            --system-libs        \
            --mandir=/share/man  \
            --no-system-jsoncpp  \
            --no-system-librhash \
            --docdir=/share/doc/cmake-3.18.4 &&
make

cd /app/
wget https://poppler.freedesktop.org/poppler-20.11.0.tar.xz
tar -xf  poppler-20.11.0.tar.xz
echo "============ ls app =================="
ls
cd poppler-20.11.0
echo "============ ls poppler =================="
ls
cmake  -DCMAKE_BUILD_TYPE=Release   \
       -DCMAKE_INSTALL_PREFIX=/usr  \
       -DTESTDATADIR=$PWD/testfiles \
       -DENABLE_UNSTABLE_API_ABI_HEADERS=ON     \
       ..                           &&
make