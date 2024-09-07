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
| 6 | `docker container inspect [name_container] | Xem thông tin chi tiết của container |
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
