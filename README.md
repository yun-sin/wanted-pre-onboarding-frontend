# 원티드 프리온보딩 프론트엔드 인턴십 (6월) [사전과제](https://github.com/walking-sunset/selection-task)

<div align="right">
  2023.06.11
</div>

<br>

### 지원자 : 장윤신

<br>

### 기술 스택
 
> #### Development
> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black">
>
> #### Deploy
> <img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=black">

<br>

### 사용 라이브러리
 - styled-components
   - styled-reset 
 - react-router-dom
 - axios

<br>

### 프로젝트의 실행 방법 

- [배포 링크](https://sprightly-meerkat-3bb738.netlify.app)
- 테스트 계정

     |ID|PW|
     |:---:|:---:|
     |`jason@gmail.com`|`a123456789`|

<br>

## 스크린샷

|/signup|/signin|/todo|
|:---:|:---:|:---:|
|![image](https://github.com/yun-sin/wanted-pre-onboarding-frontend/assets/99275134/9b480289-3be3-4d23-870f-851c107ab2c3)|![image](https://github.com/yun-sin/wanted-pre-onboarding-frontend/assets/99275134/cf03f87f-7813-4440-8160-f204adc5f632)|![image](https://github.com/yun-sin/wanted-pre-onboarding-frontend/assets/99275134/9208909d-b63b-40d1-9ea0-d4f6b231ae01)|

<br>

## 문제해결

 - 문제점
   - gh-pages를 이용하여 배포 후 새로고침하면 404 에러 페이지 표출
   - "/" URL이 아닌 "/signup"등의 경로로 바로 접속할 경우 404 에러 페이지 표출 등
   - gh-pages는 SPA를 지원하지 않기 때문에 생긴 문제로 추정
 
 - 해결
   - Netlify를 사용하여 배포
   - public폴더에 `-redirects` 파일을 추가 
   - 참고 : [[React] 리액트 프로젝트 Netlify에 배포했을 때 새로고침시 NotFound](https://13akstjq.github.io/react/2019/09/01/React-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-Netlify%EC%97%90-%EB%B0%B0%ED%8F%AC%ED%96%88%EC%9D%84%EB%95%8C-NotFound-%EC%9D%B4%EC%8A%88-%ED%95%B4%EA%B2%B0.html)




