# Project Backend For Social Media

## Deskripsi
Service backend untuk sebuah social media yang di dalamnya terdapat fitur untuk registerasi,verifikasi email,
login,CRUD(Create,Read,Update,Delete) postingan yang dibuat, fitur comment dan like yang nantinya akan mengirimkan email
notifikasi ke email yang terdaftar. Untuk Authorization menggunakan JWT(JsonWebToken)

## Stack
- NodeJS(v16.14.2)
- Framework: ExpressJS
- ORM: Sequelize
- Database: PostgreSQL

1. Install NPM (Node Package Manager)
```
npm install
```
2. Migration Database
```
- Pastikan sudah menginstall Sequelize
- Sequelize db:create
- Sequelize db:migrate
```
3. Jalankan Program
```
npm start
```
4. Memakai Program
```
Pakai postman untuk menjalankan program
```
5.  NB
```
Disarankan menjalankan program secara lokal, dikarenakan masih banyak bug/error di heroku
```

## Fungsional

*   Jalankan program menggunakan Postman

*   Import collection Postman yang ada di folder Postman

*   Rubah {{base3000}} menjadi localhost:3000 jika ingin menjalankan secara local

*   Rubah {{base3000}} menjadi `https://v1-sosmed.herokuapp.com`jika ingin menjalankan secara online

*   Dalam endpoint Register, dalam body silahkan diisi data - data yang di butuhkan
seperti username,password,dan email

*   Dalam endpoint Login, dalam body silahkan diisi username dan password lalu akan     mendapatkan token

*   Dalam endpoint Posting, dalam body silahkan diisi postingan yang di inginkan lalu memasukan token kedalam header 

*   Dalam endpoint EnablePostingan, endpoint ini untuk mengaktifkan komentar agar bisa memberikan komentar ke postingan dengan mengisi token di header dan mengisi ID dari postingan yang ada di params

*   Dalam endpoint DisablePostingan, endpoint ini untuk menonaktifkan komentar agar bisa memberikan komentar ke postingan dengan mengisi token di header dan mengisi ID dari postingan yang ada di params

*   Dalam endpoint GetAkun, endpoint ini kita dapat melihat Akun yang kita miliki dengan memasukan token di header

*   Dalam endpoint GetPostingan, endpoint ini kita dapat melihat postingan yang di inginkan dengan memasukan id dalam params dan token dalam header

*   Dalam endpoint EditPostingan, endpoint ini kita dapat mengedit postingan yang kita miliki dengan memasukan id dalam params dan token dalam header

*   Dalam endpoint DeletePostingan, endpoint ini kita dapat menghapus postingan yang kita inginkan dengan memasukan id dalam params dan token dalam header

*   Dalam endpoint CreateComment, endpoint ini kita dapat memberikan komentar ke postingan yang kita inginkan dengan memasukan id dalam params dan token dalam header

*   Dalam endpoint Likes, endpoint ini kita dapat memberikan like ke postingan yang kita inginkan dengan memasukan id dalam params dan token dalam header

