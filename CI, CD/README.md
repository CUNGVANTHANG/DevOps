## CI/CD

## Github Actions

**Bước 1:** Sau khi chúng ta đẩy code lên github. Ta vào phần Actions

<image src="https://github.com/user-attachments/assets/bf3fab8e-eeb3-4867-8113-2bbdb44e8883" width="400px" >

**Bước 2:** Ta cần setup **Actions**

<image src="https://github.com/user-attachments/assets/75f4e485-a93d-44e7-ab5a-cbc417b286aa" width="400px" >

Bởi vì dự án của chúng ta sử dụng Node.js

![image](https://github.com/user-attachments/assets/0110645b-6ea2-4a66-9224-6545017130e5)

Chọn **Configure** để cấu hình `node.js.yml`

```yml

name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x, 18.x]
        # See supported Node.js release schedule at https://nodejs.org/en/about/releases/

    steps:
    - uses: actions/checkout@v4
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: 'npm'
    - run: npm ci
    - run: npm run build --if-present
    - run: npm test

```

Giải thích:

**1. Phần tên và trigger:**

```yaml
name: Node.js CI

on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]
```

- `name`: Đặt tên workflow là "Node.js CI".
- `on`: Workflow sẽ chạy mỗi lần có sự kiện: `push` code lên nhánh main, `pull_request` vào nhánh main

**2. Định nghĩa jobs:** Định nghĩa các công việc sẽ thực hiện.

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
```

`runs-on`: ubuntu-latest: Job này chạy trên hệ điều hành Ubuntu phiên bản mới nhất do GitHub cung cấp.

**3. Matrix strategy:** Workflow sẽ thực thi job nhiều lần, mỗi lần trên một phiên bản Node.js được liệt kê trong danh sách

```yaml
strategy:
  matrix:
    node-version: [16.x, 18.x]
```

**4. Các bước trong job:**

```yaml
steps:
  - uses: actions/checkout@v4
```

`actions/checkout`: Clone mã nguồn repository vào môi trường của GitHub Actions, phiên bản v4 là mới nhất của action này.

```yaml
  - name: Use Node.js ${{ matrix.node-version }}
    uses: actions/setup-node@v4
    with:
      node-version: ${{ matrix.node-version }}
      cache: 'npm'
```

- `actions/setup-node`: Cài đặt Node.js theo phiên bản tương ứng với mỗi giá trị của `matrix.node-version`.
- `cache: 'npm'`: Tính năng cache này lưu giữ lại thư viện npm đã cài đặt giúp lần chạy sau nhanh hơn.

```yaml
- run: npm ci
```

`npm ci`: Lệnh này cài đặt các dependency (thư viện) theo đúng `package-lock.json`. Nó xóa thư mục `node_modules` cũ trước khi cài mới, đảm bảo độ tin cậy và đồng nhất trong build.

```yaml
- run: npm run build --if-present
```

`npm run build --if-present`: Chạy lệnh build nếu script này có định nghĩa trong `package.json`. Nếu không có script `build` thì bỏ qua

```yaml
- run: npm test
```

`npm test`: Chạy test scripts (ví dụ unit tests, integration tests) đã định nghĩa trong file `package.json`

✅ **Kết quả workflow**:

Mỗi lần push code hoặc tạo PR vào nhánh chính, GitHub sẽ tự động chạy các bước:
- Kiểm tra mã nguồn (checkout).
- Cài đặt môi trường Node.js với cache.
- Cài dependencies theo package-lock.json.
- Build dự án (nếu có).
- Chạy các bài test trên nhiều phiên bản Node.js khác nhau.

**Bước 3:** Sau khi configure `node.js.yml` thì chúng ta sẽ commit

<img src="https://github.com/user-attachments/assets/1d0d29cf-4c6d-49e5-859c-fc54f2fc79ec" width="400px" >

Ví dụ: Ta đẩy code mới từ nhánh mới là `update` lên github

<img src="https://github.com/user-attachments/assets/a8e12759-d449-41dd-ba30-0f9a0fe82466" width="400px" >

Sau khi đẩy lên, ta chọn **Compare & pull request**

<img src="https://github.com/user-attachments/assets/10e30dbc-8cda-4dfa-9a76-792faf80e65b" width="400px" >

Xong chọn Create request mới

<img src="https://github.com/user-attachments/assets/290d6940-65e0-4148-9f9c-5fff04eeb2ec" width="400px" >

<br> 

<img src="https://github.com/user-attachments/assets/2ccb8068-03ea-48b0-aa23-bc7b5690acb3" width="400px" >

**Bước 4: Branch protection rules**

<img src="https://github.com/user-attachments/assets/e2cb447f-b13b-4321-96cd-d01c1386a8da" width="400px" >

Mình không muốn người ta push trực tiếp lên branch này của mình thì chọn các yêu cầu muốn

<img src="https://github.com/user-attachments/assets/df869d38-8844-44db-8a7f-738ac416e013" width="400px" >




