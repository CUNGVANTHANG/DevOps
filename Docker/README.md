## Docker

Docker là công cụ giúp bạn đóng gói ứng dụng kèm môi trường chạy (như Node, Python, DB, OS...) vào một "hộp" gọi là container, để:

👉 Chạy ở đâu cũng được, không lo lệch môi trường giữa máy dev, test, hay production.

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
| 6 | docker login | Login vào docker hub |
  
</details>
</details>

<details>
  <summary>Docker container</summary>

- [1. Cấu trúc lệnh](#1-cấu-trúc-lệnh)
- [2. Image vs Container](#2-image-vs-container)
- [3. Container vs Virtual Machine](#3-container-vs-virtual-machine)
- [4. Bài tập](#4-bài-tập)
- [5. Tạo Redis container từ DockerHub](#5-tạo-redis-container-từ-dockerhub)
- [6. Tạo container từ image](#6-tạo-container-từ-image)

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |
| 1 | [`docker container run`](#docker-container-run) | Tạo docker container | 
| 2 | `docker container logs [name_container]` | Log container |
| 3 | `docker container exec -it [name_container] bash` | Truy cập vào container sử dụng câu lệnh giống Ubuntu |
| 4 | `docker container --help` | Xem hướng dẫn các câu lệnh container |
| 5 | `docker container stats [name_container]` | Xem các thông số trong container |
| 6 | `docker container inspect [name_container]` | Xem thông tin chi tiết của container |
| 7 | `docker container diff [name_container]` | Xem các writable layer trong container |
| 8 | `docker container prune` | Xóa tất cả các container ở trạng thái Stopped |
| 9 | [`netstat -plunt`](#netstat--plunt) | Xem trạng thái của các port (cổng) trên hệ thống |
  
</details>
</details>

<details>
  <summary>Docker image</summary>

- [1. Docker image là gì](#1-docker-image-là-gì)
- [2. Dockerfile](#2-dockerfile)
- [3. Tạo Docker image từ Docker container](#3-tạo-docker-image-từ-docker-container)
- [4. Phân phối, chia sẻ Docker image bằng Docker registry](#4-phân-phối-chia-sẻ-docker-image-bằng-docker-registry)
- [5. Phân phối, chia sẻ Docker image bằng file TAR](#5-phân-phối-chia-sẻ-docker-image-bằng-file-tar)

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |
| 1 | [`docker image ls`](#docker-image-ls) | Liệt kê các image và dung lượng của nó | 
| 2 | `docker network create [name_network]` |  Tạo môi trường để các container giao tiếp với nhau thông qua container name | 
| 3 | [`docker image history`](#docker-image-history) |Xem các layer của docker image |
| 4 | [`docker image build`](#docker-image-build) | Build dockerfile (Tạo docker image từ Dockerfile) |
| 5 | [`docker container commit`](#docker-container-commit) | Tạo docker image từ docker container |
| 6 | [`docker image tag`](#docker-image-tag) | Thay đổi tên, tag của một docker image | 
| 7 | `docker image push [image or account/image]` | Push image lên docker hub | 
| 8 | `docker image rm [image or account/image]:[tag]` | Xóa image tại local | 
| 9 | `docker image pull [image or account/image]` | Pull image từ docker hub | 

</details>
</details>

<details>
  <summary>Docker volume</summary>

- [1. Persistent Data](#1-persistent-data)
- [2. Bind Mount](#2-bind-mount)
- [3. Ví dụ về Bind Mount](#3-ví-dụ-về-bind-mount)
- [4. Volume là gì](#4-volume-là-gì)
- [5. Ví dụ về Volume](#5-ví-dụ-về-volume)
- [6. Bind mount vs Volume](#6-bind-mount-vs-volume)
- [7. Utility containers](#7-utility-containers)

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |
| 1 | [`docker container run -v`](#4-volume-là-gì) | Tạo container có volume |
| 2 | `docker volume ls` | Liệt kê các volume |
| 3 | `docker volume inspect [volume_name]` |  Xem thông tin chi tiết của volume | 
| 4 | `docker volume rm [volume_name]` | Xóa volume có tên là volume_name | 
| 5 | [`docker container run --volumes-from [container_name]`](#5-ví-dụ-về-volume) | Tạo docker mới có tất cả volume của docker container_name |

</details>
</details>

<details>
  <summary>Docker network</summary>

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |

</details>
</details>

<details>
  <summary>Docker compose</summary>

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |

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

_Ví dụ 1:_ Trong đó `my-nginx` là tên container, `nginx` là tên image

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

_Ví dụ 2:_ Ta có thể kết hợp câu lệnh tạo container và câu lệnh truy cập vào container. Trong đó `new-container` là tên container, `new-ubuntu` là tên image

```
docker container run --name new-container -it new-ubuntu bash
```

### netstat -plunt
[:arrow_up: Mục lục](#mục-lục)

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

### 5. Tạo Redis container từ DockerHub
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

### 6. Tạo container từ image
[:arrow_up: Mục lục](#mục-lục)

Cách tạo rất đơn giản là tạo thêm layer mới lên trên layer của docker image (Docker thêm 1 writable layer lên trên các image layers)

Hình dung là image layers là các layer read-only. Để có thể tạo container từ image ta chỉ cần thêm writable layer lên trên 

<img src="https://github.com/user-attachments/assets/25064556-e4ad-4137-899f-f6b37a9044f9" width="300px" >

<img src="https://github.com/user-attachments/assets/7073bffc-aa09-45f7-a865-375fc66baa97" width="300px" >

Câu lệnh sử dụng [`docker container run`](#docker-container-run)

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

> [!IMPORTANT]
> **3 cách để có Docker image**
>- DockerHub: Download docker image từ public registry
>- Dockerfile: Tạo docker image từ các instruction trong Dockerfile
>- Docker container: Biến writable layer thành read only layer

> [!IMPORTANT]
> **2 cách để phân phối, chia sẻ Docker image cho người khác**
>- Docker Registry: Dùng lệnh pull/push phân phối images lên Docker registry
>- TAR file: Chuyển image thành file TAR

### docker image ls
[:arrow_up: Mục lục](#mục-lục)

Liệt kê các image và dung lượng của nó

<img src="https://github.com/user-attachments/assets/08f088d9-f89b-4e3b-975e-784c2d40ba87" width="400px">

_Ví dụ:_ Về docker image

<img src="https://github.com/user-attachments/assets/90b017fe-e35b-40d4-9d91-74a6952efce7" width="300px">

File microsoft word khi cài đặt trên máy sẽ ngốn 1.5GB trên ổ cứng của ta. Khi mà ta sử dụng chương trình microsoft word để soạn thảo văn bản thì nó sẽ ngốn 1 lượng tài nguyên khác của chương trình là CPU và RAM

<img src="https://github.com/user-attachments/assets/8767c162-e144-4854-bc2e-ddf4484f676e" width="300px">

Tương tự docker image giống như file microsoft word chiếm 1 dung lượng nhất định. Khi mà docker tạo docker container từ docker image thì nó sẽ ngốn CPU và RAM (vì nó là file template nên nó có thể tạo ra nhiều docker container nhưng vẫn sẽ chạy độc lập trên máy host)

#### Cấu trúc của Docker Image
[:arrow_up: Mục lục](#mục-lục)

Image tạo bởi 1 chuỗi layers. Mỗi layer là một sự thay đổi trên file system

**File system?**

- Là cách mà non-volatile data được lưu trữ, quản lý trên các storage devices
  - VD: FAT, NTFS, ext...

> [!NOTE]
> - **non-volatile data** là dữ liệu không bị mất đi khi ngắt nguồn điện
> - **volatile data** là dữ liệu lưu trên RAM, cache sẽ bị mất khi ngắt nguồn điện

Docker sử dụng file khá là đặc biệt đó là union file system

**Union File System?**

- Các layer xếp chồng lên nhau theo trình tự từ dưới lên trên
- Layer bên trên sẽ kế thừa layer bên dưới
- Tất cả layer trong image đều là read-only

Tương tự như vậy

```
FROM node:18-alpine            -> Base image
WORKDIR /app                   -> Layer 1
COPY . .                       -> Layer 2
RUN yarn install --production  -> Layer 3
CMD ["node", "src/index.js"    -> Layer 4
EXPOSE 3000                    -> Layer 5
```

### docker image history
[:arrow_up: Mục lục](#mục-lục)

Câu lệnh sử dụng để xem được các layer của docker image

_Ví dụ:_

```
docker image history redis:latest
```

_Kết quả:_

<img src="https://github.com/user-attachments/assets/c264c13f-926d-48c4-91ca-876845b9e4ac" width="500px" >

Nếu ta cộng tất cả kích thước ở đây sẽ ra được kích thước thật của docker image

### 2. Dockerfile
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

Tham khảo thêm tại: https://docs.docker.com/reference/dockerfile/

**Cached layers**

Docker cố gắng sử dụng lại các layer đã tạo trước đó

Và build lại toàn bộ từ layer đầu tiên bị thay đổi

_Ví dụ:_

<img src="https://github.com/user-attachments/assets/fd1e78f5-83fb-4757-88fb-d988bd9761a0" width="300px" >

Hiểu đơn giản nếu layer 3 có sự thay đổi thì các layer ở phía trên sẽ được caching lại nghĩa là không cần phải tạo mới mà được sử dụng luôn. Nó sẽ build từ layer 3 xuống các layer dưới

**Kỹ thuật tối ưu hóa quá trình build**

Tại sao phải tối ưu hóa quá trình build. Đơn giản là để đỡ mất thời gian

**Cách 1**: Chuyển những instruction dùng chung cho mọi lần build (VD update OS, cài đặt chương trình...) lên trước để tận dụng khả năng cache của Docker

### docker image build
[:arrow_up: Mục lục](#mục-lục)

Dùng để build dockerfile (Tạo docker image từ Dockerfile).

Cú pháp:

```
docker image build -t <tag> <context>
```

Docker sử dụng Dockerfile và **build context** để build image. Build context là môi trường cung cấp file cần thiết để docker build. Có thể là local filesystem, git repository,... Câu lệnh build có thể truy cập vào bất cứ file nào nằm trong context

_Ví dụ:_ Build dockerfile có tên là `Dockerfile` ta thực hiện câu lệnh sau. `demo` là tên docker image, dấu `.` nghĩa là build tại vị trí hiện tại là thư mục demo

Cấu trúc thư mục:

```
demo
├── demo
└── Dockerfile
```

File `Dockerfile`:

```dockerfile
FROM ubuntu:latest
RUN apt update -y && apt update -y
COPY . .
CMD ["tail", "-f", "/dev/null"]
```

Thực hiện câu lệnh để build docker image:

```
docker image build -t demo -f Dockerfile .
```

Sau khi hoàn thành ta có thể thực hiện 

```
docker container run --name demo -it demo bash
```

Xong đó sử dụng câu lệnh `ls` để xem kết quả. Tất cả file trong thư mục demo đều có trong container

Nếu file `demo` bị thay đổi thì chỉ chạy lại layer tại `COPY . .` xuống các layer phía dưới tránh được mất thời gian build lại từ đầu

**Cách 2**: Dùng small base image

Small base image ở đấy là các image có kích thước nhỏ (Tham khảo tại DockerHub). Điển hình là `alpine`

**Cách 3**: Dùng `.dockerignore` file để giảm đi kích thước của docker image

_Ví dụ:_ Ta có cấu trúc thư mục sau

```
demo
├── useless_folder
├── Dockerfile
└── .dockerignore
```

Bây giờ ta muốn bỏ qua thư mục `useless_folder` trong quá trình build ta làm như sau:

```dockerignore
/useless_folder
```

**Cách 4:** Sử dụng Multi-stage build

_Ví dụ minh họa:_

```dockerfile
# syntax=docker/dockerfile:1
FROM golang:1.21
WORKDIR /src
COPY <<EOF ./main.go
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
EOF
RUN go build -o /bin/hello ./main.go

FROM scratch
COPY --from=0 /bin/hello /bin/hello
CMD ["/bin/hello"]
```

Hiểu đơn giản như sau, ta có Stage 1 là 

```dockerfile
# syntax=docker/dockerfile:1
FROM golang:1.21
WORKDIR /src
COPY <<EOF ./main.go
package main

import "fmt"

func main() {
  fmt.Println("hello, world")
}
EOF
RUN go build -o /bin/hello ./main.go
```

Stage 2 sẽ là:

```dockerfile
FROM scratch
COPY --from=0 /bin/hello /bin/hello
CMD ["/bin/hello"]
```

Thì cách hoạt động là state 1 sẽ là input cho state 2 đóng gói thành container

<img src="https://github.com/user-attachments/assets/9c4173cd-6fcb-46ab-ac21-4ea4d7cf65da" width="500px" >

### 3. Tạo Docker image từ Docker Container
[:arrow_up: Mục lục](#mục-lục)

Cách để tạo Docker image từ Docker Container ta sẽ biến writable layer thành read only layer

### docker container commit
[:arrow_up: Mục lục](#mục-lục)

Cú pháp: 

```
docker container commit <container> <image>
```

<img src="https://github.com/user-attachments/assets/719873aa-cb4e-4e11-9581-19a35ac88541" width="500px" >

_Ví dụ:_

```
docker container commit my-container new-image
```

### 4. Phân phối, chia sẻ Docker image bằng Docker registry
[:arrow_up: Mục lục](#mục-lục)

Để có thể làm điều đó ta sẽ dùng lệnh pull/push phân phối images lên Docker registry. Ta cần đăng nhập vào 
https://hub.docker.com/, hoặc sử dụng Docker Desktop để đăng nhập

<img src="https://github.com/user-attachments/assets/c7de7d35-4bf6-43d6-9d1c-5209786ee4b7" width="500px" >

Sau đó sử dụng câu lệnh sau để đăng nhập

```
docker login
```

- [!NOTE]
- **Trước khi đẩy image của chúng ta lên docker hub, ta cần đổi tên image:tag thành [account_name]/image:tag**

### docker image tag
[:arrow_up: Mục lục](#mục-lục)

Dùng để thay đổi tên, tag của docker image

Cú pháp:

```
docker image tag <source>:<tag> <target>:<tag>
```

_Ví dụ:_

<img src="https://github.com/user-attachments/assets/54086f13-e08d-4658-815e-f8304be9c4d1" width="300px" >

Ta sử dụng `docker image tag` trong đó `cungvanthang` chính là tên account của ta

```
docker image tag redis:latest cungvanthang/redis:latest
```

<img src="https://github.com/user-attachments/assets/5659488c-4197-4276-880f-50421c97fd90" width="300px" >

Tiếp theo ta sử dụng câu lệnh `docker image push`

```
docker image push cungvanthang/redis
```

<img src="https://github.com/user-attachments/assets/4f3581f2-2d66-4a1c-a9b3-9506e2166406" width="300px" >

_Kết quả:_

<img src="https://github.com/user-attachments/assets/20269c89-6c4c-4081-b34a-c231c7524974" width="300px" >

### 5. Phân phối, chia sẻ Docker image bằng file TAR
[:arrow_up: Mục lục](#mục-lục)

Để có thể làm điều đó ta sẽ convert image thành file TAR

### docker image save
[:arrow_up: Mục lục](#mục-lục)

Cú pháp:

```
docker image save [image or name_account/image] -o file.taz
```

_Ví dụ:_ Trong đó `redis` là tên image, `redis.taz` là tên file ta muốn đặt tên

```
docker image save redis -o redis.taz
```

<img src="https://github.com/user-attachments/assets/0b5ab84b-dc99-46f0-b13a-36f24dbc67c8" width="500px" >

Ta có thể thấy được file `redis.taz` đã được convert từ image. Bây giờ chúng ta có thể gửi file này cho bạn bè hoặc người khác

Dĩ nhiên, bạn bè hoặc người khác để có thể load được file `redis.taz` đó thì sẽ sử dụng câu lệnh sau:

### docker image load
[:arrow_up: Mục lục](#mục-lục)

Cú pháp:

```
docker image load -i [name_file.taz]
```

_Ví dụ:_ Trong đó `redis.taz` chính là file `.taz` ta muốn load

```
docker load -i redis.taz 
```

<img src="https://github.com/user-attachments/assets/d6cd10e3-154d-40b5-9b76-a438f974aefd" width="500px" >

### 6. Bài tập
[:arrow_up: Mục lục](#mục-lục)

1. Đóng gói Docker image cho chương trình Java Spring Boot
2. Đóng gói Docker image cho chương trình Python Django
3. Đóng gói Docker image cho chương trình NodeJS

**Lời giải:**

#### 1. Đóng gói Docker image cho chương trình Java Spring Boot

Đầu tiên để có thể tạo ra 1 project cho chương trình Java Spring Boot, ta lên [https://start.spring.io/](https://start.spring.io/) để cài đặt các dependencies và chọn **Generate** để tải xuống

<img src="https://github.com/user-attachments/assets/49d34d3d-bc6b-4c2c-a03f-05068a961bf2" width="500px" >

Chúng ta sẽ được project như sau:

<img src="https://github.com/user-attachments/assets/d27fe140-e806-47cb-a012-2f81ad5d1138" width="500px" >

Chúng ta sẽ bắt đầu với dự án đầu tiên cho project này rồi sẽ đóng gói nó lại...

Bắt đầu chương trình đầu tiên tại [https://spring.io/guides/gs/spring-boot](https://spring.io/guides/gs/spring-boot). Bằng cách tạo chương trình Hello World đầu tiên

<img src="https://github.com/user-attachments/assets/a299c38b-d678-4612-85f8-19cf73442b63" width="500px" >

Trước tiên ta sẽ chạy chương trình tại localhost trước khi đóng gói 

Sử dụng câu lệnh tại thư mục demo

```
mvn clean package
```

<img src="https://github.com/user-attachments/assets/c708a4c0-819e-4ad7-ac5e-5f435d290b79" width="500px" >

Tiếp theo sử dụng câu lệnh 

```
java -jar target/demo-0.0.1-SNAPSHOT.jar
```

<img src="https://github.com/user-attachments/assets/8b067645-644f-4cc4-88ef-8371c7d63062" width="500px" >


**Kết quả:**

![image](https://github.com/user-attachments/assets/9c765449-2f94-4b39-8570-5f1de65d2fe3)

**Đóng gói**

Để có thể đóng gói, chúng ta cần tạo `Dockerfile` với nội dung như sau:

```dockerfile
FROM maven:3.9.4-eclipse-temurin-17-alpine AS build
WORKDIR /app
COPY . .
RUN mvn clean package

FROM openjdk:17-alpine
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar app.jar
CMD ["java", "-jar", "app.jar"]
```

Đồng thời tạo thêm file `.dockerignore` để loại bỏ thư mục mà ta không muốn đóng gói. Ở đây tôi không muốn đóng gói thư mục `target`

```
./target
```

Thực hiện câu lệnh để tiến hành đóng gói

```
docker image build -t springboot-demo .
```

**Kết quả:**

<img src="https://github.com/user-attachments/assets/6fff7a14-0f28-4fa1-92ca-f676c71a238c" width="500px" >

## IV. Docker volume
[:arrow_up: Mục lục](#mục-lục)

### 1. Persistent Data
[:arrow_up: Mục lục](#mục-lục)

**Tại sao cần Persistent Data?**

> **Container được thiết kế rất nhỏ gọn để dễ dàng thay thế**

Chính vì vậy, trong trường hợp container đó bị stop (chương trình trong container đó bị lỗi hoặc gặp vấn đề nào đó) thì sẽ tạo mới và thay thế container đó. Tuy nhiên, dữ liệu trong container hầu như là volatile (nghĩa là khi container bị chết đi thay thế bằng container mới khác thì đồng thời dữ liệu đó sẽ bị mất)

<img src="https://github.com/user-attachments/assets/aff8f6d6-6671-40ba-990a-ee29fa6b7803" width="500px" >

Đó là lý do chúng ta cần Persistent Data để **tách biệt lưu trữ dữ liệu ra khỏi container**

**Đầu tiên cần hiểu cách cơ chế tạo mới, thay thế container**

<img src="https://github.com/user-attachments/assets/dc51d43e-b046-4dc3-bb26-8695f8f4f21b" width="500px" >

Cấu tạo của container gồm có các layer, trong đó: 
- layer màu đỏ là layer image (read only)
- layer màu xanh là writable

> **Khi mà container được tạo mới và thay thế thì nó chỉ thay thế writable và giữ nguyên layer image**

> [!NOTE]
> **2 cách tạo Persistent Data**
> - Bind Mount: Tạo kết nối giữa thư mục trong container với thư mục trong host
> - Volume

### 2. Bind Mount
[:arrow_up: Mục lục](#mục-lục)

> **Bind Mount dựa trên một khái niệm gọi là mouting**

Mouting: gắn một device A vào bên trong filesystem của một device B khác. Mục đích là từ device B có thể nhìn thấy, truy cập dữ liệu bên trong device A

_Ví dụ:_

Cắm USB (device A) vào trong máy tính (device B) thì mục đích ở đây là trong laptop ta có thể nhìn được vào file trong device A. Trong trường hợp này là thư mục **/my-usb** nằm trong filesystem của device B nối filesystem của device A (nghĩa là có thể nhìn thấy được dữ liệu của usb trong file my-usb trên laptop)

<img src="https://github.com/user-attachments/assets/7b9e6b66-bc22-46e1-9fcc-1d133dc8dfcc" width="500px" >

**Vậy trong container thì hoạt động như nào?**

<img src="https://github.com/user-attachments/assets/1f5f483a-e58e-4a78-8af9-8db1be710bf3" width="500px" >

Host là laptop của ta chứa các filesystem, Container cũng chứa các filesystem của riêng nó. 

Bản chất của Bind Mount là ta tạo ra một thư mục **../khalid/nginx** chứa data trên host (laptop) được lưu trên chính hard drive (ổ cứng của laptop) sau đó sẽ mouting với thư mục **/app** của container. 

Kết quả là toàn bộ dữ liệu trên thư mục **../khalid/nginx** sẽ nằm bên trong thư mục **/app** của container

**Cách tạo bind mount**

```
docker container run -v /home/khalid/nginx:/app nginx:latest 
```

- `/home/khalid/nginx`: Thư mục trên máy host
- `/app`: Thư mục trên container
- `$(pwd)`: thay thế cho đường dẫn đến thư mục hiện tại trên máy host

_Chú ý:_ Nếu thư mục chưa tồn tại thì Docker sẽ tự động tạo thư mục đó

### 3. Ví dụ về Bind Mount
[:arrow_up: Mục lục](#mục-lục)

Đây là thư mục dự án code của ta

![image](https://github.com/user-attachments/assets/c80f2cbb-1d8d-47cc-8066-ce67e092183a)

Bây giờ ta sẽ thực hiện tạo 1 container và mount với **thư mục app** trên container

```
docker run --name docker-ubuntu -d -v $(pwd)/Docker:/app ubuntu sleep infinity
```

![image](https://github.com/user-attachments/assets/15442380-7e46-4ad0-944e-471967e5047a)

Bây giờ, ta sẽ đi vào trong container `docker-ubuntu` để xem có tồn tại **thư mục dự án code** của ta hay không bằng cách

```
docker container exec -it docker-ubuntu bash
```

![image](https://github.com/user-attachments/assets/4972c0f9-dd10-4af3-b789-c2de0698956f)

Như ta có thể thấy **thư mục dự án code** của ta đã được **mount** với **thư mục app** trong container có tên là `docker-ubuntu`

- **Test 1: Thay đổi dữ liệu trên máy host** 

Như chúng ta được biết thì nếu như có sự thay đổi trong **thư mục dự án code** của ta thì ta sẽ ngay lập tức thấy được sự thay đổi trên **thư mục app** trong container có tên là `docker-ubuntu`

![image](https://github.com/user-attachments/assets/f7d4b78e-b064-452b-8cb6-7e2446dd92fc)

Câu lệnh bên trái là phía host, câu lệnh bên phải là phía container. Ta có thể thấy sự thay đổi ở máy host thì trong container cũng được cập nhật giống như vậy

- **Test 2: Container bị stop hoặc bị die**

Trong trường hợp container đó bị stop hoặc bị die thì dữ liệu sẽ không bị xóa đi, mà vẫn còn tồn tại trong máy host (Máy tính của ta)

![image](https://github.com/user-attachments/assets/10e3b97a-c8af-490c-8df7-c70af7826a21)

Như ví dụ hình ảnh trên ta thực hiện xóa container có tên là docker-ubuntu, xong đó thực hiện kiểm tra lại dữ liệu trên máy host

- **Test 3: Thay đổi dữ liệu trên container**

Nếu ta vẫn sử dụng câu lệnh như ở phía trên để tạo ra container có volume

```
docker run --name docker-ubuntu -d -v $(pwd)/Docker:/app ubuntu sleep infinity
```

![image](https://github.com/user-attachments/assets/0b4c75e1-e3bf-4c0b-b05f-efd7c35ce119)

Như trên hình ảnh, ta có thể thấy ban đầu kiểm tra data trong file `newtext` là `content from host`, nhưng trên container đã có quyền thay đổi dữ liệu đó thành `content from container`. Ta kiểm tra trên máy host thì cũng thấy điều đó.

> [!NOTE]
> **Vậy thì làm thế nào để dữ liệu trên máy host không bị thay đổi? Nghĩa là ta muốn container chỉ có thể đọc dữ liệu được mout từ máy host thôi**
> Như chúng ta biết khi khởi tạo mới 1 container rất có thể dữ liệu mới trong container này sẽ ghi đè lại dữ liệu cũ trên máy host. 

- **Test 4: Không cho phép thay đổi dữ liệu trên container**

Để cấm container có thể thay đổi dữ liệu, thì ta sử dụng thêm 1 options `:ro` vào trong câu lệnh

```
docker run --name docker-ubuntu -d -v $(pwd)/Docker:/app:ro ubuntu sleep infinity
```

![image](https://github.com/user-attachments/assets/84a6d61c-8a25-43f0-8ca0-46363637a91f)

Như trên hình ảnh, ta có thể thấy container không thể thay đổi dữ liệu, mà chỉ có thể đọc (read-only)

- **Kết luận**

![image](https://github.com/user-attachments/assets/f468273a-8135-48a7-8eab-9dce5ae5148a)

Như hình ảnh trên cho ta thấy, nếu có nhiều container bind mount tới cùng 1 phân vùng dữ liệu trên máy host thì sự thay đổi dữ liệu sẽ được lan tỏa ra các container khác. Nghĩa là tất cả các container có thế nhận thấy được sự thay đổi dữ liệu đó

> [!NOTE]
> - **Bind mount về cơ bản là việc dữ liệu trên máy host được mount đến thư mục container**
> - **Khi khởi tạo container, nếu thư mục trong container có dữ liệu, nó sẽ bị overwrite bởi dữ liệu của máy host**
> - **Sử dụng read-only để tránh việc container thay đổi nội dung trên host**

### 4. Volume là gì
[:arrow_up: Mục lục](#mục-lục)

Volume là gì:

- **Mục đích tương tự như Bind Mount: Nó lưu trữ và bảo vệ dữ liệu container khi container đó bị xóa đi**
- **Docker hoàn toàn quản lý volume**
- **Cách hoạt động:** Gần giống với bind mount nhưng về mouting thì theo chiều ngược lại. Với volume thì ta **lựa chọn ra 1 thư mục trong container** rồi ánh xạ một vùng nhớ rồi mouting tới 1 thư mục nào đó trên máy host

![image](https://github.com/user-attachments/assets/15ce4070-1bd1-49f7-9901-aad5747ac1b3)


- **Cách tạo volume:**

![image](https://github.com/user-attachments/assets/865b8152-5738-4b11-83ff-ca5823a3ec1a)

```
docker container run -v ubuntu-data:/app ubuntu:latest
```

Trong đó:
 
- `ubuntu-data`: Tên của volume (Có thể có hoặc không, nếu không đặt tên thì docker sẽ tự tạo giúp chúng ta 1 anonymous volume với name là 1 chuỗi unique)
- `/app`: Tên thư mục của container
- Tên volume có thể lược bỏ nếu volume được chỉ định trong Dockerfile

### 5. Ví dụ về Volume
[:arrow_up: Mục lục](#mục-lục)

**Test 1: Tạo volume có tên**

Tạo một container có tên là `cvt-nginx` và có volume là `nginx-data` bằng câu lệnh sau

```
docker container run --name cvt-nginx -p 81:80 -v nginx-data:/usr/share/html/nginx -d nginx
```

![image](https://github.com/user-attachments/assets/3df830bc-bc81-42de-b80d-a0f971df2160)

Câu lệnh để liệt kê các volume tồn tại trong docker

```
docker volume ls
```

Câu lệnh để xem thông tin chi tiết của volume

```
docker volume inspect [volume_name]
```

**Test 2: Tạo volume không có tên**

Tạo một container có tên là `cvt-nginx` và có volume nhưng không đặt tên bằng câu lệnh sau:

```
docker container run --name cvt-nginx -p 81:80 -v /usr/share/html/nginx -d nginx
```

![image](https://github.com/user-attachments/assets/b518d396-caeb-4246-83ab-524f6c02f818)

Như ta có thể thấy volume này được docker tự động đặt tên cho là một chuỗi unique, việc không đặt tên này sẽ khó cho việc quản lý volume, nên đặt tên cho volume để dễ quản lý hơn

Để xóa volume trong docker volume ta sử dụng câu lệnh sau:

```
docker volume rm [volume_name]
```

Khi ta xóa container thì volume của container đó vẫn tồn tại, việc cần làm là chúng ta cần phải xóa 2 lần: xóa container xong xóa volume. Như vậy chưa tối ưu lắm, người ta có thể sử dụng `--rm` trong lúc khởi tạo container. Khi mà container bị xóa đi thì volume đó sẽ đồng thời bị xóa đi theo

```
docker container run --name cvt-nginx -p 81:80 --rm -v /usr/share/html/nginx -d nginx
```

**Test 3: Tạo volume không cần option `-v`**

_Ví dụ:_ Tạo một docker cho database mysql:8.0

```
docker container run --name cvt-mysql -e MYSQL_ROOT_PASSWORD=password123 -e MYSQL_DATABASE=db_example -d mysql:8.0
```

![image](https://github.com/user-attachments/assets/54bb9e35-1222-48c5-b13d-12166cba7590)

Chúng ta có thể thấy ta tạo docker volume không cần đến option `-v`. Lí do tại sao lại như vậy?. **Trong quá trình docker image mysql:8.0 này thì Dockerfile của nó đã chỉ định volume ở trong đó**. Để kiểm tra thì chúng ta có thể lên DockerHub tìm tới phiên bản **mysql:8.0** có thể thấy trong Dockerfile đã chỉ định volume ở trong đó rồi.

![image](https://github.com/user-attachments/assets/644a2b85-75a0-4489-97e9-73eac1db292c)

> [!NOTE]
> **Vậy chúng ta có 2 cách để tạo ra docker volume:**
> - **Tạo trực tiếp bằng câu lệnh với option `-v`**
> - **Tạo gián tiếp bằng cách chỉ định volume trong Dockerfile, không cần sử dụng option `-v`**

**Câu hỏi làm sao để biết được docker image có volume ở bên trong không và volume đó nằm ở thư mục nào?**

Chúng ta sử dụng câu lệnh sau:

```
docker image inspect [image_name] | grep -A 2 Volume
```

![image](https://github.com/user-attachments/assets/ba070487-87e6-4e2b-bdba-1ebb817031e2)

![image](https://github.com/user-attachments/assets/84306fea-aafc-4292-97c7-64ce3cbeb94d)

Như chúng ta có thể thấy **mysql có volume**, nginx thì không có volume (hiển thị là null)

**Tương tự ta cũng có thể kiếm tra xem container bất kỳ có volume bên trong không?**

Chúng ta sử dụng câu lệnh sau:

```
docker container inspect [container_name] | grep -A 3 Mounts
```

![image](https://github.com/user-attachments/assets/b420df54-8d85-418c-9cfd-6f392d4ee334)


**Ví dụ khác**

Ta sẽ tạo ra 1 Dockerfile có nội dung như sau

```Dockerfile
FROM nginx

VOLUME [ "/data"]
VOLUME [ "/data2"]
VOLUME [ "/data3"]

EXPOSE 80
```

Dùng để tạo ra 1 image có 3 volume là `data`, `data2`, `data3`

![image](https://github.com/user-attachments/assets/f831ad15-a212-4993-ac49-32a9e2dad1c0)

Sau đó ta sẽ thực hiện tạo ra container bằng câu lệnh

```bash
docker container run --name cvt-nginx -p 81:80 -d -v data1:/data -v data2:/data2 -v data3:/data3 demo-nginx
```

![image](https://github.com/user-attachments/assets/172d76c3-d50a-47d3-ad38-dfc48e4cbed5)

Như chúng ta có thể thấy giờ container này có 3 volume là `data`, `data2`, `data3`

Bây giờ thực hiện tạo ra 1 container khác mount với volume `data`

```
docker container run --name cvt-nginx2 -p 82:80 -d -v data1:/data nginx
```

![image](https://github.com/user-attachments/assets/06bf345e-0164-4d6b-9bed-6dd4356e488e)

![image](https://github.com/user-attachments/assets/060113dc-c9a1-45bf-ae0e-b56e14d2444f)

Như vậy chúng ta có thể hiểu rằng 2 container `cvt-nginx` và `cvt-nginx2` đang sử dụng chung volume `data`, chúng có thể chia sẻ dữ liệu với nhau

![image](https://github.com/user-attachments/assets/0e25c09d-ac7e-4898-b455-cce26113a088)

**Câu hỏi: Bây giờ ta không biết được volume của container trước nằm ở đâu, ta muốn tạo 1 container mới có tất cả volume của container trước đó thì sao?**

Docker đã cung cấp sẵn cho chúng ta 1 option `--volumes-from`

![image](https://github.com/user-attachments/assets/f9d9fbd9-fd09-4fe7-9f0c-075bf87904f5)

Như vậy thì container `cvt-nginx3` sẽ dùng 3 volume `data`, `data2`, `data3` của `cvt-nginx`

![image](https://github.com/user-attachments/assets/d2c78139-8258-4628-bffe-12400d3645c8)

### 6. Bind mount vs Volume
[:arrow_up: Mục lục](#mục-lục)

| Bind mount | Volume |
| :---: | :---: |
| Phụ thuộc vào filesystem của host | Không phụ thuộc vào filesystem của host |
| Không có driver | Có driver, cho phép lưu data lên cloud, remote host | 
| Ta lựa chọn thư mục trên host để mount | Docker lựa chọn thư mục trên máy host | 
| Bind mount được chỉ định khi run command | Volume có thể được chỉ định khi run command hoặc trong Dockerfile |
| Dữ liệu trong container có thể bị ghi đè khi khởi tạo | Dữ liệu trong container không bị ghi đè khi khởi tạo |

Đối với Bind mount: **Dữ liệu trong container có thể bị ghi đè khi khởi tạo** là một điều không tốt đối với container database. Ví dụ như ta tạo 1 container mysql nếu mà khi bind mount thì data trong mysql có thể bị ghi đè sẽ dẫn đến tính trạng container đó không thể hoạt động được. Do mysql cần có data ban đầu để có thể khởi tạo, trong trường hợp này bắt buộc phải sử dụng volume

### 7. Utility containers
[:arrow_up: Mục lục](#mục-lục)

- Là các container môi trường, giúp ta chạy chương trình (programs), thử nghiệm mô hình
- Biển Docker trở thành công cụ vô cùng hiệu quả cho mọi bài toán test app, triển khai thử môi trường

**Hiểu đơn giản là:** Bình thường để chạy được chương trình ta cần cài thư viện (cài môi trường) trực tiếp trên máy host (máy tính của ta). Nhưng nếu sử dụng Docker thì ta không cần phải cài trực tiếp vào máy host nữa, mà ta chỉ cần chạy chương trình đó thông qua Docker.

_Ví dụ:_ Bây giờ tôi muốn chạy chương trình nodejs này. Hiện tại chưa cài đặt thư viện `express`. Tôi muốn chạy chương trình này sử dụng docker thay vì phải cài trực tiếp trên máy host

![image](https://github.com/user-attachments/assets/5bdecb45-a07a-4744-8201-a95cfcde51f0)

Thực hiện tạo Dockerfile để cấu hình phiên bản Nodejs

```
FROM node:latest
VOLUME ["/app"]
ENTRYPOINT ["tail", "-f", "/dev/null"]
```

![image](https://github.com/user-attachments/assets/2c02b1a0-ea99-4703-aed2-b6db4b41e066)

Sau đó ta thực hiện tạo ra container sử dụng bind mount để mouting thư mục code `cvt-node` trên máy host với thư mục `app` trên container

![image](https://github.com/user-attachments/assets/ad15d081-f5fc-4b7b-b73a-9e2759196b99)

Trong container ta thực hiện cài đặt `npm install express` như bình thường 

![image](https://github.com/user-attachments/assets/4d3b4e8f-27ea-4f45-bb11-622caad157b8)

Sau đó thực hiện chạy `index.js`

![image](https://github.com/user-attachments/assets/f40daea8-bb42-496c-93cd-fcefb7a44e5c)

## IV. Docker network
[:arrow_up: Mục lục](#mục-lục)

### 1. Các khái niệm cơ bản
[:arrow_up: Mục lục](#mục-lục)

- Networking là tập hợp các máy tính và các kết nối cho phép các máy tính giao tiếp với nhau
- Trong docker, virtual network cho phép container tương tác với thế giới bên ngoài
- NAT (Network Address Translation) là quá trình chuyển đổi địa chỉ IP thường là từ Private IP sang Public IP

Công việc NAT thường được diễn ra ở các thiết bị ví dụ như router

Dưới đây là mô phỏng mô hình mạng cơ bản

![image](https://github.com/user-attachments/assets/523525d1-4f79-49c2-bf4e-bef40c0bf5c6)

Còn dưới đây là mô phỏng mô hình mạng trong docker

![image](https://github.com/user-attachments/assets/2ded91dc-121b-4463-8da5-287313d340eb)

NAT ở đây chính là tường lửa ở trên máy tính, thực chất đơn giản là ip table (các quy tắc trong ip table để quy định làm sao các luồng traffic nó có đi được vào trong container này hay không.

_Ví dụ 1:_ Thông thường chúng ta chạy câu lệnh đơn giản như này để chạy contaienr

```bash
docker container run -p 80:81 nginx
```

![image](https://github.com/user-attachments/assets/4fa46500-77e4-4692-b909-e9fa1bf89886)

Thực chất thì docker đã tạo cho chúng ta sẵn 1 mạng network có tên là **brigde network**. Khi mà chúng ta tạo container mà không chỉ định mạng thì mặc định docker sẽ khởi tạo container đó sử dụng mạng **brigde network** này

![image](https://github.com/user-attachments/assets/821e0867-00a1-49b2-b82e-ae4bdafb36c9)

Khi mà container nginx này được tạo ra, thì nó sẽ được cấp 1 địa chỉ ip thuộc dải địa chỉ ip của mạng **brigde network** này. `-p 80:81` ở đây có nghĩa là publish cho phép tất cả traffic vào bên trong cổng 80 trên máy tính rồi nó chuyển đến cổng 80 trên container.

> [!NOTE]
> - **Default network là bridge network**
> - **Mặc định, khi tạo container, tất cả port sẽ được private (không public ra ngoài)**
> - **-p (publish) cho phép bind port của container với port của máy host**

**Liệu chúng ta có thể tạo ra network riêng được không?**

Cú pháp tạo ra network riêng:

```bash
docker container run -p 81:80 --network custom -d [image_name]
```

![image](https://github.com/user-attachments/assets/3271b0b9-261b-4d24-bbfb-6835d79035cd)

Chú ý: Không thể sử dụng 2 chương trình trên cùng 1 cổng

_Ví dụ 2:_ Thử tạo nghiệm tạo docker network bằng câu lệnh

![image](https://github.com/user-attachments/assets/afe13110-a37f-4b07-91a5-72a5861d5c9f)

Đầu tiên sử dụng câu lệnh tạo docker như bình thường

```bash
docker container run --name cvt-nginx -p 80:80 -d nginx
```

![image](https://github.com/user-attachments/assets/8273a34b-1336-4d0a-83c1-f4b5ad5c56fa)

Xong đó kiểm tra bằng cách câu lệnh sau

```bash
docker network ls
docker network inspect [network_name]
```

Chúng ta có thể thấy địa chỉ subnet của mạng bridge network là **172.17.0.0/16** với gateway **172.17.0.1**, container `cvt-nginx` có địa chỉ network là **172.17.0.2/16** thuộc dải địa chỉ của mạng bridge network

Để tạo ra 1 network mới, ta sử dụng câu lệnh

```bash
docker network create [network_name]
```

![image](https://github.com/user-attachments/assets/13a2bb35-06cb-4bb0-b270-937f232a0df3)

### 2. Bridge và custom network
[:arrow_up: Mục lục](#mục-lục)

Để có thể hiểu rõ hơn về phần này, ta có ví dụ sau: Ví dụ này ta tạo ra 2 con container mysql thuộc 2 mạng khác nhau là brigde network và custom network. Xong đó ta sẽ thực hiện ping giữa 2 container nginx và mysql

![image](https://github.com/user-attachments/assets/d6380760-f230-46b9-9788-47b9af9d3716)

Thực hiện 2 lệnh sau để tạo ra 2 container mysql cho 2 mạng bridge và custom network

```bash
docker container run --name cvt-mysql -e MYSQL_ROOT_PASSWORD=password123 -e MYSQL_DATABASE=db_example -d mysql:8.0
docker container run --name cvt-mysql-custom -e MYSQL_ROOT_PASSWORD=password123 -e MYSQL_DATABASE=db_example -d --network custom mysql:8.0
```

![image](https://github.com/user-attachments/assets/9731d328-8c95-4d02-83d8-2c33d94fd9d0)

| Bridge network | Custom network |
| :--: | :--: |
| ![image](https://github.com/user-attachments/assets/ef71c38a-007a-430e-b6fb-144d3227ed03) | ![image](https://github.com/user-attachments/assets/c17a1b2c-89a8-43d5-85e5-fc9f2f863ff0) |

Bây giờ ta sẽ đi vào trong container `cvt-nginx` bằng `docker container exec -it cvt-nginx bash`. Xong đó chúng ta cần cài **ping** như sau

```bash
apt update
apt upgrade
apt install iputils-ping
```

![image](https://github.com/user-attachments/assets/16171d14-5224-442b-a7af-6fd29fadae08)

![image](https://github.com/user-attachments/assets/494e6c23-5a01-4543-ad25-14a21103d08f)

Để có thể ping được thì sử dụng `ping [ip]`

_Ví dụ:_ Ping từ container **cvt-nginx** đến **cvt-mysql**

```
ping 172.17.0.3
```

![image](https://github.com/user-attachments/assets/1ce7d30d-a317-4763-a648-1081d70567f9)

Như vậy kết nối từ **cvt-nginx** đến **cvt-mysql** đã được thông

**Vậy kết nối từ **cvt-mysql** đến **cvt-nginx** thì sao**

Làm tương tự ta sẽ đi vào trong container `cvt-mysql` bằng `docker container exec -it cvt-mysql bash`. **Chú ý rằng mysql không sử dụng `apt`, `yum` mà sử dụng `microdnf`**

