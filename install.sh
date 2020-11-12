cat /etc/os-release
echo "=============================="
su mount -o remount,rw /
echo "=============================="
apt install build-essential
echo "=============================="

# cd /app/
# wget http://www.netgull.com/gcc/releases/gcc-5.2.0/gcc-5.2.0.tar.gz
# tar xzvf gcc-5.2.0.tar.gz
# echo "============ ls app =================="
# ls
# cd gcc-5.2.0
# ./contrib/download_prerequisites
# cd ..
# mkdir objdir
# cd objdir
# $PWD/../gcc-5.2.0/configure --prefix=$HOME/gcc-5.2.0 --enable-languages=c,c++,fortran,go
# make
# make install

# echo "============ include =================="
# ls /usr/include

# cd /app/
# ls
# wget http://www.freedesktop.org/software/fontconfig/release/fontconfig-2.13.92.tar.gz
# tar -xzf fontconfig-2.13.92.tar.gz
# cd fontconfig-2.13.92
# cd fontconfig-2.13.92
# ls
# ./configure
# make

# cd /app/
# wget https://cmake.org/files/v3.18/cmake-3.18.4.tar.gz
# tar -xzf cmake-3.18.4.tar.gz
# echo "============ ls app =================="
# ls
# cd cmake-3.18.4
# echo "============ ls cmake =================="
# ls
# sed -i '/"lib64"/s/64//' Modules/GNUInstallDirs.cmake &&
# ./bootstrap --prefix=/usr        \
#             --system-libs        \
#             --mandir=/share/man  \
#             --no-system-jsoncpp  \
#             --no-system-librhash \
#             --docdir=/share/doc/cmake-3.18.4 &&
# make

# cd /app/
# wget https://poppler.freedesktop.org/poppler-20.11.0.tar.xz
# tar -xf  poppler-20.11.0.tar.xz
# echo "============ ls app =================="
# ls
# cd poppler-20.11.0
# echo "============ ls poppler =================="
# ls
# cmake  -DCMAKE_BUILD_TYPE=Release   \
#        -DCMAKE_INSTALL_PREFIX=/usr  \
#        -DTESTDATADIR=$PWD/testfiles \
#        -DENABLE_UNSTABLE_API_ABI_HEADERS=ON     \
#        ..                           &&
# make