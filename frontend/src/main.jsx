// JS 진입점
import React from 'react' 
import ReactDOM from 'react-dom/client'
import App from './App.jsx' 
import './styles/index.css' 

// 개발 환경에서 모의 서버 활성화 함수
async function enableMocking() {

  const { worker } = await import('./mocks/browser') // 모의 서버 워커 가져오기
  return worker.start({ // 모의 서버 시작
    serviceWorker: {
      url: '/mockServiceWorker.jsx', // 서비스 워커 파일 위치 지정
    },
    onUnhandledRequest: 'bypass', // 처리되지 않은 요청 무시 설정
  })
}

// 앱 렌더링 함수
enableMocking().then(() => { // 모의 서버 활성화 후 실행
  ReactDOM.createRoot(document.getElementById('root')).render( // React 루트 생성 및 렌더링
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
})
