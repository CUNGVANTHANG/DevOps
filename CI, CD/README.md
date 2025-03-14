## CI/CD

## Github Actions

Sau khi chúng ta đẩy code lên github. Ta vào phần Actions

<image src="https://github.com/user-attachments/assets/bf3fab8e-eeb3-4867-8113-2bbdb44e8883" width="400px" >

Ta cần setup Actions

<image src="https://github.com/user-attachments/assets/75f4e485-a93d-44e7-ab5a-cbc417b286aa" width="400px" >

Bởi vì dự án của chúng ta sử dụng Node.js

![image](https://github.com/user-attachments/assets/0110645b-6ea2-4a66-9224-6545017130e5)

Chọn Configure để cấu hình `node.js.yml`

```yml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs

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

