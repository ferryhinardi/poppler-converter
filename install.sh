apt update
apt install gcc

cd /app/
wget http://www.freedesktop.org/software/fontconfig/release/fontconfig-2.13.92.tar.gz
cd fontconfig-2.13.92
tar -xzf fontconfig-2.13.92.tar.gz
./configure
make

cd /app/
wget https://poppler.freedesktop.org/poppler-20.11.0.tar.xz
tar -xzf poppler-20.11.0.tar.xz
cd poppler-20.11.0
FONTCONFIG_LIBS="-L/app/fontconfig-2.13.92/src/.libs/ -lfontconfig" FONTCONFIG_CFLAGS="-I/app/fontconfig-20.11.0/" ./configure
make