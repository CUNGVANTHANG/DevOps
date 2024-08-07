## Docker

## Mục lục

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |
| 1 | `docker ps` | Liệt kê các container đang chạy |
| 2 | `docker pull` | Pull (download) một docker image |
| 3 | `docker version` | Show version của Docker client, Docker host |
| 4 | `docker info` | Show ra các thông tin của docker client và docker host |
| 5 | [`whereis`](#whereis) | Tìm location nơi chứa file binary của chương trình |
  
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

Container bản chất là một process trên hệ thống

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

_Chú ý:_

- `--publish` là tên đầy đủ của `-p` option
- 80:80 : bên trái là port của host, bên phải là port của container
- nginx: khi không có tag, mặc định sẽ là **latest**

<img src="https://github.com/user-attachments/assets/89ba96de-ea0a-4762-8ed3-45dae56e2375" width="300px">

<img src="https://github.com/user-attachments/assets/a30f9a3b-0d72-4bdc-9843-2b2ae9743fb1" width="300px">


