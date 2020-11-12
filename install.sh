apt update
apt install gcc

cd /app/
ls
wget http://www.freedesktop.org/software/fontconfig/release/fontconfig-2.13.92.tar.gz
tar -xzf fontconfig-2.13.92.tar.gz
cd fontconfig-2.13.92
ls
cd fontconfig-2.13.92
ls
./configure
make

# cd /app/
# mkdir cmake-3.18.4
# cd cmake-3.18.4
# wget https://cmake.org/files/v3.18/cmake-3.18.4.tar.gz
# tar -xzf cmake-3.18.4.tar.gz
# sed -i '/"lib64"/s/64//' Modules/GNUInstallDirs.cmake &&
# ./bootstrap --prefix=/usr        \
#             --system-libs        \
#             --mandir=/share/man  \
#             --no-system-jsoncpp  \
#             --no-system-librhash \
#             --docdir=/share/doc/cmake-3.18.4 &&
# make

# cd /app/
# mkdir poppler-20.11.0
# cd poppler-20.11.0
# wget https://poppler.freedesktop.org/poppler-20.11.0.tar.xz
# tar -xzf poppler-20.11.0.tar.xz
# # FONTCONFIG_LIBS="-L/app/fontconfig-2.13.92/src/.libs/ -lfontconfig" FONTCONFIG_CFLAGS="-I/app/fontconfig-20.11.0/" ./configure
# mkdir build                         &&
# cd    build                         &&

# cmake  -DCMAKE_BUILD_TYPE=Release   \
#        -DCMAKE_INSTALL_PREFIX=/usr  \
#        -DTESTDATADIR=$PWD/testfiles \
#        -DENABLE_UNSTABLE_API_ABI_HEADERS=ON     \
#        ..                           &&
# make