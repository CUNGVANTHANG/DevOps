## Docker
## Mục lục

<details>
  <summary>Cách Docker hoạt động</summary>

- [1. Kiến trúc Docker](#1-kiến-trúc-docker)
- [2. Các thành phần cơ bản của Docker](#2-các-thành-phần-cơ-bản-của-docker)

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |
| 1 | `docker ps` | Liệt kê các container đang chạy |
| 2 | `docker pull` | Pull (download) một docker image |
| 3 | `docker version` | Show version của Docker client, Docker host |
| 4 | [`docker info`](#docker-info) | Show ra các thông tin của docker client và docker host |
| 5 | [`whereis`](#whereis) | Tìm location nơi chứa file binary của chương trình |
  
</details>
</details>

<details>
  <summary>Docker container</summary>

- [1. Cấu trúc lệnh](#1-cấu-trúc-lệnh)
- [2. Image vs Container](#2-image-vs-container)
- [3. Container vs Virtual Machine](#3-container-vs-virtual-machine)
- [4. Bài tập](#4-bài-tập)

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |
| 1 | [`docker container run`](#docker-container-run) | Tạo docker container | 
| 2 | `docker container logs [name_container]` | Log container |
| 3 | `docker container exec -it [name_container] bash` | Truy cập vào container sử dụng câu lệnh giống Ubuntu |
| 4 | `docker container --help` | Xem hướng dẫn các câu lệnh container |
| 5 | `docker container stats [name_container]` | Xem các thông số trong container |
| 6 | `docker container inspect [name_container] | Xem thông tin chi tiết của container |
| 7 | [`netstat -plunt`](#netstat--plunt) | Xem trạng thái của các port (cổng) trên hệ thống |
  
</details>
</details>

<details>
  <summary>Docker image</summary>

- [1. Docker image là gì](#1-docker-image-là-gì)
- [2. Tạo Redis container từ DockerHub](#2-tạo-redis-container-từ-dockerhub)

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |
| 1 | [`docker image ls`](#docker-image-ls) | Liệt kê các image và dung lượng của nó | 
| 2 | docker network create [name_network] |  tạo môi trường để các container giao tiếp với nhau thông qua container name | 


</details>
</details>

## I. Cách Docker hoạt động
### 1. Kiến trúc Docker
[:arrow_up: Mục lục](#mục-lục)

Kiến trúc Docker gồm: **docker client**, **docker host**, **docker registry**

- Docker client: **nhận lệnh từ user** (Ví dụ: `docker run`, `docker pull`... và gửi đến host)
- Docker host: xử lý lệnh, **quản lý docker object** (container, image, volume,...) kết nối với docker registry để pull/push các docker image
- Docker registry: **lưu trữ**, phân phối các docker image. VD: DockerHub

#### docker info
[:arrow_up: Mục lục](#mục-lục)

Show ra các thông tin của docker client và docker host

![image](https://github.com/user-attachments/assets/a1ed08ae-de05-4c42-857c-0512e628f571)

#### whereis 
[:arrow_up: Mục lục](#mục-lục)

Tìm location nơi chứa file binary của chương trình

Nơi chứa docker client:

```
whereis docker
```

Nơi chứa docker host:

```
whereis dockerd
```

_Chú ý:_

Docker client và docker host có thể nằm cùng một máy hoặc không. Nếu không, docker client sẽ connect từ xa đến docker daemon của docker host

Ta có thể tự setup Docker registry của dự án mà không cần phải lựa chọn DockerHub làm Docker registry duy nhất

### 2. Các thành phần cơ bản của Docker
[:arrow_up: Mục lục](#mục-lục)

Docker container là môi trường chạy độc lập cho application

Docker image là file template để tạo ra docker container

Một docker image có thể tạo ra nhiều docker container, nhưng một docker container chỉ có thể được tạo ra một docker image.

## II. Docker container
### 1. Cấu trúc lệnh
[:arrow_up: Mục lục](#mục-lục)

```
docker <object> <command> <option>
```

Trong đó:

- object: là các đối tượng như: `container`, `image`, `volume`, `network`, `system`
- command: là các câu lệnh sử dụng cho các object
- option: là các tham số của command

_Ví dụ:_

```
docker container run -d --name my-mongo -p 27017:27017 mongo:latest
```

Trong đó:

- object là `container`
- command là `run`
- option là `-d --name my-mongo -p 27017:27017 mongo:latest`

### 2. Image vs Container
[:arrow_up: Mục lục](#mục-lục)

Docker image là file template tạo ra container

Container là môi trường ảo hóa độc lập, hoàn chỉnh: chứa chương trình và các gói bổ sung

Container **bản chất là một process** trên hệ thống

![image](https://github.com/user-attachments/assets/0906e10a-a4e2-484a-bd48-26c60047f8e4)

#### docker container run
[:arrow_up: Mục lục](#mục-lục)

_Ví dụ:_ Trong đó `my-nginx` là tên container

```
docker container run --name my-nginx -p 80:80 nginx
```

Hoạt động như sau:

1. Kiểm tra local xem có image nginx hay không
2. Nếu không có, lên Docker registry (mặc định là DockerHub) để pull image về
3. Tạo container dựa trên image vừa pull
4. Tạo virtual IP cho container
5. Mở port 80 trên máy host và bind nó với port 80 của container
6. Chạy chương trình chính bên trong container

> [!NOTE]
> - `--publish` là tên đầy đủ của `-p` option
> - 80:80 : bên trái là port của host, bên phải là port của container
> - nginx: khi không có tag, mặc định sẽ là **latest**

_Kết quả:_

<img src="https://github.com/user-attachments/assets/89ba96de-ea0a-4762-8ed3-45dae56e2375" width="300px">

<img src="https://github.com/user-attachments/assets/a30f9a3b-0d72-4bdc-9843-2b2ae9743fb1" width="300px">

### netstat -plunt

Dùng để xem trạng thái của các port (cổng) trên hệ thống

<img src="https://github.com/user-attachments/assets/380973c5-99f7-4641-b88e-778e87f10054" width="400px">

_Cài đặt:_

```
sudo apt install net-tools
```

### 3. Container vs Virtual Machine
[:arrow_up: Mục lục](#mục-lục)

Virtual Machine là công nghệ ảo hóa ở mức độ sâu hơn: ảo hóa cả phần cứng

Một VM tương đương với một server hoàn chỉnh: có phần cứng riêng, OS riêng, application riêng

| Ưu điểm | Nhược điểm |
| :--: | :--: |
| Môi trường độc lập cao | Ngốn nhiều tài nguyên |
| Tính bảo mật tốt hơn | Chậm chạp |

> [!NOTE]
> Phù hợp để dựng môi trường hoàn chỉnh để triển khai / test application


### 4. Bài tập
[:arrow_up: Mục lục](#mục-lục)

- Tạo docker container cho các ứng dụng: nginx, mysql, wordpress
- Tạo docker container cho các ứng dụng: nginx, mysql, wordpress
- Nginx web server: chạy cổng 81:80
- Mysql database: chạy cổng 3307, password là "password123_DONG", database là "db_example"
- Wordpress website: chạy cổng 8080, kết nối database ở bên trên

**Lời giải**

- **Tạo docker container cho các ứng dụng: nginx, mysql, wordpress**
- **Nginx web server: chạy cổng 81:80**

```
docker container run --name my-nginx -p 81:80 -d nginx
```

_Kết quả:_

<img src="https://github.com/user-attachments/assets/7e1ac87c-9bfb-4e2e-9841-9c83bab96b61" width="300px">

Kiểm tra bằng `docker container logs my-nginx` để biết rõ hơn

- **Mysql database: chạy cổng 3307, password là "password123_DONG", database là "db_example"**

Tham khảo tại: https://hub.docker.com/_/mysql

```
docker container run --name my-mysql -p 3307:3306 -e MYSQL_ROOT_PASSWORD=password123_DONG -e MYSQL_DATABASE=db_example -d mysql:latest
```

trong đó `-e` nghĩa là sử dụng biến có sẵn `MYSQL_ROOT_PASSWORD` và `MYSQL_DATABASE`

Để kiểm tra xem đã thành công chưa chúng ta sử dụng 

```
docker container exec -it my-mysql bash
```

Sau đó sử dụng câu lệnh sau và nhập password là `password123_DONG`

```
mysql -u root -p
```

_Kết quả:_

<img src="https://github.com/user-attachments/assets/97ce5af5-3a8a-4db3-b5b2-3a4e125faf9d" width="500px">

- **Wordpress website: chạy cổng 8080, kết nối database ở bên trên**

Tham khảo tại đây: https://hub.docker.com/_/wordpress

```
docker container run --name my-wordpress -p 8080:80 -d wordpress
```

_Kết quả:_

<img src="https://github.com/user-attachments/assets/afb1c834-4fc0-4051-b980-93ae7a4c086d" width="600px">

<img src="https://github.com/user-attachments/assets/e25cc482-5d39-4037-99fe-06cf6f12dbed" width="600px">

Sau đó ta thực hiện kết nối với database. 

<img src="https://github.com/user-attachments/assets/3ffe7188-29ff-41b7-9a9d-65e3b05170ff" width="400px">

Lưu ý rằng **Database Host** ta sẽ lấy địa chỉ IP của mysql, bằng cách thực hiện

```
docker container inspect my-mysql
```

<img src="https://github.com/user-attachments/assets/ee00f98c-6842-42b4-bf44-e5a9030e49a8" width="400px">

## III. Docker image
[:arrow_up: Mục lục](#mục-lục)

### 1. Docker image là gì
[:arrow_up: Mục lục](#mục-lục)

Container là một process, vậy để phân phối được container đến nhiều máy tính khác nhau chúng ta cần tới docker image 

Docker image là:

- Là file app binaries + các dependencies
- Là template dùng để tạo ra các container
- Image không chứa OS đầy đủ. Không có kernel vì nó dùng kernel của máy host (VD: driver...)
- Có thể chỉ là 1 file có dung lượng khá nhỏ (VD alpine, busybox...)
- Hoặc 1 file có dung lượng lớn (VD: mongodb, mysql, wordpress...)

### docker image ls

Liệt kê các image và dung lượng của nó

<img src="https://github.com/user-attachments/assets/08f088d9-f89b-4e3b-975e-784c2d40ba87" width="400px">

_Ví dụ:_ Về docker image

<img src="https://github.com/user-attachments/assets/90b017fe-e35b-40d4-9d91-74a6952efce7" width="300px">

File microsoft word khi cài đặt trên máy sẽ ngốn 1.5GB trên ổ cứng của ta. Khi mà ta sử dụng chương trình microsoft word để soạn thảo văn bản thì nó sẽ ngốn 1 lượng tài nguyên khác của chương trình là CPU và RAM

<img src="https://github.com/user-attachments/assets/8767c162-e144-4854-bc2e-ddf4484f676e" width="300px">

Tương tự docker image giống như file microsoft word chiếm 1 dung lượng nhất định. Khi mà docker tạo docker container từ docker image thì nó sẽ ngốn CPU và RAM (vì nó là file template nên nó có thể tạo ra nhiều docker container nhưng vẫn sẽ chạy độc lập trên máy host)

> [!IMPORTANT]
> **3 cách để có Docker image**
>- DockerHub: Download docker image từ public registry
>- Dockerfile: Tạo docker image từ các instruction trong Dockerfile
>- Docker container

### 2. Tạo Redis container từ DockerHub
[:arrow_up: Mục lục](#mục-lục)

Trước khi tạo docker container ta sẽ tạo docker network trước. Docker network là môi trường để các container giao tiếp với nhau thông qua container name. Ví dụ

```
docker network create test
```

Tiếp theo ta khởi tạo docker tên là `some-redis` bằng cách

```
docker run --name some-redis -d --network test redis
```

Cần client để gửi dữ liệu, ta cài đặt

```
docker run -it --network test --rm redis redis-cli -h some-redis
```

Để có thể kiểm tra ta đã có thể truy cập chưa, sử dụng câu lệnh `ping` để kiểm tra

### 3. Dockerfile
[:arrow_up: Mục lục](#mục-lục)

- Là bản thiết kế tạo ra Docker image
- Chứa các chỉ dẫn (intructions) cho docker daemon
- Một Dockerfile phải bắt đầu với chỉ dẫn "FROM"

_Ví dụ:_

<img src="https://github.com/user-attachments/assets/fd1e78f5-83fb-4757-88fb-d988bd9761a0" width="300px" >

_Giải thích lệnh:_

```
FROM node:18-alpine            -> Base image
WORKDIR /app                   -> Thư mục chính
COPY . .                       -> Copy thư mục hiện tại vào thư mục chính của container
RUN yarn install --production  -> Chạy command bên trong container
CMD ["node", "src/index.js"    -> Lệnh/chương trình được chạy khi container start
EXPOSE 3000                    -> Mở cổng trên container
```
