const LOCAL_DEV = true; // Local 개발 상태에서만 true로 셋팅한다.

const appConfig = {
  /**
   * Local 환경에서 개발 시에는 server 환경을 localhost:3000을 바라본다.
   * parking_lot_server를 Local 에서 실행 시 port 3000로 실행이 됨
   * 배포 버전은 IPTV FTP 서버인 http://221.139.81.196  내 virtualBox(ubuntu)환경에서 동작한다.
   */
  serverIP: LOCAL_DEV ? 'http://localhost:3000' : 'http://221.139.81.196:3000',
};

export default appConfig;
