## Docker

<details>
  <summary>Danh sách lệnh</summary>

| STT | Lệnh | Tác dụng |
| :--: | :--: | :--: |
| 1 | | |
  
</details>

## I. Cách Docker hoạt động
### 1. Kiến trúc Docker

Kiến trúc Docker gồm: **docker client**, **docker host**, **docker registry**

- Docker client: **nhận lệnh từ user** (Ví dụ: `docker run`, `docker pull`... và gửi đến host)
- Docker host: xử lý lệnh, **quản lý docker object** (container, image, volume,...) kết nối với docker registry để pull/push các docker image
- Docker registry: **lưu trữ**, phân phối các docker image. VD: DockerHub

#### docker info

Show ra các thông tin của docker client và docker host

![image](https://github.com/user-attachments/assets/a1ed08ae-de05-4c42-857c-0512e628f571)

#### whereis 

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

Docker container là môi trường chạy độc lập cho application

Docker image là file template để tạo ra docker container

Một docker image có thể tạo ra nhiều docker container, nhưng một docker container chỉ có thể được tạo ra một docker image.

