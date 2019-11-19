# My Hidden Place

## Introduction

마이히든플레이스는 본인만이 알고 있는 장소 혹은 잘 알려지지 않은 곳을 다른 사람들과 공유할 수 있는 웹 어플리케이션입니다.

<https://www.myhiddenplaces.com>

![Myhiddenplace](myhiddenplace.gif)

## Contents

* [Requirements](#Requirements)
* [Installation](#Installation)
* [Features](#Features)
* [Skills](#Skills)
* [Test](#Test)
* [Deployment & Continous Integration](#Deployment-&-Continous-Integration)
* [Project Control](#Project-Control)
* [Version Control](#Version-Control)
* [Challenges](#Challenges)
* [Things To Do](#Things-To-Do)
* [Sincere Thanks](#Sincere-Thanks)

## Installation

### Client

```javascript
git clone https://github.com/dldlfdn91/MYHIDDENPLACE_CLIENT.git
cd MYHIDDENPLACE_CLIENT
npm install
cd ..
npm start
```

### Set client environment

```javascript
.env 파일 생성
REACT_APP_GOOGLE_API_KEY = "Input your Google API Key here"
REACT_APP_SERVER_ADDRESS = "Input your server address"
```

### Server

```javascript
git clone https://github.com/dldlfdn91/MYHIDDENPLACE_SERVER.git
cd MYHIDDENPLACE_SERVER
npm install
npm start
```

### Set server environment

```javascript
.env 파일 생성
DATABASE_URI = "Input your MongoDB databse uri"
CLIENT_ADDRESS = "Input your client address"
COOKIE_SECRET = "Input your cookie secret"
AWS_ACCESS_KEY_ID = "Input your aws access key id"
AWS_SECRET_ACCESS_KEY = "Input your aws secret access key"
REGION = "Input your aws region"
AWS_S3_BUCKET_NAME = "Input your aws s3 bucket name"
```

## Features

* Passport 인증 로그인.
* 최근 업로드된 장소 확인 기능.
* 자신만의 장소 추가 기능(제목, 사진, 설명, 위치, 태그 등)
* Google API를 이용한 장소 검색 기능 및 장소 표시 기능.
* Amazon Web Services(AWS) S3를 이용한 사진 저장.
* 내가 업로드한 장소들 확인 및 삭제 기능.
* 장소 즐겨찾기 추가 및 삭제 기능.
* 즐겨찾기에 추가한 장소들 확인 기능.
* 태그를 기반으로 한 검색 기능.
* 각 장소별 댓글 쓰기 및 평점 부여 기능.

## Skills

### Client-side

* ES2015+
* React
* React Redux
* React Router
* Sass

### Server-side

* Node.js
* Express
* ES2015+
* Passport.js
* MongoDB
* Atlas
* Mongoose
* AWS S3

## Test

### Client test

* Unit test를 위한 Jest와 Component 테스트를 위한 Enzyme 사용.

```javascript
npm test
```

### Server test

* Router 테스트를 위한 mocha, chai 사용.

```javascript
npm test
```

## Deployment & Continuous Integration

### Client deployment

* Netlify CI를 통한 배포 자동화.

### Server deployment

* AWS Elastic beanstalk을 통한 서비스 배포.
* Circle CI를 통한 배포 자동화.

## Version Control

* Version control을 위한 git 사용.
* Client, Server의 독립적인 관리를 위한 Git Repository 구분.

## Other tools

* Trello를 이용한 task 관리.
* Lucidchart를 이용한 schema design.

## Challenges

* 로그인 기능 구현 시 Passport.js를 이용해 구현하는데 서버에서 deserialization이 실행되지 않아 Session에 유저 정보가 저장되지 않는 오류가 발생했습니다. 처음에 정확한 오류의 원인을 알 수 없어 해결하는데 생각보다 시간이 많이 걸렸습니다. 하지만 오류를 해결하려 많은 자료를 찾아 본 덕분에 클라이언트와 서버간의 통신에 대해 더 공부할 수 있었고 cors에 대해서도 더 잘 알 수 있게 되었다.

* 회원가입, 로그인, 즐겨찾기 등 작은 기능이라고 생각했던 것들이 오히려 더 세밀하게 신경써야 할 것이 많다는 것을 깨달았습니다.

## Things To Do

* 평점이 높은 순서대로 인기 있는 장소들 보여주는 기능.
* 페이지네이션 기능.
* 장소를 기반으로 한 검색 기능.
* 내가 올린 장소의 상세 내용 및 댓글 수정 기능.
* 장소 추가시 여러 이미지 업로드 기능.
* 장소 상세 페이지에서 Carousel image 기능.
* End-To-End Test 추가.

## Sincere Thanks

[Ken Huh](https://github.com/Ken123777) / Vanilla Coding
